import {Address, zeroAddress} from "locklift";

const {toNano, WalletTypes, getRandomNonce} = require("locklift");


export default async () => {
    try {
        //signer
        const signer = await locklift.keystore.getSigner('0');

        //owner
        const owner = await locklift.deployments.getAccount('Owner')

        //contracts
        const DexPlatform = await locklift.factory.getContractArtifacts('DexPlatform');
        const DexAccount = await locklift.factory.getContractArtifacts('DexAccount');
        const DexPair = await locklift.factory.getContractArtifacts('DexPair');
        const DexVaultLpTokenPendingV2 = await locklift.factory.getContractArtifacts('DexVaultLpTokenPendingV2');
        const DexTokenVault = await locklift.factory.getContractArtifacts('DexTokenVault');

        // console.log("signer.publicKey", signer.publicKey)
        const dexRoot = await locklift.deployments.deploy({
            deploymentName: "DexRoot",
            deployConfig: {
                contract: "DexRoot",
                constructorParams: {
                    initial_owner: owner.account.address,
                    initial_vault: zeroAddress
                },
                initParams: {
                    _nonce: getRandomNonce(),
                },
                publicKey: signer.publicKey,
                value: toNano(2),
            }
        })
        console.log("DexRoot", dexRoot.contract.address);

        //vault
        const dexVault = await locklift.deployments.deploy({
            deploymentName: "DexVault",
            deployConfig: {
                contract: "DexVault",
                constructorParams: {
                    owner_: owner.account.address,
                    root_: dexRoot.contract.address
                },
                initParams: {
                    _nonce: getRandomNonce(),
                },
                publicKey: signer.publicKey,
                value: toNano(2),
            }
        })
        console.log("DexVault", dexVault.contract.address);

        let tx = await dexVault.contract.methods.installPlatformOnce({code: DexPlatform.code})
            .send({
                from: owner.account.address,
                amount: toNano(2)
            })
        console.log("transaction install platform code", tx.id);

        tx = await dexRoot.contract.methods.setVaultOnce({new_vault: dexVault.contract.address})
            .send({
                from: owner.account.address,
                amount: toNano(2)
            })
        console.log("transaction set vault once", tx.id);

        tx = await dexRoot.contract.methods.installOrUpdateTokenVaultCode({
            _newCode: DexTokenVault.code,
            _remainingGasTo: owner.account.address
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction installOrUpdateTokenVaultCode", tx.id);

        tx = await dexRoot.contract.methods.installOrUpdateLpTokenPendingCode({
            _newCode: DexVaultLpTokenPendingV2.code,
            _remainingGasTo: owner.account.address,
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction installOrUpdateLpTokenPendingCode", tx.id);

        const tokenFactory = await locklift.deployments.getContract('TokenFactory')
        tx = await dexRoot.contract.methods.setTokenFactory({
            _newTokenFactory: tokenFactory.address,
            _remainingGasTo: owner.account.address,
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction setTokenFactory", tx.id);

        tx = await dexRoot.contract.methods.installPlatformOnce({
            code: DexPlatform.code
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction installPlatformOnce", tx.id);

        tx = await dexRoot.contract.methods.installOrUpdateAccountCode({
            code: DexAccount.code
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction installOrUpdateAccountCode", tx.id);

        tx = await dexRoot.contract.methods.installOrUpdatePairCode({
            code: DexPair.code,
            pool_type: 1
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction installOrUpdatePairCode", tx.id);

        tx = await dexRoot.contract.methods.setActive({
            new_active: true
        }).send({
            from: owner.account.address,
            amount: toNano(2)
        })
        console.log("transaction setActive", tx.id);

    } catch (err) {
        console.log("error", err);
    }
}
export const tag = "vault-root";


