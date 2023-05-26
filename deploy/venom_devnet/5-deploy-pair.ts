import {Address, Contract, zeroAddress} from "locklift";
import BigNumber from "bignumber.js";
import {Constants, EMPTY_TVM_CELL} from "../../scripts/utils/migration";

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
        const pairs = [['Xpandax', 'USDT']]
        for (const p of pairs) {
            const tokenLeft =
                p[0].slice(-2) === 'Lp'
                    ? {
                        name: p[0],
                        symbol: p[0],
                        decimals: Constants.LP_DECIMALS,
                        upgradeable: true,
                    }
                    : {
                        name: p[0],
                        symbol: p[0],
                        decimals: 18,
                        upgradeable: true,
                    };
            const tokenRight =
                p[1].slice(-2) === 'Lp'
                    ? {
                        name: [p[1]],
                        symbol: p[1],
                        decimals: Constants.LP_DECIMALS,
                        upgradeable: true,
                    }
                    : {
                        name: p[1],
                        symbol: p[1],
                        decimals: 18,
                        upgradeable: true,
                    };
            const pair = { left: tokenLeft.symbol, right: tokenRight.symbol };

            //dex root
            const Xpandax = locklift.deployments.getContract('Xpandax');
            const USDT = locklift.deployments.getContract('USDT');


            const tx = await dexRoot.methods
                .deployPair({
                    left_root: Xpandax.address,
                    right_root: USDT.address,
                    send_gas_to: owner.account.address,
                })
                .send({
                    from: owner.account.address,
                    amount: toNano(15),
                });

            const dexPairFooBarAddress = await dexRoot.methods
                .getExpectedPairAddress({
                    answerId: 0,
                    left_root: Xpandax.address,
                    right_root: USDT.address,
                }).call()

            console.log(`DexPool${pair.left}${pair.right}: ${dexPairFooBarAddress.value0}`);

            const dexPairXpandaxUSDT = await locklift.factory.getDeployedContract(
                'DexPair',
                dexPairFooBarAddress.value0,
            );

            const version = (
                await dexPairXpandaxUSDT.methods.getVersion({ answerId: 0 }).call()
            ).version;
            console.log(`DexPool${pair.left}${pair.right} version = ${version}`);

            const active = (
                await dexPairXpandaxUSDT.methods.isActive({ answerId: 0 }).call()
            ).value0;
            console.log(`DexPool${pair.left}${pair.right} active = ${active}`);

            const XpandaxUSDTLpRoot = await locklift.factory.getDeployedContract(
                'TokenRootUpgradeable',
                (
                    await dexPairXpandaxUSDT.methods.getTokenRoots({ answerId: 0 }).call()
                ).lp,
            );
            console.log("Lp root XpandaxUSDTLpRoot", XpandaxUSDTLpRoot.address)

        }
    } catch (err) {
        console.log("error", err)
    }
}

export const tag = "dex-pair";