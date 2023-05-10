import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryCoreSubgraph } from "@/lib/gql";
import { assertParams } from "@/lib/params";
import { vaultList } from "@/lib/subgraphs/core/vaultList";
import { z } from "@/lib/zod";
import Link from "next/link";

export default async function VaultListPage({ params }: { params: { deployment: string } }) {
  const { deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
    }),
  });

  const result = await queryCoreSubgraph(vaultList);

  return (
    <div>
      {result.vaults.map(({ id, name, symbol }) => {
        return (
          <Card key={`vault-${id}`}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>symbol: {symbol}</div>
              <Link href={`${deployment}/${id}`}>Link</Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export const runtime = "edge";
