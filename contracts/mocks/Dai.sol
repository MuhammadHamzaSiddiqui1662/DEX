// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Detailed.sol";

contract Dai is ERC20, ERC20Detailed {
    constructor()
        ERC20Detailed("DAI", "Daistablecoin", 18)
        ERC20("DAI", "Daistablecoin")
    {}

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
