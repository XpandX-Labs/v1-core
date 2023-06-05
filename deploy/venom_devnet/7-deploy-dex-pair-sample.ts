import {Address, zeroAddress} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        //accounts
        const signer = await locklift.keystore.getSigner('0');
        const owner = await locklift.deployments.getAccount('Owner')

        //contracts
        const DexPair = await locklift.factory.getContractArtifacts(
            'DexPair',
        );



        //deploy
        // const tokens = ['Xpandax', 'USDT', 'USDC']
        //VENOM
        // WVENOM
        // DAI
        // WETH
        // BNB
        // WTD

            const tokenRoot = await locklift.deployments.deploy({
                deploymentName: "DexPair",
                deployConfig: {
                    contract: "DexPair",
                    constructorParams: {
                    },
                    initParams: {
                        randomNonce_: getRandomNonce()
                    },
                    publicKey: signer.publicKey,
                    value: toNano(0.1),
                }
            })
        console.log("tokenRoot", tokenRoot.contract.address)

    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "test-pair";


