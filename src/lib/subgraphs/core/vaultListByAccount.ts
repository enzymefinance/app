import { graphql } from "@/lib/gql";

export const vaultListByAccount = graphql(`
  query VaultListByAccount($account: String!) {
    releases(where: { current: true }) {
      vaults(
        where: {
          or: [
            # Vaults owned by the account.
            { owner: $account }
            # Vaults managed by the account.
            { assetManagers_contains: [$account] }
            # Vaults with deposits owned by the account.
            { deposits_: { depositor: $account } }
          ]
        }
      ) {
        ...VaultBasicInfo
      }
    }
  }
`);
