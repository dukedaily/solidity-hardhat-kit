// scripts/deploy_upgradeable_counter.js
import { ethers } from "hardhat";

async function main() {
    let accounts = await ethers.getSigners()
    console.log('accounts:', accounts[0].address);
    console.log('accounts:', accounts[1].address);
    console.log('accounts:', accounts[2].address);

    //虽然使用的这个ABI，但其实还是调用的CounterV2Upgrade合约
    //这里能调用成功，只是因为Counter由于ABI大体相同，恰好能被用来实例化合约实例而已
    const V2 = await ethers.getContractFactory("Counter");
    let instance = V2.attach("0xF5deCF1CB99C4D6Aa22Ee49A3D32Eb21bee73d22")
    let c1 = await instance.getCount()
    console.log('c1:', c1)
    await instance.countUp()
    c1 = await instance.getCount()
    console.log('c2:', c1)
    // await instance.connect(accounts[0]).changeOwner(accounts[1].address)
}

main();