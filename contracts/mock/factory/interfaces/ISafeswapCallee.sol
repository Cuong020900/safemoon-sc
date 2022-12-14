pragma solidity >=0.5.0 <0.8.0;

interface ISafeswapCallee {
    function safeswapCall(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external;
}
