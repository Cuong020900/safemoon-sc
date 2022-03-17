pragma solidity ^0.6.6;
//SPDX-License-Identifier: MIT
import './interfaces/ILiquidityValueCalculator.sol';

abstract contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    constructor(address factory_) public {
        factory = factory_;
    }
}
