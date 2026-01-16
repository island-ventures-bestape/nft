import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x2Bae9fED123839f8C0922B449F8ae436087e2101";
  const targetAddress = "0x0A0ACD4818db5b845fB551306755C2da834A2894";
  
  const abi = [
    "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) public",
    "function nonceToId(uint16) public view returns (uint256)"
  ];

  const IslandHats = new ethers.Contract(contractAddress, abi, deployer);

  console.log("Identifying metagit.feed (Nonce 2)...");
  const tokenId = await IslandHats.nonceToId(2);
  
  if (tokenId === 0n) {
    throw new Error("Token ID for Nonce 2 not found. Verification failed.");
  }

  console.log("Transferring Token ID:", BigInt(tokenId).toString(16));
  console.log("From:", deployer.address);
  console.log("To:", targetAddress);

  const tx = await IslandHats.safeTransferFrom(
    deployer.address,
    targetAddress,
    tokenId,
    1,
    "0x"
  );

  console.log("Transaction sent. Waiting for confirmation...");
  await tx.wait();

  console.log("Transfer Complete. metagit.feed has been delivered to the target.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
