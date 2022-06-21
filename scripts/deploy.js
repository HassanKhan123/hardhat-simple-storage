const { ethers, run, network } = require("hardhat");
const { ETHERSCAN_API_KEY } = require("../secret");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed to ${simpleStorage.address}`);
  console.log(network.config);
  if (network.config.chainId === 4 && ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract ....");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log("err", error);
    process.exit(1);
  });
