pragma solidity ^0.6.6;
//SPDX-License-Identifier: MIT

interface ILiquidityValueCalculator {
    function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external returns (uint tokenAAmount, uint tokenBAmount);
}
