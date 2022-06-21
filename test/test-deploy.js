const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
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
