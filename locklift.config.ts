import {LockliftConfig} from "locklift";
import {FactorySource} from "./build/factorySource";
import "locklift-verifier";
import "locklift-deploy";
import { Deployments } from "locklift-deploy";


declare global {
    const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";
const DEV_NET_NETWORK_ENDPOINT = process.env.DEV_NET_NETWORK_ENDPOINT || "https://devnet-sandbox.evercloud.dev/graphql";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-testnet.venom.foundation/rpc";
const VENOM_TESTNET_TRACE_ENDPOINT =
    process.env.VENOM_TESTNET_TRACE_ENDPOINT || "https://gql-testnet.venom.foundation/graphql";

// Create your own link on https://dashboard.evercloud.dev/
const MAIN_NET_NETWORK_ENDPOINT = process.env.MAIN_NET_NETWORK_ENDPOINT || "https://mainnet.evercloud.dev/XXX/graphql";

declare module "locklift" {
    //@ts-ignore
    export interface Locklift {
        deployments: Deployments<FactorySource>;
    }
}

const config: LockliftConfig = {
    compiler: {
        version: '0.62.0',
        externalContracts: {
            precompiled: ['DexPlatform'],

            'node_modules/tip3/build': [
                'TokenRootUpgradeable',
                'TokenWalletUpgradeable',
                'TokenWalletPlatform',
            ],
            'node_modules/ton-wton/everscale/build': [],
        },
    },
    linker: {
        // Specify path to your stdlib
        // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
        // // Specify path to your Linker
        // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

        // Or specify version of linker
        version: "0.15.48",
    },
    networks: {
        local: {
            // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
            connection: {
                id: 1,
                group: "localnet",
                type: "graphql",
                data: {
                    endpoints: [LOCAL_NETWORK_ENDPOINT],
                    latencyDetectionInterval: 1000,
                    local: true,
                },
            },
            // This giver is default local-node giverV2
            giver: {
                // Check if you need provide custom giver
                address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
                key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
            },
            tracing: {
                endpoint: LOCAL_NETWORK_ENDPOINT,
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
                amount: 20,
            },
        },
        test: {
            connection: {
                id: 1,
                type: "graphql",
                group: "dev",
                data: {
                    endpoints: [DEV_NET_NETWORK_ENDPOINT],
                    latencyDetectionInterval: 1000,
                    local: false,
                },
            },
            giver: {
                address: "0:0000000000000000000000000000000000000000000000000000000000000000",
                key: "secret key",
            },
            tracing: {
                endpoint: DEV_NET_NETWORK_ENDPOINT,
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
                amount: 20,
            },
        },
        venom_testnet: {
            connection: {
                id: 1000,
                type: "jrpc",
                group: "dev",
                data: {
                    endpoint: VENOM_TESTNET_ENDPOINT,
                },
            },
            giver: {
                address: "0:0000000000000000000000000000000000000000000000000000000000000000",
                phrase: "phrase",
                accountId: 0,
            },
            tracing: {
                endpoint: VENOM_TESTNET_TRACE_ENDPOINT,
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
                amount: 20,
            },
        },
        // venom_devnet: {
        //   connection: {
        //     id: 1000,
        //     type: "jrpc",
        //     group: "dev",
        //     data: {
        //       endpoint: VENOM_TESTNET_ENDPOINT,
        //     },
        //   },
        //   giver: {
        //     address: "0:0000000000000000000000000000000000000000000000000000000000000000",
        //     phrase: "phrase",
        //     accountId: 0,
        //   },
        //   tracing: {
        //     endpoint: VENOM_TESTNET_TRACE_ENDPOINT,
        //   },
        //   keys: {
        //     // Use everdev to generate your phrase
        //     // !!! Never commit it in your repos !!!
        //     // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        //     amount: 20,
        //   },
        // },
        venom_devnet: {
            // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
            connection: {
                group: 'devnet',
                // @ts-ignore
                type: 'graphql',
                data: {
                    // @ts-ignore
                    endpoints: ["https://gql-devnet.venom.network/graphql/"],
                    latencyDetectionInterval: 1000,
                    local: false,
                },
            },
            // // This giver is default local-node giverV2
            giver: {
                // // Check if you need provide custom giver
                address: '0:93f2b1dcdcd50e36b4f792631506f2d433fd73939bd1bfbc1304e6847765d9ea',
                phrase: 'original dilemma depth east shift wood flee special ten venture enforce slender',
                accountId: 0,
            },
            tracing: {
                endpoint: 'https://gql-devnet.venom.network/graphql',
            },

            keys: {
                phrase: 'original dilemma depth east shift wood flee special ten venture enforce slender',
                amount: 20,
            },
            deploy:  ['venom_devnet/']
        },
        main: {
            // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
            connection: {
                id: 1,
                type: "graphql",
                group: "main",
                data: {
                    endpoints: [MAIN_NET_NETWORK_ENDPOINT],
                    latencyDetectionInterval: 1000,
                    local: false,
                },
            },
            // This giver is default Wallet
            giver: {
                address: "0:0000000000000000000000000000000000000000000000000000000000000000",
                key: "secret key",
            },
            tracing: {
                endpoint: MAIN_NET_NETWORK_ENDPOINT,
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
                amount: 20,
            },
        },
    },
    mocha: {
        timeout: 2000000,
    },
    verifier: {
        verifierVersion: "latest", // contract verifier binary, see https://github.com/broxus/everscan-verify/releases
        apiKey: "APIKEY",
        secretKey: "SECRET",
    },
};

export default config;
