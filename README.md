# XpandX V1

XpandX smart contract v1 is used for XpandX DEX 

[Locklift](https://github.com/broxus/locklift/) is required to build, test, run and maintain the smart contract.

## Deployed Contracts

Folder: deployments/venom_devnet

## How to SWAP, add liquidity

- Get pair from contract DexRoot: `getExpectedPairAddress`
- Add liquidity: contract DexPair(abi get from folder build, contract DexPair, address get above), use function `depositLiquidity`
- Swap: use function `exchange`

## List of Tokens 

- Folder: deployment/venom_devnet
- Supported Tokens: WVENOM, BNB, DAI, WTD, XPX, USDT, USDC 