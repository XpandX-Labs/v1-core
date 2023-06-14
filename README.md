# XpandX V1

The XpandX smart contract v1 is utilized for the XpandX DEX. This contract serves as the underlying code governing the functionality and operations of the XpandX DEX platform. It may include various functions, data structures, and logic necessary for trading, liquidity provision, and other related activities within the exchange.

Visit us: [https://xpandx.xyz/](https://xpandx.xyz/) 

[Locklift](https://github.com/broxus/locklift/) is required to build, test, run and maintain the smart contract.

## Contributing
If you are interested in contributing, we kindly request you to refer to our [contribution guidelines](./CONTRIBUTING.md) for detailed information and instructions. 


## Deployed Contracts

Folder: [deployments/venom_devnet](/deployments/venom_devnet/)

## List of devnet Tokens 

- Folder: Deployment
- Supported devnet tokens: XPX, USDT, USDC, DAI, WETH, WVENOM 

### Contracts: 
- Dexroot: [0:5c4796acbcd1d056d54fd049a4e2f3ce9ccbc98dd7ef8beea34863503c7c8c59](https://devnet.venomscan.com/accounts/0:5c4796acbcd1d056d54fd049a4e2f3ce9ccbc98dd7ef8beea34863503c7c8c59) 
- Dexvault: [0:2e33c78355bfc9a16c5c867b9e1f4ca9b259f310a5a8187ae98ed801e98819f8](https://devnet.venomscan.com/accounts/0:2e33c78355bfc9a16c5c867b9e1f4ca9b259f310a5a8187ae98ed801e98819f8)
- DexAccount: [0:1f83e6dacbb1820ffd2c492abcc921e4fdbd6331232dcabe97d0aafb4b4fa17e](https://devnet.venomscan.com/accounts/0:1f83e6dacbb1820ffd2c492abcc921e4fdbd6331232dcabe97d0aafb4b4fa17e)
- XPX: [0:a1d0f1d6b42ac9caa00bc61dba95034e029bc0160d0e5a68da87d5336278862f](https://devnet.venomscan.com/accounts/0:a1d0f1d6b42ac9caa00bc61dba95034e029bc0160d0e5a68da87d5336278862f) 
- USDT: [0:1906d466d3f737868ed55e4d7b10119561daefbfa04d5724ab586685e2e1913f](https://devnet.venomscan.com/accounts/0:1906d466d3f737868ed55e4d7b10119561daefbfa04d5724ab586685e2e1913f)  
- USDC: [0:7dc8ec27fe011374ca68648eb210034016f9033754ff26d77cb68d22eca35535](https://devnet.venomscan.com/accounts/0:7dc8ec27fe011374ca68648eb210034016f9033754ff26d77cb68d22eca35535)
- DAI: [0:56b39a55f65653e15a2a4b6f86b087c4ddf63137f4af88f8b5d0e455fd277067](https://devnet.venomscan.com/accounts/0:56b39a55f65653e15a2a4b6f86b087c4ddf63137f4af88f8b5d0e455fd277067)
- WVENOM: [0:3d7cadf3dec1803f5006c339ea0b11bf6b52b1f7753c303567da40c6b641bcee](https://devnet.venomscan.com/accounts/0:3d7cadf3dec1803f5006c339ea0b11bf6b52b1f7753c303567da40c6b641bcee)
- WETH: [0:23b2674db85bdb9591e417e1dae1049ec454eddc6fd66bc1a91bd093c1ae7e6c](https://devnet.venomscan.com/accounts/0:23b2674db85bdb9591e417e1dae1049ec454eddc6fd66bc1a91bd093c1ae7e6c) 


#### Flow deposit liquidity:

1. Create Dex account:
   - Call the `getExpectedAccountAddress` function of the DexRoot contract.
      - Input:
         - answerId: random
         - address_owner: user's address
      - Output: the expected account address of the user
   - If the account address is not active, call the `deployAccount` function:
      - Input:
         - account_owner: user's address
         - send_gas_to: user's address
2. Deposit tokens into the Dex account:
   - Check if the user's address has a wallet account contract in the token root contract using the `walletOf` function.
   - Find the user's wallet account. If it doesn't exist, use the `deployWallet` function in the token contract to deploy a new one.
   - Once you have the wallet account for the token, access the wallet account contract and use the `transfer` function to transfer the tokens to the Dex account.
   - Repeat the process for both tokens that need to be transferred.
3. Use the `depositLiquidity` function in the DexAccount contract to deposit liquidity.

**Notes:** To get pair address, please use function: `getExpectedPairAddress` on DexRoot

#### Flow exchange

1. On the contract [DexAccount](https://devnet.venomscan.com/accounts/0:1f83e6dacbb1820ffd2c492abcc921e4fdbd6331232dcabe97d0aafb4b4fa17e) and use function `exchange` to swap tokens in the pair
