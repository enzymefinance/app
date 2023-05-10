import type { Deployment } from "./consts";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLClient, type RequestDocument, type Variables } from "graphql-request";
import { cache } from "react";

export * from "@/lib/generated/gql";
export * from "@/lib/generated/gql/graphql";

const baseUrl = "https://api.thegraph.com/subgraphs/name/enzymefinance";

export const getCoreSubgrahClient = cache(function getCoreSubgrahClient(deployment: Deployment) {
  switch (deployment) {
    case "ethereum": {
      return new GraphQLClient(`${baseUrl}/enzyme-core`, {
        fetch: fetch,
      });
    }

    case "polygon": {
      return new GraphQLClient(`${baseUrl}/enzyme-core-polygon`, {
        fetch: fetch,
      });
    }

    case "testnet": {
      return new GraphQLClient(`${baseUrl}/enzyme-core-testnet`, {
        fetch: fetch,
      });
    }
  }
});

export async function queryCoreSubgraph<TType, TVariables extends Variables = Variables>({
  deployment,
  document,
  variables,
}: QuerySubgraphParams<TType, TVariables> & { deployment: Deployment }) {
  const client = getCoreSubgrahClient(deployment);
  return await client.request(document, variables);
}

// rome-ignore lint/suspicious/noExplicitAny: this is fine ...
export type QuerySubgraphParams<TType, TVariables extends Variables = Variables> = TVariables extends Record<any, never>
  ? {
      variables?: never;
      document: RequestDocument | TypedDocumentNode<TType, TVariables>;
    }
  : {
      variables: TVariables;
      document: RequestDocument | TypedDocumentNode<TType, TVariables>;
    };
