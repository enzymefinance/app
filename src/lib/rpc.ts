import type { Network } from "./consts";
import { isServer } from "./environment";
1;
import { cache } from "react";
import { createPublicClient, http } from "viem";

export function getRpcUrl(network: Network) {
  switch (network) {
    case "ethereum":
      return isServer
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
        : `${window.location.origin}/rpc/ethereum`;
    case "polygon":
      return isServer
        ? `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        : `${window.location.origin}/rpc/polygon`;
  }
}

export const getPublicClient = cache(function getPublicClient(network: Network) {
  return createPublicClient({
    transport: http(getRpcUrl(network)),
    name: network,
    batch: {
      multicall: true,
    },
  });
});
