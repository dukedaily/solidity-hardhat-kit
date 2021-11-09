// scripts/deploy_upgradeable_counter.js
import { ethers, upgrades } from "hardhat";

async function main() {
    const Counter_ = await ethers.getContractFactory("Counter");
    console.log("Deploying Counter...");
    // const counter = await upgrades.deployProxy(Counter_, [10])
    //{ initializer: 'initialize' }: 只有当名字不是initialize时需要
    const counter = await upgrades.deployProxy(Counter_, [0], { initializer: 'initialize' });

    await counter.deployed();
    console.log("Counter deployed to:", counter.address);
}

main();