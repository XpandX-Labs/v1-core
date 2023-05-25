1. Contract deployed: deployments/venom_devnet
2. How to swap
    - Get pair from contract DexRoot: `getExpectedPairAddress`
    - Add liquidity: contract DexPair(abi get from folder build, contract DexPair, address get above), use function `depositLiquidity`
    - Swap: use function `exchange`
3. Tokens: check in deployment, support 2 tokens: XPandax, USDT