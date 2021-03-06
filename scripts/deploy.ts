import { ethers, run, network } from "hardhat";
const { ETHERSCAN_API_KEY } = require("../secret");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying SimpleStorage...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed to ${simpleStorage.address}`);
  if (network.config.chainId === 4 && ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(currentValue.toString());

  const trResponse = await simpleStorage.store(7);
  await trResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(updatedValue.toString());
}

async function verify(contractAddress: string, args: any[]) {
  console.log("Verifying Contract ....");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
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
