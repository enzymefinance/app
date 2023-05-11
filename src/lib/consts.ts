import type { Address } from "viem";

export const EXTERNAL_POSITION_FACTORY = "0x0aacb782205dde9eff4862ace9849dce1ca3409f" as Address;
export const FUND_VALUE_CALCULATOR_ROUTER = "0x7c728cd0CfA92401E01A4849a01b57EE53F5b2b9" as Address;
export const FUND_DEPLOYER_SULU = "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360" as Address;
export const FUND_DEPLOYER_ENCORE = "0x7e6d3b1161df9c9c7527f68d651b297d2fdb820b" as Address;
export const FUND_DEPLOYER_PHOENIX = "0x9134c9975244b46692ad9a7da36dba8734ec6da3" as Address;
export const DISPATCHER = "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32" as Address;

export type Deployment = typeof deployments[number];
export const deployments = ["ethereum", "polygon", "testnet"] as const;

export type Network = typeof networks[number];
export const networks = ["ethereum", "polygon"] as const;

export function getNetworkByDeployment(deployment: Deployment): Network {
  switch (deployment) {
    case "ethereum":
      return "ethereum";
    case "polygon":
      return "polygon";
    case "testnet":
      return "polygon";
  }
}
export const EXIT_RATE_BURN_FEE = "0x06b13918E988D1314dA1a9dA4C0cdE5fe994364a";
export const EXIT_RATE_DIRECT_FEE = "0x3a09d11C20AA1aD38C77B4f426901d3427f73fBE";
export const ENTRANCE_RATE_BURN_FEE = "0x27F74B89B29508091014487253d8D9b88aa0264A";
export const ENTRANCE_RATE_DIRECT_FEE = "0x30a398Eb63B62bF2865F90e37752c8300Ef22F05";
export const PERFORMANCE_FEE = "0xfeDC73464Dfd156d30F6524654a5d56E766DA0c3";
export const MANAGEMENT_FEE = "0xFaF2c3DB614E9d38fE05EDc634848BE7Ff0542B9";
