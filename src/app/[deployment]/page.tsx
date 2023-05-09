import { SUBGRAPH_URL, deployments } from "@/lib/consts";
import { VaultListDocument, VaultListQuery } from "@/lib/generated/subgraphs/core";
import { GraphQLClient } from "graphql-request";
import { notFound } from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";

export const runtime = "edge";

async function getData() {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
  return await client.request<VaultListQuery>(VaultListDocument);
}

export default async function VaultListPage({ params }: { params: { deployment: string } }) {
  if (!deployments.includes(params.deployment)) {
    notFound();
  }

  const vaults = await getData();

  return (
    <div>
      {vaults.vaults.map(({ id, name, symbol }) => {
        return (
            <Card key={`vault-${id}`}>
              <CardHeader>
                <CardTitle>
                  {name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>symbol: {symbol}</div>
                <Link href={`${params.deployment}/${id}`}>Link</Link>
              </CardContent>
            </Card>
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
