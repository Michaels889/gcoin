const hre = require("hardhat");

async function main() {
  const GMECOIN = await hre.ethers.getContractFactory("GMECOIN");
  const gmecoin = await GMECOIN.deploy(1000000); // 1 triệu token

  await gmecoin.deployed();
  console.log("✅ GMECOIN deployed to:", gmecoin.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});