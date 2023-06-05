import {Address, zeroAddress} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        //accounts
        const signer = await locklift.keystore.getSigner('0');
        const owner = await locklift.deployments.getAccount('Owner')

        //contracts
        const TokenWalletUpgradeable = await locklift.factory.getContractArtifacts(
            'TokenWalletUpgradeable',
        );
        const TokenWalletPlatform = await locklift.factory.getContractArtifacts(
            'TokenWalletPlatform',
        );


        //deploy
        // const tokens = ['Xpandax', 'USDT', 'USDC']
        //VENOM
        // WVENOM
        // DAI
        // WETH
        // BNB
        // WTD
        const tokens = ['WVENOM', 'DAI', 'WETH', 'BNB', 'WTD']

        for(const tokenID of tokens) {
            const tokenRoot = await locklift.deployments.deploy({
                deploymentName: tokenID,
                deployConfig: {
                    contract: "TokenRootUpgradeable",
                    constructorParams: {
                        initialSupplyTo: zeroAddress,
                        initialSupply: '0',
                        deployWalletValue: '0',
                        mintDisabled: false,
                        burnByRootDisabled: true,
                        burnPaused: true,
                        remainingGasTo: zeroAddress,
                    },
                    initParams: {
                        randomNonce_: getRandomNonce(),
                        deployer_: zeroAddress,
                        name_: tokenID,
                        symbol_: tokenID,
                        decimals_: 18,
                        walletCode_: TokenWalletUpgradeable.code,
                        rootOwner_: owner.account.address,
                        platformCode_: TokenWalletPlatform.code,
                    },
                    publicKey: signer.publicKey,
                    value: toNano(2),
                }
            })
            console.log(`token ${tokenID}`,tokenRoot.contract.address)
        }
    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "token-test";


