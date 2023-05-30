const provider = require('everscale-inpage-provider');
const dexRootInfo = require('../deployments/venom_devnet/Contract__DexRoot.json');
const xpandaxInfo = require('../deployments/venom_devnet/Contract__Xpandax.json');
const usdtInfo = require('../deployments/venom_devnet/Contract__USDT.json');
const { EverscaleStandaloneClient } = require('everscale-standalone-client/nodejs');
const {Address} = require("locklift");

const ever = new provider.ProviderRpcClient(
    {
        forceUseFallback: true,
        fallback: () =>
            EverscaleStandaloneClient.create({
                connection: {
                    id: 2, // network id
                    type: 'graphql',
                    data: {
                        // create your own project at https://dashboard.evercloud.dev
                        endpoints: ['https://gql-devnet.venom.network/graphql/'],
                    },
                },
            })
    }
);

const loadContract = async (address, abi) => {
    return new provider.Contract(ever, abi, address);
}


const getPair = async () => {
    const dexRootAddress = new provider.Address(dexRootInfo.address);
    const dexRootAbi = dexRootInfo.abi;
    const dexRoot = await loadContract(dexRootAddress, dexRootAbi);
    const XpandaX = await loadContract(new Address(xpandaxInfo.address), xpandaxInfo.abi)
    const usdt = await loadContract(new Address(usdtInfo.address), usdtInfo.abi)

    const pair = await dexRoot.methods.getExpectedPairAddress({
        answerId: 0,
        left_root: XpandaX.address,
        right_root: usdt.address,
    }).call()
    return pair.value0;
}

const depositLP = async () => {

}

const swap = async
(async () => {
    await getPair();
})().catch(error => {
    console.log("error", error)
})
