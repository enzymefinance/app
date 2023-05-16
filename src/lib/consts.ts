import type { Address } from "viem";

export type Deployment = typeof deployments[number];
export const deployments = ["ethereum", "polygon", "testnet"] as const;

export type Network = typeof networks[number];
export const networks = ["ethereum", "polygon"] as const;

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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

type Contracts = {
  AllowedDepositRecipientsPolicy: Address;
  AllowedSharesTransferRecipientsPolicy: Address;
  Dispatcher: Address;
  ExternalPositionFactory: Address;
  ExitRateBurnFee: Address;
  ExitRateDirectFee: Address;
  EntranceRateBurnFee: Address;
  EntranceRateDirectFee: Address;
  FundValueCalculatorRouter: Address;
  ManagementFee: Address;
  MinSharesSupplyFee: Address;
  MinMaxInvestmentPolicy: Address;
  PerformanceFee: Address;
  Usdc: Address;
};

const contracts: {
  [deployment in Deployment]: Contracts;
} = {
  ethereum: {
    AllowedDepositRecipientsPolicy: "0xa66baaa0ccb6468c5a2cb61f5d672c7ba0440ee1",
    AllowedSharesTransferRecipientsPolicy: "0xebe37e43bc6b3aacfe318d6906fc80c4a2a7505a",
    Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
    ExternalPositionFactory: "0x0aacb782205dde9eff4862ace9849dce1ca3409f",
    EntranceRateBurnFee: "0xcdec5bbecc6d2c004d5378a63a3c484c2643ed9d",
    EntranceRateDirectFee: "0xfb8df7d5e320020cd8047226b81cf6d68f3e3c19",
    ExitRateBurnFee: "0x06b13918E988D1314dA1a9dA4C0cdE5fe994364a",
    ExitRateDirectFee: "0x3a09d11c20aa1ad38c77b4f426901d3427f73fbe",
    FundValueCalculatorRouter: "0x7c728cd0CfA92401E01A4849a01b57EE53F5b2b9",
    ManagementFee: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
    MinSharesSupplyFee: "0xbc9da8edde80ffb1294852d23ee1b385ea2d4929",
    MinMaxInvestmentPolicy: "0xebdadfc929c357d12281118828aea556db5be30c",
    PerformanceFee: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
    Usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  polygon: {
    AllowedDepositRecipientsPolicy: "0xe1853502e2ea2b7c14c5e89169c63065f5a459ff",
    AllowedSharesTransferRecipientsPolicy: "0x3b6913a8ed4595919a6b4a9022208cede20194bd",
    Dispatcher: "0x2e25271297537b8124b8f883a92ffd95c4032733",
    ExternalPositionFactory: "0x067eeea753aba0ddecca0b80bbb8b7572bf6580d",
    EntranceRateBurnFee: "0x01460ba35cb6f847d65c5eee124e7e9e10055f16",
    EntranceRateDirectFee: "0x88c9a11c7bb8bc274388d0db864ab87c14fb78b8",
    ExitRateBurnFee: "0x0bbb9635d12a9c022b647f379224d88874d37879",
    ExitRateDirectFee: "0xc5c7f7c6e5e2db074d96b440d30d7aab2c99b848",
    FundValueCalculatorRouter: "0xd70389a7d6171e1dba6c3df4db7331811fd93f08",
    PerformanceFee: "0xbc63afe28c66a6279bd3a55a4d0d3ab61f479bdf",
    ManagementFee: "0x97f13b3040a565be791d331b0edd4b1b58dbd843",
    MinSharesSupplyFee: "0xeb45b91d582ae383e750a1626a97f854a9df19a3",
    MinMaxInvestmentPolicy: "0x8ac04e34d9c1d0bd5a440157538cc6fbb0dbbc9a",
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
  testnet: {
    AllowedDepositRecipientsPolicy: "0x7656970e350e79ce550dd3051d4014373371df53",
    AllowedSharesTransferRecipientsPolicy: "0x0acfeb85b8dc2db3aa34f93151b7a494b84a99bc",
    Dispatcher: "0xd77231f355c6790441c1fb95a2e2ef916d5b3d84",
    EntranceRateBurnFee: "0x722e252e5140a46530cc3f4534eb1561851b8b57",
    EntranceRateDirectFee: "0xc1755fb4b9157186aecf0775c4f6c3a0dd0ea7af",
    ExternalPositionFactory: "0x30ca263f9a3780c70530ffaf0ccc162ae3eba993",
    ExitRateBurnFee: "0x00ded19f9f8e512dc8041f5b52b20d53ebdb69f8",
    ExitRateDirectFee: "0xaed3e269898de65715f71d88f7dcb7986d3f31b0",
    FundValueCalculatorRouter: "0xb9c46d50d25808014b9371a91f44e602ecda7f0f",
    ManagementFee: "0x4a95185896adce31a8cdfaaa2832decc3d20dc2c",
    MinSharesSupplyFee: "0x8a2cfb231be7c229209dc41e62def7756a6088a2",
    MinMaxInvestmentPolicy: "0xd2dbb1d5222200b94f4aea2618d88cc33146987b",
    PerformanceFee: "0xf1fcba510713355d7504b87a163420a2bd116a4b",
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
};

export function getContract(deployment: Deployment, contract: keyof Contracts): Address {
  return contracts[deployment][contract];
}
