import { isServer } from "./environment";
import { cache } from "react";
import { createPublicClient, http } from "viem";

export let mainnetRpcUrl = "/rpc/mainnet";
export let polygonRpcUrl = "/rpc/polygon";

if (isServer) {
  mainnetRpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;
  polygonRpcUrl = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
}

export function getRpcUrl(network: "mainnet" | "polygon") {
  switch (network) {
    case "mainnet":
      return mainnetRpcUrl;
    case "polygon":
      return polygonRpcUrl;
  }
}

export const getPublicClient = cache(function getPublicClient(network: "mainnet" | "polygon") {
  return createPublicClient({
    transport: http(getRpcUrl(network)),
    name: network,
  });
});
