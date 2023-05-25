import {Address} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        const signer = await locklift.keystore.getSigner('0');
        const TokenRoot = await locklift.factory.getContractArtifacts('TokenRootUpgradeable');
        const TokenWallet = await locklift.factory.getContractArtifacts('TokenWalletUpgradeable');
        const TokenWalletPlatform = await locklift.factory.getContractArtifacts('TokenWalletPlatform');


        const owner = await locklift.deployments.getAccount('Owner')
        console.log("owner", owner.account.address)

        // console.log("signer.publicKey", signer.publicKey)
        const tokenFactory = await locklift.deployments.deploy({
            deploymentName: "TokenFactory",
            deployConfig: {
                contract: "TokenFactory",
                constructorParams: {
                    _owner: owner.account.address
                },
                initParams: {
                    randomNonce_: getRandomNonce(),
                },
                publicKey: signer.publicKey,
                value: toNano(2),
            }
        })

        console.log("tokenFactory", tokenFactory.contract.address);

        await tokenFactory.contract.methods.setRootCode({_rootCode: TokenRoot.code}).send({
            from: owner.account.address,
            amount: toNano(2)
        });

        await tokenFactory.contract.methods.setWalletCode({_walletCode: TokenWallet.code}).send({
            from: owner.account.address,
            amount: toNano(2)
        });

        await tokenFactory.contract.methods.setWalletPlatformCode({_walletPlatformCode: TokenWalletPlatform.code}).send({
            from: owner.account.address,
            amount: toNano(2)
        });
    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "token-factory";


