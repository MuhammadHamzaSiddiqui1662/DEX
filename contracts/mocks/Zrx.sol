// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Detailed.sol";

contract Zrx is ERC20, ERC20Detailed {
    constructor()
        ERC20Detailed("ZRX", "0x token", 18)
        ERC20("ZRX", "0x token")
    {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
