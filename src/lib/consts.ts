export const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-core";

export const deployments = ["mainnet", "polygon", "testnet"];
export const networks = {
  mainnet: "mainnet",
  polygon: "polygon",
  testnet: "polygon",
} as const;
