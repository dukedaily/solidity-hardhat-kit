pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

// npx hardhat run --network localhost scripts/deploy_upgradeable_counter.ts
contract CounterV2Upgrade is Initializable {
    uint256 count;
    address public manager;

    function initialize(uint256 init) public initializer {
        count = init;
        manager = msg.sender;
    }

    event CountedTo(uint256 number);

    function getCount() public view returns (uint256) {
        return count;
    }

    function countUp() public returns (uint256) {
        console.log("countUp: count =", count);
        uint256 newCount = count + 1;
        require(newCount > count, "Uint256 overflow");

        count = newCount;

        emit CountedTo(count);
        return count;
    }

    function countDown() public returns (uint256) {
        console.log("countDown: count =", count);
        uint256 newCount = count - 1;
        require(newCount < count, "Uint256 underflow");

        count = newCount;

        emit CountedTo(count);
        return count;
    }

    function changeOwner(address owner) public {
        require(msg.sender == manager, "forbidden!"); 
        manager = owner;
    }
}
