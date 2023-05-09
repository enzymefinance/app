import { graphql } from "./generated/gql";

export const vaultList = graphql(/* GraphQL */ `
  query VaultList {
    vaults {
      id
      symbol
      name
    }
  }
`);
