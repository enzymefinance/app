import { graphql } from "./generated/gql";

export const vaultList = graphql(`
  query VaultList {
    vaults {
      id
      symbol
      name
    }
  }
`);
