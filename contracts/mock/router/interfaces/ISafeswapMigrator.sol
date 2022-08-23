pragma solidity >=0.5.0 <0.8.0;

interface ISafeswapMigrator {
    function migrate(
        address token,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external;
}
