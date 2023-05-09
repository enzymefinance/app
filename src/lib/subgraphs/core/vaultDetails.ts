import { graphql } from "./generated/gql";

export const vaultDetails = graphql(/* GraphQL */ `
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
          ... on EntranceRateBurnFee {
            id
            feeType
            rate
          }
          ... on EntranceRateDirectFee {
            id
            feeType
            rate
            recipient {
              id
            }
          }
          ... on ExitRateBurnFee {
            feeType
            id
            inKindRate
            specificAssetsRate
          }
          ... on ExitRateDirectFee {
            id
            feeType
            recipient {
              id
            }
            inKindRate
            specificAssetsRate
          }
          ... on ManagementFee {
            feeType
            recipient {
              id
            }
            scaledPerSecondRate
          }
          ... on MinSharesSupplyFee {
            feeType
            id
          }
          ... on PerformanceFee {
            feeType
            highWaterMark
            rate
            recipient {
              id
            }
          }
          ... on UnknownFee {
            id
            feeType
          }
        }
        policies {
          ... on AllowedAdapterIncomingAssetsPolicy {
            id
            policyType
            addressLists {
              id
              items
            }
          }
          ... on AllowedAdaptersPerManagerPolicy {
            id
            policyType
            userAddressLists {
              id
              addressLists {
                items
                id
              }
              userAddress
            }
          }
          ... on AllowedAdaptersPolicy {
            id
            policyType
            addressLists {
              items
              id
            }
          }
          ... on AllowedAssetsForRedemptionPolicy {
            addressLists {
              id
              items
            }
            id
            policyType
          }
          ... on AllowedDepositRecipientsPolicy {
            id
            policyType
            addressLists {
              id
              items
            }
          }
          ... on AllowedExternalPositionTypesPerManagerPolicy {
            id
            userUintLists {
              id
              userAddress
              uintLists {
                id
                items
              }
            }
            policyType
          }
          ... on AllowedExternalPositionTypesPolicy {
            id
            policyType
            externalPositionTypes
          }
          ... on AllowedSharesTransferRecipientsPolicy {
            addressLists {
              id
              items
            }
            id
            policyType
          }
          ... on CumulativeSlippageTolerancePolicy {
            id
            cumulativeSlippage
            lastSlippageTimestamp
            policyType
            tolerance
          }
          ... on MinAssetBalancesPostRedemptionPolicy {
            id
            assetBalances {
              asset {
                name
                id
                symbol
              }
              id
              amount
            }
            policyType
          }
          ... on MinMaxDepositPolicy {
            id
            minDepositAmount
            maxDepositAmount
            policyType
          }
          ... on OnlyRemoveDustExternalPositionPolicy {
            id
            policyType
          }
          ... on OnlyUntrackDustOrPricelessAssetsPolicy {
            id
            policyType
          }
          ... on UnknownPolicy {
            id
            policyType
          }
          ... on AdapterBlacklistPolicy {
            id
            policyType
          }
          ... on AdapterWhitelistPolicy {
            id
            policyType
          }
          ... on AssetBlacklistPolicy {
            id
            policyType
          }
          ... on AssetWhitelistPolicy {
            policyType
          }
          ... on AssetWhitelistPolicy {
            id
          }
          ... on BuySharesCallerWhitelistPolicy {
            id
            policyType
          }
          ... on DepositorWhitelistPolicy {
            id
            policyType
          }
          ... on GuaranteedRedemptionPolicy {
            policyType
          }
          ... on GuaranteedRedemptionPolicy {
            id
          }
          ... on MaxConcentrationPolicy {
            id
            policyType
          }
        }
      }
    }
  }
`);
