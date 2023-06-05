import {Address, Contract, zeroAddress} from "locklift";
import BigNumber from "bignumber.js";
import {EMPTY_TVM_CELL} from "../../scripts/utils/migration";
BigNumber.config({EXPONENTIAL_AT: 257});
const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        const signer = await locklift.keystore.getSigner('0');
        const owner = await locklift.deployments.getAccount('Owner')

        //dex root
        const DexRoot = locklift.deployments.getContract('DexRoot');
        const dexRoot = await locklift.factory.getDeployedContract('DexRoot', DexRoot.address)

        // execute
        await dexRoot.methods.deployAccount({
            account_owner: owner.account.address,
            send_gas_to: owner.account.address,
        }).send({
            from: owner.account.address,
            amount: toNano(4),
        });

        const dexAccountNAddress = await dexRoot.methods
            .getExpectedAccountAddress({
                answerId: 0,
                account_owner: owner.account.address,
            })
            .call()
        console.log(`DexAccount: ${dexAccountNAddress.value0}`);
    } catch (err) {
        console.log("error", err)
    }
}

export const tag = "dex-account";
