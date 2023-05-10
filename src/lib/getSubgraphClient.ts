import { SUBGRAPH_URL } from "@/lib/consts";
import { GraphQLClient } from "graphql-request";
import { cache } from "react";

export const getSubgraphClient = cache(function getSubgraphClient() {
  return new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
});
