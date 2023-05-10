import { graphql } from "@/lib/generated/gql";

export const vaultList = graphql(`
  query VaultList {
    vaults {
      id
      symbol
      name
    }
  }
`);
