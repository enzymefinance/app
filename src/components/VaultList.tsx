"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deployments } from "@/lib/consts";
import { VaultBasicInfoFragmentDoc, queryCoreSubgraph, useFragment } from "@/lib/gql";
import { vaultListByAccount } from "@/lib/subgraphs/core/vaultListByAccount";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Address } from "viem";
import { useAccount } from "wagmi";

function useVaultListByAccount(account?: Address) {
  const lower = account?.toLowerCase();
  const result = useQuery({
    enabled: !!lower,
    queryKey: ["useVaultListByAccount", lower],
    queryFn: async () => {
      if (!lower) {
        return null;
      }

      const data = await Promise.all(
        deployments.map(async (deployment) => {
          const result = await queryCoreSubgraph({
            deployment,
            document: vaultListByAccount,
            variables: { account: lower },
          });

          return result.releases.flatMap((release) => {
            return (release.vaults ?? []).map((vault) => {
              const fragment = useFragment(VaultBasicInfoFragmentDoc, vault);
              return { name: fragment.name, symbol: fragment.symbol, address: fragment.id as Address, deployment };
            });
          });
        }),
      );

      return data.flatMap((result) => result);
    },
  });

  return result;
}

export function VaultList() {
  const account = useAccount();
  const vaults = useVaultListByAccount(account.address);
  const router = useRouter();

  return (
    <div className="rounded-lg border shadow-md w-full mb-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Symbol</TableHead>
            <TableHead className="w-[100px]">Address</TableHead>
            <TableHead className="w-[100px]">Deployment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaults.data?.map((vault) => (
            <TableRow
              key={vault.address}
              className="cursor-pointer"
              onClick={() => router.push(`/${vault.deployment}/${vault.address}`)}
              onMouseEnter={() => router.prefetch(`/${vault.deployment}/${vault.address}`)}
            >
              <TableCell className="font-medium">{vault.name}</TableCell>
              <TableCell className="font-medium">{vault.symbol}</TableCell>
              <TableCell className="font-medium">{vault.address}</TableCell>
              <TableCell className="font-medium">{vault.deployment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
