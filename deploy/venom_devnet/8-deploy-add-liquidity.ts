import {Address, zeroAddress} from "locklift";
import {BigNumber} from "bignumber.js";
import {EMPTY_TVM_CELL} from "../../scripts/utils/migration";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        //accounts
        const signer = await locklift.keystore.getSigner('0');
        const owner = await locklift.deployments.getAccount('Owner')
        // const test = await locklift.factory.getAccountsFactory('DexAccount');

        //contracts
        const DexAccount = await locklift.factory.getContractArtifacts(
            'DexAccount',
        );

        //dex root
        const DexRoot = locklift.deployments.getContract('DexRoot');
        const dexRoot = await locklift.factory.getDeployedContract('DexRoot', DexRoot.address)


        //token
        const tokenX = locklift.deployments.getContract("Xpandax");
        const tokenY = locklift.deployments.getContract("USDT");
        const contractXpandx = await locklift.factory.getDeployedContract('TokenRootUpgradeable', tokenX.address)
        const contractUSDT = await locklift.factory.getDeployedContract('TokenRootUpgradeable', tokenY.address)

        // get dex account address
        const dexAccountNAddress = await dexRoot.methods
            .getExpectedAccountAddress({
                answerId: 0,
                account_owner: owner.account.address,
            })
            .call()

        const dexAccount = await locklift.factory.getDeployedContract('DexAccount', dexAccountNAddress.value0)

        const dexPairFooBarAddress = await dexRoot.methods
            .getExpectedPairAddress({
                answerId: 0,
                left_root: contractXpandx.address,
                right_root: contractUSDT.address,
            }).call()

        console.log(`DexPool: ${dexPairFooBarAddress.value0}`);

        const dexPairXpandaxUSDT = await locklift.factory.getDeployedContract(
            'DexPair',
            dexPairFooBarAddress.value0,
        );

        const version = (
            await dexPairXpandaxUSDT.methods.getVersion({ answerId: 0 }).call()
        ).version;
        console.log(`DexPool version = ${version}`);


        console.log("pair", dexPairXpandaxUSDT.address)

        const walletTokenUSDT = await dexAccount.methods.getWalletData({
            answerId: 0,
            token_root: contractUSDT.address
        }).call();
        console.log("wallets", walletTokenUSDT);

        const walletTokenXpandaX = await dexAccount.methods.getWalletData({
            answerId: 0,
            token_root: contractXpandx.address
        }).call();
        console.log("walletTokenXpandaX", walletTokenXpandaX);


        const tx = await dexAccount.methods.depositLiquidity({
            call_id: getRandomNonce(),
            left_root: contractXpandx.address,
            left_amount: new BigNumber('100').shiftedBy(18).toString(),
            right_root: contractUSDT.address,
            right_amount: new BigNumber('100').shiftedBy(18).toString(),
            expected_lp_root: new Address('0:54c8d9f39768c5a9e0f93e2b39c91132a535730d8dcbad49a7d0027291dce9d8'),
            auto_change: true,
            send_gas_to: dexAccount.address
        }).send({
            from: owner.account.address,
            amount: toNano(1.1)
        })

        console.log("transaction", tx.id)

    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "add-liquidity";


