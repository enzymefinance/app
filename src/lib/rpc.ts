import type { Network } from "./consts";
import { isServer } from "./environment";
import { cache } from "react";
import { createPublicClient, http } from "viem";

export let ethereumRpcUrl = "/rpc/ethereum";
export let polygonRpcUrl = "/rpc/polygon";
console.log({ isServer, a: process.env.ALCHEMY_API_KEY });

if (isServer) {
  ethereumRpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
  polygonRpcUrl = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
}

export function getRpcUrl(network: Network) {
  switch (network) {
    case "ethereum":
      return ethereumRpcUrl;
    case "polygon":
      return polygonRpcUrl;
  }
}

export const getPublicClient = cache(function getPublicClient(network: Network) {
  console.log({ result: getRpcUrl(network) });

  return createPublicClient({
    transport: http(getRpcUrl(network)),
    name: network,
    batch: {
      multicall: true,
    },
  });
});
