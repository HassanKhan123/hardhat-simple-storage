import { expect } from "chai";
import { ethers } from "hardhat";

import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
  let SimpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory;
    simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });

  it("Should start with a favorite number of 0", async () => {
    expect(await simpleStorage.retrieve()).equal(0);
  });

  it("Should update when we call store", async () => {
    const trResponse = await simpleStorage.store(7);
    await trResponse.wait(1);

    expect(await simpleStorage.retrieve()).equal(7);
  });
});
