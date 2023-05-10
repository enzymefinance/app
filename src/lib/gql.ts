import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLClient, type RequestDocument, type Variables } from "graphql-request";
import type { VariablesAndRequestHeadersArgs } from "graphql-request/build/esm/types";
import { cache } from "react";

export * from "@/lib/generated/gql";
export * from "@/lib/generated/gql/graphql";

// TODO: Add a deployment parameter
export const getCoreSubgrahClient = cache(function getCoreSubgrahClient() {
  return new GraphQLClient("https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme-core", {
    fetch: fetch,
  });
});

export async function queryCoreSubgraph<TType, TVariables extends Variables = Variables>(
  document: RequestDocument | TypedDocumentNode<TType, TVariables>,
  ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<TVariables>
) {
  const client = getCoreSubgrahClient();
  return await client.request(document, ...variablesAndRequestHeaders);
}
