import { graphql } from "@/lib/gql";

export const vaultList = graphql(`
  query VaultList {
    vaults {
      id
      symbol
      name
    }
  }
`);
