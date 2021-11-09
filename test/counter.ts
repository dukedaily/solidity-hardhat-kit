import { ethers, deployments} from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Counter__factory, Counter } from "../typechain";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Counter", () => {
  let counter: Counter;

  beforeEach(async () => {
    await deployments.fixture(["Counter"]);
    console.log('111111')
    // 1
    const signers = await ethers.getSigners();

    // 2
    //原生ethers只有：ContractFactory(abi, bytecode, signer)
    const counterFactory = (await ethers.getContractFactory(
      "Counter",
      signers[0]
    )) as Counter__factory;
    counter = await counterFactory.deploy(0); //执行部署
    await counter.deployed(); //等待部署完成，很奇怪啊
    const initialCount = await counter.getCount();

    // 3
    expect(initialCount).to.eq(0);
    expect(counter.address).to.properAddress;
  });

  // 4
  describe("count up", async () => {
    it("should count up", async () => {
      await counter.countUp();
      let count = await counter.getCount();
      expect(count).to.eq(1);
    });
  });

  describe("count down", async () => {
    // 5
    it("should fail due to underflow exception", () => {
      return expect(counter.countDown()).to.eventually.be.rejectedWith(Error, 'Uint256 underflow');
    });

    it("should count down", async () => {
      await counter.countUp();

      await counter.countDown();
      const count = await counter.getCount();
      expect(count).to.eq(0);
    });
  });
});
