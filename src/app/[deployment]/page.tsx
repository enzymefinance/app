import {deployments, SUBGRAPH_URL} from "@/consts";
import {VaultListDocument, VaultListQuery} from "@/queries/core";
import { GraphQLClient } from "graphql-request";
import Link from "next/link";
import { notFound } from 'next/navigation';

export const runtime = "edge";

async function getData() {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
  return await client.request<VaultListQuery>(VaultListDocument);
}

export default async function VaultListPage({ params }: { params: { deployment: string } }) {
  if (!deployments.includes(params.deployment)) {
    notFound()
  }

  console.log("PARAMS", params.deployment);

  const vaults = await getData();

  return (
    <div>
      {vaults.vaults.map(({ id, name, symbol }) => {
        return (
          <div
            key={`vault-${id}`}
            style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}
          >
            <div>{name}</div>
            <div>{symbol}</div>
            <Link href={`${params.deployment}/${id}`}>Link</Link>
          </div>
        );
      })}
    </div>
  );
}

export async function generateStaticParams() {
  return deployments.map((deployment) => ({
    slug: deployment,
  }));
}
