import { graphql } from "@/lib/gql";

export const vaultSearch = graphql(`
  query VaultSearch($name: String!) {
    releases(where: { current: true }) {
      vaults(first: 5, where: { name_contains_nocase: $name }) {
        ...VaultBasicInfo
      }
    }
  }

  fragment VaultBasicInfo on Vault {
      id
      symbol
      name
    }
`);
