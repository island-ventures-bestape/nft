import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Island Ventures Hats Joyfork with account:", deployer.address);

  const baseURI = "https://api.island.ventures/metadata/{id}";
  const IslandHats = await ethers.getContractFactory("IslandHats");
  const islandHats = await IslandHats.deploy(baseURI);

  await islandHats.waitForDeployment();

  const address = await islandHats.getAddress();
  console.log("IslandHats deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
