// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract GuessGame {
    address public owner;
    uint256 private secretNumber;
    uint256 public guessFee = 0.01 ether;

    event GuessResult(address indexed player, uint256 guess, string result);

    constructor() {
        owner = msg.sender;
        secretNumber = _generateSecret();
    }
function _generateSecret() private view returns (uint256) {
    bytes memory random = Sapphire.randomBytes(32, abi.encodePacked(msg.sender, block.timestamp));
    return uint256(bytes32(random)) % 100 + 1;
}

    function guess(uint256 _guess) external payable {
        require(msg.value >= guessFee, "Need to pay to guess");
        require(_guess >= 1 && _guess <= 100, "Guess must be between 1 and 100");

        string memory result;
        if (_guess < secretNumber) {
            result = "Too Low";
        } else if (_guess > secretNumber) {
            result = "Too High";
        } else {
            result = "Correct!";
            payable(msg.sender).transfer(address(this).balance);
            secretNumber = _generateSecret();
        }

        emit GuessResult(msg.sender, _guess, result);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
