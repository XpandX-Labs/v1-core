import {Address} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");

export default async () => {


    // const signer = await locklift.keystore.getSigner('0');
    // const TokenRoot = await locklift.factory.getContractArtifacts('TokenRootUpgradeable');
    // const TokenWallet = await locklift.factory.getContractArtifacts('TokenWalletUpgradeable');
    // const TokenWalletPlatform = await locklift.factory.getContractArtifacts('TokenWalletPlatform');




    const owner = await locklift.deployments.getAccount('Owner')
    console.log("owner", owner.account.address)
    // await locklift.factory.deployContract([
    //         {
    //             deploymentName: "Deployer",
    //             signerId: "0",
    //             accountSettings: {
    //                 type: WalletTypes.WalletV3,
    //                 value: toNano(10),
    //             },
    //         },
    //     ],
    //     true // enableLogs
    // );

    const deployer = locklift.deployments.getAccount("Deployer").account;

}
export const tag = "new-account";
