import {Address, Contract, zeroAddress} from "locklift";
import BigNumber from "bignumber.js";
import {EMPTY_TVM_CELL} from "../../scripts/utils/migration";
BigNumber.config({EXPONENTIAL_AT: 257});
const {toNano, WalletTypes, getRandomNonce} = require("locklift");

export default async () => {
    try {
        const signer = await locklift.keystore.getSigner('0');
        const owner = await locklift.deployments.getAccount('Owner')
        const TokenWalletUpgradeable = await locklift.factory.getContractArtifacts(
            'TokenWalletUpgradeable',
        );
        const abi = TokenWalletUpgradeable.abi
        const amount = new BigNumber(20000).shiftedBy(18).toFixed();
        const tokens = ['Xpandax', 'USDT', 'USDC']
        for (const tokenId of tokens) {
            const token = locklift.deployments.getContract(tokenId);
            const contract = await locklift.factory.getDeployedContract('TokenRootUpgradeable', token.address)
            await contract.methods.mint(
                {
                    amount: amount,
                    recipient: owner.account.address,
                    deployWalletValue: toNano(0.2),
                    remainingGasTo: owner.account.address,
                    notify: false,
                    payload: EMPTY_TVM_CELL
                }
            ).send({
                from: owner.account.address,
                amount: toNano(0.5)
            });
        }

    } catch (err) {
        console.log("error", err)
    }
}
export const tag = "mint-token";
