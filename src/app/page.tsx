import {GraphQLClient} from "graphql-request";
import {SUBGRAPH_URL} from "@/consts";
import {VaultsDocument} from "@/queries/core";

export const runtime = "edge";

async function getData() {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch })
  return await client.request(VaultsDocument)
}

export default async function RootPage() {

  const data = await getData();
  console.log(data)

  return <main className="flex min-h-screen flex-col items-center justify-between p-24">Hello world!</main>;
}
