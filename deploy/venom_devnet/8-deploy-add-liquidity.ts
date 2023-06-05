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

        // transfer token
        // console.log("dex account", dexAccount.methods.depositLiquidity)

        // const wallet = await contractXpandx.methods.walletOf({
        //     answerId: 0,
        //     walletOwner: owner.account.address
        // }).call()


        // const wallets = await dexAccount.methods.getWalletData({
        //     token_root: contractXpandx.address,
        //     answerId: 0,
        // }).call()
        console.log("wallets", dexAccount)

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

        // const test = dexAccount.methodsAbi;
        // console.log("test", test);
        const addPair = await dexAccount.methods.addPair({
            left_root:contractXpandx.address,
            right_root: contractUSDT.address
        }).send({
            from: owner.account.address,
            amount: toNano(5)
        })
        console.log("pair", addPair.id)

        const tx = await dexAccount.methods.depositLiquidity({
            call_id: getRandomNonce(),
            left_root: contractXpandx.address,
            left_amount: new BigNumber('1000').shiftedBy(18).toString(),
            right_root: contractUSDT.address,
            right_amount: new BigNumber('100').shiftedBy(18).toString(),
            expected_lp_root: dexPairXpandaxUSDT.address,
            auto_change: true,
            send_gas_to: dexAccount.address
        }).send({
            from: owner.account.address,
            amount: toNano(15)
        })
        //
        console.log("transaction", tx.id)

    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "add-liquidity";


