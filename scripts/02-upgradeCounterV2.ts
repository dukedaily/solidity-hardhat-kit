// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CounterV2 = await ethers.getContractFactory("CounterV2Upgrade");
  console.log("Upgrading CounterV2Upgrade...");
  const counterV2 = await upgrades.upgradeProxy("0xF5deCF1CB99C4D6Aa22Ee49A3D32Eb21bee73d22", CounterV2);
  console.log("counterV2 upgraded:", counterV2.address);
}

main();
