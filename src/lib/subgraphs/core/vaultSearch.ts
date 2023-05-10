import { graphql } from "@/lib/gql";

export const vaultSearch = graphql(`
  query VaultSearch($name: String!) {
    vaults(first: 20, where: {
      name_contains_nocase: $name
    }) {
      ...VaultBasicInfo
    }
  }

  fragment VaultBasicInfo on Vault {
    id
    symbol
    name
  }
`);
