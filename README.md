1. Contract deployed: deployments/venom_devnet
2. How to swap
    - Get pair from contract DexRoot: `getExpectedPairAddress`
    - Add liquidity: contract DexPair(abi get from folder build, contract DexPair, address get above), use function `depositLiquidity`
    - Swap: use function `exchange`
3. Tokens: check in deployment, support 2 tokens: XPandax, USDT


####
Flow deposit liquidity:

1. Create Dex account:
   - Contract DexRoot, call function `getExpectedAccountAddress`
     - input: 
       - answerId: random
       - address_owner: address of user
     - output: expected account address of user
   - If account address is not active, call function `deployAccount`:
     - input:
        - account_owner: address of user
        - send_gas_to: address of user
2. Deposit token to dex account
  - Address have a wallet account contract in token root contract, use function `walletOf` to find it.
  - Find wallet account of user, if it doesn't exist, use function `deployWallet` in contract token to deploy new one
  - After has wallet account of token, go to contract wallet account and use function `transfer` to transfer token dex account
  - Need to transfer token from 2 tokens.
3. From contract DexAccount, use function `depositLiquidiy` to deposit

####
Flow exchange

1. Go to contract DexAccount and use function `exchange`
