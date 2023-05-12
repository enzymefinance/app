import type { Address } from "viem";

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
export const ENTRANCE_RATE_BURN_FEE = "0xcdec5bbecc6d2c004d5378a63a3c484c2643ed9d";
export const ENTRANCE_RATE_DIRECT_FEE = "0xfb8df7d5e320020cd8047226b81cf6d68f3e3c19";
export const PERFORMANCE_FEE = "0xfeDC73464Dfd156d30F6524654a5d56E766DA0c3";
export const MANAGEMENT_FEE = "0xFaF2c3DB614E9d38fE05EDc634848BE7Ff0542B9";
export const MIN_SHARES_SUPPLY_FEE = "0xbc9da8edde80ffb1294852d23ee1b385ea2d4929";

export const ALLOWED_DEPOSIT_RECIPIENTS_POLICY = "0xA66BAAa0cCb6468C5A2cB61f5D672C7bA0440Ee1";
export const MIN_MAX_INVESTMENT_POLICY = "0xebdadFC929c357d12281118828AeA556db5be30C";
export const ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY = "0xebE37e43bC6b3AacfE318d6906fc80C4a2a7505A";

type Contracts = {
  Usdc: Address;
  ExternalPositionFactory: Address;
  FundValueCalculatorRouter: Address;
  Dispatcher: Address;
};

const contracts: {
  [deployment in Deployment]: Contracts;
} = {
  ethereum: {
    Usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
    ExternalPositionFactory: "0x0aacb782205dde9eff4862ace9849dce1ca3409f",
    FundValueCalculatorRouter: "0x7c728cd0CfA92401E01A4849a01b57EE53F5b2b9",
  },
  polygon: {
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    Dispatcher: "0x2e25271297537b8124b8f883a92ffd95c4032733",
    ExternalPositionFactory: "0x067eeea753aba0ddecca0b80bbb8b7572bf6580d",
    FundValueCalculatorRouter: "0xd70389a7d6171e1dba6c3df4db7331811fd93f08",
  },
  testnet: {
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    Dispatcher: "0xd77231f355c6790441c1fb95a2e2ef916d5b3d84",
    ExternalPositionFactory: "0x30ca263f9a3780c70530ffaf0ccc162ae3eba993",
    FundValueCalculatorRouter: "0xb9c46d50d25808014b9371a91f44e602ecda7f0f",
  },
};

export function getContract(deployment: Deployment, contract: keyof Contracts): Address {
  return contracts[deployment][contract];
}
