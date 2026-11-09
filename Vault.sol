// SPDX-License-Igdentifffssggffrrrrrffgffier: MIT
pragma solidity ^0.8.0;

contract Vault {
    address public oracle;
    mapping(address => uint256) public rewards;

    function setOracle(address _oracle) external {   // no access control
        oracle = _oracle;
    }

    function claim() external {                       // call before state write
        uint256 reward = rewards[msg.sender];
        (bool ok, ) = msg.sender.call{value: reward}("");
        require(ok);
        rewards[msg.sender] = 0;
    }
}
