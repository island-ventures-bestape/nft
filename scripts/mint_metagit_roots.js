import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0xa84240ab41E51B3C933A30dfF581F9D9290938A2";
  
  const abi = [
    "function mint(address to, bytes28 segment, uint16 hyperlink, uint256 amount, bytes memory data) public",
    "function nonceToId(uint16) public view returns (uint256)",
    "event SpeciationEvent(uint16 indexed nonce, uint16 indexed hyperlink, uint256 id)"
  ];

  const IslandHats = new ethers.Contract(contractAddress, abi, deployer);

  console.log("Minting V3 NFTs (Link 0) with account:", deployer.address);

  const toBytes28 = (str) => {
    const bytes = ethers.toUtf8Bytes(str);
    const result = new Uint8Array(28);
    result.set(bytes);
    return ethers.hexlify(result);
  };

  // 1. Mint Root: "metagit"
  console.log("Minting: metagit...");
  const tx1 = await IslandHats.mint(deployer.address, toBytes28("metagit"), 0, 1, "0x");
  await tx1.wait();

  // 2. Mint Root (Semantic Child): "metagit.feed"
  // Note: Link 0 because we are duplicating the prefix in the payload
  console.log("Minting: metagit.feed...");
  const tx2 = await IslandHats.mint(deployer.address, toBytes28("metagit.feed"), 0, 1, "0x");
  await tx2.wait();

  console.log("\n--- Minting Complete (Both Link 0) ---");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
