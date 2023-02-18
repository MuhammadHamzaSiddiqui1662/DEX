// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Detailed.sol";

contract Rep is ERC20, ERC20Detailed {
    constructor()
        ERC20Detailed("REP", "Auger token", 18)
        ERC20("REP", "Auger token")
    {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
