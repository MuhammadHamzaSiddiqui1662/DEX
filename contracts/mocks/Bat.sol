// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Detailed.sol";

contract Bat is ERC20, ERC20Detailed {
    constructor()
        ERC20Detailed("BAT", "Basic attention token", 18)
        ERC20("BAT", "Basic attention token")
    {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
