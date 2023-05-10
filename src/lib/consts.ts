import type { Address } from "viem";

export const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-core";

export const deployments = ["mainnet", "polygon", "testnet"];
export const networks = {
  mainnet: "mainnet",
  polygon: "polygon",
  testnet: "polygon",
} as const;

export const FUND_VALUE_CALCULATOR_ROUTER = "0x7c728cd0CfA92401E01A4849a01b57EE53F5b2b9" as Address;

export const FUND_DEPLOYER_SULU = "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360" as Address;
export const FUND_DEPLOYER_ENCORE = "0x7e6d3b1161df9c9c7527f68d651b297d2fdb820b" as Address;
export const FUND_DEPLOYER_PHOENIX = "0x9134c9975244b46692ad9a7da36dba8734ec6da3" as Address;
