import { type Address, getAddress } from "viem";

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
  AllowedAdaptersPolicy: Address;
  AllowedAdapterIncomingAssetsPolicy: Address;
  AllowedAdaptersPerManager: Address;
  AllowedAssetsForRedemptionPolicy: Address;
  AllowedDepositRecipientsPolicy: Address;
  AllowedExternalPositionTypesPerManagerPolicy: Address;
  AllowedExternalPositionTypesPolicy: Address;
  AllowedSharesTransferRecipientsPolicy: Address;
  CumulativeSlippageTolerancePolicy: Address;
  Dispatcher: Address;
  ExternalPositionFactory: Address;
  ExitRateBurnFee: Address;
  ExitRateDirectFee: Address;
  EntranceRateBurnFee: Address;
  EntranceRateDirectFee: Address;
  FundValueCalculatorRouter: Address;
  ManagementFee: Address;
  MinAssetBalancesPostRedemptionPolicy: Address;
  MinSharesSupplyFee: Address;
  MinMaxInvestmentPolicy: Address;
  OnlyRemoveDustExternalPositionPolicy: Address;
  OnlyUntrackDustOrPricelessAssets: Address;
  PerformanceFee: Address;
  Usdc: Address;
};

const contracts: {
  [deployment in Deployment]: Contracts;
} = {
  ethereum: {
    AllowedAdaptersPolicy: "0x720ef97bf835699fcf07591952cd2b132d63a6c0",
    AllowedAdapterIncomingAssetsPolicy: "0x2f0e55830a173d845a886fd574f01a039a07fc37",
    AllowedAdaptersPerManager: "0xa4507d51c5270ff91229b76300ff90774384d144",
    AllowedDepositRecipientsPolicy: "0xa66baaa0ccb6468c5a2cb61f5d672c7ba0440ee1",
    AllowedExternalPositionTypesPerManagerPolicy: "0x47fb78995d945d501f6f9bad343d7ce7d3db54ab",
    AllowedExternalPositionTypesPolicy: "0x9e076e7d35a3b881ab9e3da958431630fdfa756f",
    AllowedAssetsForRedemptionPolicy: "0x823ca839da344da59d517b84ce3bab9ffc9f54ee",
    AllowedSharesTransferRecipientsPolicy: "0xebe37e43bc6b3aacfe318d6906fc80c4a2a7505a",
    CumulativeSlippageTolerancePolicy: "0x3a49d5aec385ac1bde99f305316b945c5ee71312",
    Dispatcher: "0xc3dc853dd716bd5754f421ef94fdcbac3902ab32",
    ExternalPositionFactory: "0x0aacb782205dde9eff4862ace9849dce1ca3409f",
    EntranceRateBurnFee: "0xcdec5bbecc6d2c004d5378a63a3c484c2643ed9d",
    EntranceRateDirectFee: "0xfb8df7d5e320020cd8047226b81cf6d68f3e3c19",
    ExitRateBurnFee: "0x06b13918E988D1314dA1a9dA4C0cdE5fe994364a",
    ExitRateDirectFee: "0x3a09d11c20aa1ad38c77b4f426901d3427f73fbe",
    FundValueCalculatorRouter: "0x7c728cd0CfA92401E01A4849a01b57EE53F5b2b9",
    ManagementFee: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
    MinAssetBalancesPostRedemptionPolicy: "0x58c0a2a546b3903fa68a53e34ee0c8a02aabfad0",
    MinSharesSupplyFee: "0xbc9da8edde80ffb1294852d23ee1b385ea2d4929",
    MinMaxInvestmentPolicy: "0xebdadfc929c357d12281118828aea556db5be30c",
    OnlyRemoveDustExternalPositionPolicy: "0x966ec191ed9e026cb6f7e22bb2a284bad6a2838d",
    OnlyUntrackDustOrPricelessAssets: "0x747beaee139fba4a89fa71bebb5f21231530292b",
    PerformanceFee: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
    Usdc: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  polygon: {
    AllowedAdaptersPolicy: "0x4218783ae10bd1841e6664cf048ac295d8d27a4a",
    AllowedAdapterIncomingAssetsPolicy: "0xc192fd3b13549ad5bc3c0a0118a29556d0cdd482",
    AllowedAdaptersPerManager: "0x30ed4e3cf5e1faf6fc9776d256d535f3470bb710",
    AllowedAssetsForRedemptionPolicy: "0x71b8254f608a73162445655ff2f07ccb1586b3b6",
    AllowedDepositRecipientsPolicy: "0xe1853502e2ea2b7c14c5e89169c63065f5a459ff",
    AllowedExternalPositionTypesPerManagerPolicy: "0xb6367cd4b67c44e963ae81e9c1757a1c08ede28c",
    AllowedExternalPositionTypesPolicy: "0x5a739da3099fd4fc954bd764099fc000da76d8e7",
    AllowedSharesTransferRecipientsPolicy: "0x3b6913a8ed4595919a6b4a9022208cede20194bd",
    CumulativeSlippageTolerancePolicy: "0x1332367c181f1157f751b160187dcaa219706bf2",
    Dispatcher: "0x2e25271297537b8124b8f883a92ffd95c4032733",
    ExternalPositionFactory: "0x067eeea753aba0ddecca0b80bbb8b7572bf6580d",
    EntranceRateBurnFee: "0x01460ba35cb6f847d65c5eee124e7e9e10055f16",
    EntranceRateDirectFee: "0x88c9a11c7bb8bc274388d0db864ab87c14fb78b8",
    ExitRateBurnFee: "0x0bbb9635d12a9c022b647f379224d88874d37879",
    ExitRateDirectFee: "0xc5c7f7c6e5e2db074d96b440d30d7aab2c99b848",
    FundValueCalculatorRouter: "0xd70389a7d6171e1dba6c3df4db7331811fd93f08",
    ManagementFee: "0x97f13b3040a565be791d331b0edd4b1b58dbd843",
    MinAssetBalancesPostRedemptionPolicy: "0x9d940beaa6e3cfb441d49787fdf1db18d7f8251e",
    MinSharesSupplyFee: "0xeb45b91d582ae383e750a1626a97f854a9df19a3",
    MinMaxInvestmentPolicy: "0x8ac04e34d9c1d0bd5a440157538cc6fbb0dbbc9a",
    OnlyRemoveDustExternalPositionPolicy: "0xc0f49507c125a000e02ab58c22be9764e2abab99",
    OnlyUntrackDustOrPricelessAssets: "0x9f856372f7bd844dac0254c7859b117259b5c9d2",
    PerformanceFee: "0xbc63afe28c66a6279bd3a55a4d0d3ab61f479bdf",
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
  testnet: {
    AllowedAdaptersPolicy: "0x35cf5a1fe0254f863c9f6c0cd5c2128ee61baf58",
    AllowedAdapterIncomingAssetsPolicy: "0x390be32d5864fda0295d0e5f413d411eabd7c4ce",
    AllowedAdaptersPerManager: "0xd63909b856ab759aff30eb52651e366d2625d1de",
    AllowedAssetsForRedemptionPolicy: "0x2be12155dfbe1bb92f314d0b9759bb127febde65",
    AllowedDepositRecipientsPolicy: "0x7656970e350e79ce550dd3051d4014373371df53",
    AllowedExternalPositionTypesPerManagerPolicy: "0x3291b7c08b2ac90d547e4cef11103f770f14b390",
    AllowedExternalPositionTypesPolicy: "0x2cb6b222e17167629f75de39dd13c0ba6d58f0cf",
    AllowedSharesTransferRecipientsPolicy: "0x0acfeb85b8dc2db3aa34f93151b7a494b84a99bc",
    CumulativeSlippageTolerancePolicy: "0x561176cd43b958482d33dcd62a1eb437bd7bfef9",
    Dispatcher: "0xd77231f355c6790441c1fb95a2e2ef916d5b3d84",
    EntranceRateBurnFee: "0x722e252e5140a46530cc3f4534eb1561851b8b57",
    EntranceRateDirectFee: "0xc1755fb4b9157186aecf0775c4f6c3a0dd0ea7af",
    ExternalPositionFactory: "0x30ca263f9a3780c70530ffaf0ccc162ae3eba993",
    ExitRateBurnFee: "0x00ded19f9f8e512dc8041f5b52b20d53ebdb69f8",
    ExitRateDirectFee: "0xaed3e269898de65715f71d88f7dcb7986d3f31b0",
    FundValueCalculatorRouter: "0xb9c46d50d25808014b9371a91f44e602ecda7f0f",
    ManagementFee: "0x4a95185896adce31a8cdfaaa2832decc3d20dc2c",
    MinAssetBalancesPostRedemptionPolicy: "0x7800955aae98c31e4eac22c1b4e7edd6ad0c3ba0",
    MinSharesSupplyFee: "0x8a2cfb231be7c229209dc41e62def7756a6088a2",
    MinMaxInvestmentPolicy: "0xd2dbb1d5222200b94f4aea2618d88cc33146987b",
    OnlyRemoveDustExternalPositionPolicy: "0x713e7dac3c237b71dd54a8718ce21ecd5d2dc747",
    OnlyUntrackDustOrPricelessAssets: "0xc1f7b231874e2f9b2c9d4ec701dc6f046eab253a",
    PerformanceFee: "0xf1fcba510713355d7504b87a163420a2bd116a4b",
    Usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
};

export function getContract(deployment: Deployment, contract: keyof Contracts): Address {
  return getAddress(contracts[deployment][contract]);
}
