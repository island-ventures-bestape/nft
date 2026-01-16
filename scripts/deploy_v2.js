import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Island Hats V2 (Relative Offset) with account:", deployer.address);

  const baseURI = "https://api.island.ventures/metadata/{id}";
  const IslandHats = await ethers.getContractFactory("IslandHats");
  const islandHats = await IslandHats.deploy(baseURI);

  await islandHats.waitForDeployment();

  const address = await islandHats.getAddress();
  console.log("IslandHats V2 deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
