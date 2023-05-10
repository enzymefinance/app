import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deployments } from "@/lib/consts";
import { getSubgraphClient } from "@/lib/getSubgraphClient";
import { vaultList } from "@/lib/subgraphs/core/vaultList";
import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "edge";

async function getData() {
  const client = getSubgraphClient();
  return await client.request(vaultList);
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
              <CardTitle>{name}</CardTitle>
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
