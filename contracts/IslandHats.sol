// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Island Ventures Hats Joyfork V5
 * @notice Semantic Authority Scroll: [Nonce][Payload][Link]
 */
contract IslandHats is ERC1155, Ownable {
    uint16 public globalNonce;
    
    mapping(uint16 => uint256) public nonceToId;
    // Maps keccak256(ASCII_Path) to the Nonce that claimed it
    mapping(bytes32 => uint16) public pathToNonce;
    
    // Metadata Sovereignty: Individual and Default
    mapping(uint256 => string) private _customURIs;
    string public defaultURI;

    event SpeciationEvent(uint16 indexed nonce, uint16 indexed link, uint256 id);
    event DefaultURIUpdated(string newURI);

    constructor(string memory _initialDefaultURI) ERC1155(_initialDefaultURI) Ownable(msg.sender) {
        defaultURI = _initialDefaultURI;
    }

    /**
     * @notice Mints a new volume. Intercepts semantic prefixes to enforce authority.
     */
    function mint(address to, bytes28 segment, uint16 link, uint256 amount, bytes memory data) public {
        require(globalNonce < 10000, "Joyfork: Nonce limit reached");
        
        // 1. Resolve Semantic Authority (The Intercept)
        uint16 effectiveParent = _resolveAuthority(segment, link);
        if (effectiveParent > 0) {
            uint256 parentId = nonceToId[effectiveParent];
            require(balanceOf(msg.sender, parentId) > 0, "Joyfork: Parent Namespace Required");
        }

        globalNonce++;
        uint16 currentNonce = globalNonce;

        // 2. Register the New Path (Content-as-Authority)
        bytes32 fullPathHash = keccak256(abi.encodePacked(link, segment));
        require(pathToNonce[fullPathHash] == 0, "Joyfork: Path already claimed");
        pathToNonce[fullPathHash] = currentNonce;

        // 3. Assemble ID: [2B Nonce][28B Payload][2B Link]
        uint256 id = (uint256(currentNonce) << 240) | (uint256(uint224(segment)) << 16) | uint256(link);
        
        nonceToId[currentNonce] = id;
        _mint(to, id, amount, data);
        
        emit SpeciationEvent(currentNonce, link, id);
    }

    /**
     * @dev Searches for the most specific existing prefix to find the true parent.
     */
    function _resolveAuthority(bytes28 segment, uint16 link) internal view returns (uint16) {
        if (link > 0) return link;

        // Intercept: Scan for existing ASCII prefixes
        for (uint256 i = 27; i > 0; i--) {
            // Shift right to create a prefix of length 'i'
            uint224 prefixBits = uint224(segment) >> (8 * (28 - i));
            bytes32 subHash = keccak256(abi.encodePacked(uint16(0), prefixBits));
            uint16 existingNonce = pathToNonce[subHash];
            if (existingNonce > 0) return existingNonce;
        }
        return 0;
    }

    /**
     * @notice Metadata Sovereignty: Owners can change their individual tokenURI.
     */
    function setCustomURI(uint256 id, string memory newURI) public {
        require(balanceOf(msg.sender, id) > 0, "Joyfork: Ownership required");
        _customURIs[id] = newURI;
    }

    /**
     * @notice Admin Override: Change the default tokenURI.
     */
    function setDefaultURI(string memory newURI) public onlyOwner {
        defaultURI = newURI;
        _setURI(newURI);
        emit DefaultURIUpdated(newURI);
    }

    /**
     * @notice Heuristic Resolver: Priority Custom > Default.
     */
    function uri(uint256 id) public view override returns (string memory) {
        if (bytes(_customURIs[id]).length > 0) return _customURIs[id];
        return defaultURI;
    }
}