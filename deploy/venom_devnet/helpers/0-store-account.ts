import {Address} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");

export default async () => {

    const _ownerAccount = new Address('0:93f2b1dcdcd50e36b4f792631506f2d433fd73939bd1bfbc1304e6847765d9ea')

    await locklift.deployments.saveAccount({
        deploymentName: "Owner",
        signerId: "0",
        address: _ownerAccount.toString(),
        accountSettings: {
            type: WalletTypes.EverWallet,
        }
    });
}
export const tag = "store-account";
