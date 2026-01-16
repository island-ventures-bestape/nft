import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Sovereign IslandHats with:", deployer.address);

  const IslandHats = await hre.ethers.getContractFactory("IslandHats");
  const hats = await IslandHats.deploy();
  await hats.waitForDeployment();

  const contractAddress = await hats.getAddress();
  console.log("IslandHats deployed to:", contractAddress);

  // Derive Top Hat ID from deployer address
  // Shift address 96 bits left to fill the uint256 prefix
  const topHatId = BigInt(deployer.address) << 96n;
  console.log("Minting Sovereign Top Hat ID:", topHatId.toString(16));
  
  const tx = await hats.mint(deployer.address, topHatId, 1, "0x");
  await tx.wait();
  console.log("Top Hat claimed by msg.sender!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});