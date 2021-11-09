// import { config as dotEnvConfig } from "dotenv";
// dotEnvConfig();
require('dotenv').config() //从.env读取数据，并加载到process中
import { HardhatUserConfig } from "hardhat/types";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import "@nomiclabs/hardhat-waffle"; //单元测试
import "@typechain/hardhat"; //typechain，用于编译出方法，便于提示方法
import "@nomiclabs/hardhat-etherscan"; //用于进行浏览器代码上传
import "solidity-coverage"; //覆盖测试
// @ts-ignore
import { accounts } from './test-wallets.js';
import "@openzeppelin/hardhat-upgrades";

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "";
const MNEMONIC = process.env.MNEMONIC || '';
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
console.log('INFURA_API_KEY:', INFURA_API_KEY);
console.log('PRIVATE_KEY:', PRIVATE_KEY);
console.log('MNEMONIC:', MNEMONIC);
console.log('ETHERSCAN_API_KEY:', ETHERSCAN_API_KEY);

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{
            version: "0.8.0",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }],
    },
    networks: {
        hardhat: {}, //不用填写，默认即可： npx hardhat run   scripts/deploy.ts
        localhost: {}, //npx hardhat run  --network localhost scripts/deploy.ts
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [PRIVATE_KEY], //使用私钥方式
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
            accounts: { //使用助记词方式
                mnemonic: MNEMONIC,
                path: MNEMONIC_PATH,
                initialIndex: 0,
                count: 20,
            },
            timeout: 40000
        },
        coverage: {
            url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
        },
    },
    etherscan: { //Verify使用
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: { //deploy使用
        deployer: 0,
        tokenOwner: 1,
    },
    paths: {
        sources: 'contracts', //deploy使用
    },
};

export default config;
