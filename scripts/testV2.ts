// scripts/deploy_upgradeable_counter.js
import { ethers } from "hardhat";

async function main() {
    let accounts = await ethers.getSigners()
    // console.log('accounts:', accounts[0].address);
    // console.log('accounts:', accounts[1].address);
    // console.log('accounts:', accounts[2].address);
    const V2 = await ethers.getContractFactory("CounterV2Upgrade");
    let instance = V2.attach("0xF5deCF1CB99C4D6Aa22Ee49A3D32Eb21bee73d22")
    let c1 = await instance.getCount()
    console.log('c1:', c1)
    await instance.countUp()
    c1 = await instance.getCount()
    console.log('c2:', c1)
    console.log('修改前manager:', await instance.manager())
    await instance.connect(accounts[0]).changeOwner(accounts[1].address)
    console.log('修改后manager:', await instance.manager())
}

main();