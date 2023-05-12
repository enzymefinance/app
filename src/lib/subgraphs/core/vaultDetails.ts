import { graphql } from "@/lib/gql";

export const vaultDetails = graphql(`
  query VaultDetails($id: ID!) {
    vault(id: $id) {
      id
      name
      symbol
      owner {
        id
      }
      comptroller {
        id
        denomination {
          id
          name
          symbol
        }
        fees {
          ...FeeDetails
        }
        policies {
          ...PolicyDetails
        }
      }
    }
  }

  fragment FeeDetails on Fee {
    ...FeeDetailsCommon
    ...EntraceRateBurnFeeDetails
    ...EntranceRateDirectFeeDetails
    ...ExitRateBurnFeeDetails
    ...ExitRateDirectFeeDetails
    ...ManagementFeeDetails
    ...MinSharesSupplyFeeDetails
    ...PerformanceFeeDetails
    ...UnknownFeeDetails
  }

  fragment FeeDetailsCommon on Fee {
    id
    feeType
  }

  fragment EntraceRateBurnFeeDetails on EntranceRateBurnFee {
    ...FeeDetailsCommon
    rate
  }

  fragment EntranceRateDirectFeeDetails on EntranceRateDirectFee {
    ...FeeDetailsCommon
    rate
    recipient {
      id
    }
  }

  fragment ExitRateBurnFeeDetails on ExitRateBurnFee {
    ...FeeDetailsCommon
    inKindRate
    specificAssetsRate
  }

  fragment ExitRateDirectFeeDetails on ExitRateDirectFee {
    ...FeeDetailsCommon
    inKindRate
    specificAssetsRate
    recipient {
      id
    }
  }

  fragment ManagementFeeDetails on ManagementFee {
    ...FeeDetailsCommon
    scaledPerSecondRate
    recipient {
      id
    }
  }

  fragment MinSharesSupplyFeeDetails on MinSharesSupplyFee {
    ...FeeDetailsCommon
  }

  fragment PerformanceFeeDetails on PerformanceFee {
    ...FeeDetailsCommon
    highWaterMark
    rate
    recipient {
      id
    }
  }

  fragment UnknownFeeDetails on UnknownFee {
    ...FeeDetailsCommon
  }

  fragment PolicyDetails on Policy {
    ...PolicyDetailsCommon
    ...AllowedAdapterIncomingAssetsPolicyDetails
    ...AllowedAdaptersPerManagerPolicyDetails
    ...AllowedAdaptersPolicyDetails
    ...AllowedAssetsForRedemptionPolicyDetails
    ...AllowedDepositRecipientsPolicyDetails
    ...AllowedExternalPositionTypesPerManagerPolicyDetails
    ...AllowedExternalPositionTypesPolicyDetails
    ...AllowedSharesTransferRecipientsPolicyDetails
    ...CumulativeSlippageTolerancePolicyDetails
    ...MinAssetBalancesPostRedemptionPolicyDetails
    ...MinMaxDepositPolicyDetails
    ...OnlyRemoveDustExternalPositionPolicyDetails
    ...OnlyUntrackDustOrPricelessAssetsPolicyDetails
    ...UnknownPolicyDetails
    ...AdapterBlacklistPolicyDetails
    ...AdapterWhitelistPolicyDetails
    ...AssetBlacklistPolicyDetails
    ...AssetWhitelistPolicyDetails
    ...BuySharesCallerWhitelistPolicyDetails
    ...DepositorWhitelistPolicyDetails
    ...GuaranteedRedemptionPolicyDetails
    ...MaxConcentrationPolicyDetails
  }

  fragment PolicyDetailsCommon on Policy {
    id
    policyType
  }

  fragment AllowedAdapterIncomingAssetsPolicyDetails on AllowedAdapterIncomingAssetsPolicy {
    ...PolicyDetailsCommon
    addressLists {
      id
      items
    }
  }

  fragment AllowedAdaptersPerManagerPolicyDetails on AllowedAdaptersPerManagerPolicy {
    ...PolicyDetailsCommon
    userAddressLists {
      id
      addressLists {
        items
        id
      }
      userAddress
    }
  }

  fragment AllowedAdaptersPolicyDetails on AllowedAdaptersPolicy {
    ...PolicyDetailsCommon
    addressLists {
      items
      id
    }
  }

  fragment AllowedAssetsForRedemptionPolicyDetails on AllowedAssetsForRedemptionPolicy {
    ...PolicyDetailsCommon
    addressLists {
      id
      items
    }
  }

  fragment AllowedDepositRecipientsPolicyDetails on AllowedDepositRecipientsPolicy {
    ...PolicyDetailsCommon
    addressLists {
      id
      items
    }
  }

  fragment AllowedExternalPositionTypesPerManagerPolicyDetails on AllowedExternalPositionTypesPerManagerPolicy {
    ...PolicyDetailsCommon
    userUintLists {
      id
      userAddress
      uintLists {
        id
        items
      }
    }
  }

  fragment AllowedExternalPositionTypesPolicyDetails on AllowedExternalPositionTypesPolicy {
    ...PolicyDetailsCommon
    externalPositionTypes
  }

  fragment AllowedSharesTransferRecipientsPolicyDetails on AllowedSharesTransferRecipientsPolicy {
    ...PolicyDetailsCommon
    addressLists {
      id
      items
    }
  }

  fragment CumulativeSlippageTolerancePolicyDetails on CumulativeSlippageTolerancePolicy {
    ...PolicyDetailsCommon
    cumulativeSlippage
    lastSlippageTimestamp
    tolerance
  }

  fragment MinAssetBalancesPostRedemptionPolicyDetails on MinAssetBalancesPostRedemptionPolicy {
    ...PolicyDetailsCommon
    assetBalances {
      asset {
        name
        id
        symbol
      }
      id
      amount
    }
  }

  fragment MinMaxDepositPolicyDetails on MinMaxDepositPolicy {
    ...PolicyDetailsCommon
    minDepositAmount
    maxDepositAmount
  }

  fragment OnlyRemoveDustExternalPositionPolicyDetails on OnlyRemoveDustExternalPositionPolicy {
    ...PolicyDetailsCommon
  }

  fragment OnlyUntrackDustOrPricelessAssetsPolicyDetails on OnlyUntrackDustOrPricelessAssetsPolicy {
    ...PolicyDetailsCommon
  }

  fragment UnknownPolicyDetails on UnknownPolicy {
    ...PolicyDetailsCommon
  }

  fragment AdapterBlacklistPolicyDetails on AdapterBlacklistPolicy {
    ...PolicyDetailsCommon
  }

  fragment AdapterWhitelistPolicyDetails on AdapterWhitelistPolicy {
    ...PolicyDetailsCommon
  }

  fragment AssetBlacklistPolicyDetails on AssetBlacklistPolicy {
    ...PolicyDetailsCommon
  }

  fragment AssetWhitelistPolicyDetails on AssetWhitelistPolicy {
    ...PolicyDetailsCommon
  }

  fragment BuySharesCallerWhitelistPolicyDetails on BuySharesCallerWhitelistPolicy {
    ...PolicyDetailsCommon
  }

  fragment DepositorWhitelistPolicyDetails on DepositorWhitelistPolicy {
    ...PolicyDetailsCommon
  }

  fragment GuaranteedRedemptionPolicyDetails on GuaranteedRedemptionPolicy {
    ...PolicyDetailsCommon
  }

  fragment MaxConcentrationPolicyDetails on MaxConcentrationPolicy {
    ...PolicyDetailsCommon
  }
`);
