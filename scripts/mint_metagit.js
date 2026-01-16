import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x2Bae9fED123839f8C0922B449F8ae436087e2101";
  
  const abi = [
    "function mint(address to, bytes28 segment, uint16 link, uint256 amount, bytes memory data) public",
    "function nonceToId(uint16) public view returns (uint256)",
    "function globalNonce() public view returns (uint16)",
    "event SpeciationEvent(uint16 indexed nonce, uint16 indexed link, uint256 id)"
  ];

  const IslandHats = new ethers.Contract(contractAddress, abi, deployer);

  console.log("Minting V6 NFTs with account:", deployer.address);

  const toBytes28 = (str) => {
    const bytes = ethers.toUtf8Bytes(str);
    const result = new Uint8Array(28);
    result.set(bytes);
    return ethers.hexlify(result);
  };

  const nonce = await IslandHats.globalNonce();
  console.log("Current Global Nonce:", nonce);

  // 1. Mint Root: "metagit"
  if (nonce < 1) {
    console.log("Minting Root: metagit...");
    const tx1 = await IslandHats.mint(deployer.address, toBytes28("metagit"), 0, 1, "0x");
    await tx1.wait();
    console.log("Root 'metagit' minted.");
  } else {
    console.log("Root 'metagit' already exists. Skipping.");
  }

  // 2. Mint Child: "metagit.feed"
  if (nonce < 2) {
    console.log("Minting Child: metagit.feed...");
    const tx2 = await IslandHats.mint(deployer.address, toBytes28("metagit.feed"), 0, 1, "0x");
    await tx2.wait();
    console.log("Child 'metagit.feed' minted.");
  } else {
    console.log("Child 'metagit.feed' already exists. Skipping.");
  }

  console.log("\n--- V6 Minting Complete ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });