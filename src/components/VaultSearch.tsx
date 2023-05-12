"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { type Deployment, deployments } from "@/lib/consts";
import { VaultBasicInfoFragmentDoc, queryCoreSubgraph, useFragment } from "@/lib/gql";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { vaultSearch } from "@/lib/subgraphs/core/vaultSearch";
import { getAssetSymbol } from "@enzymefinance/sdk";
import { getVaultName } from "@enzymefinance/sdk";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { type Address, isAddress } from "viem";

type VaultBaseInfo = {
  name: string;
  symbol: string;
  address: Address;
};

function useVaultSearch(deployment: Deployment, query: string) {
  const significant = !!(query && query.length >= 3);
  const result = useQuery<VaultBaseInfo[]>({
    enabled: significant,
    queryKey: ["useVaultSearch", deployment, query],
    queryFn: async () => {
      if (isAddress(query)) {
        const client = getPublicClientForDeployment(deployment);
        const [vaultName, vaultSymbol] = await Promise.all([
          getVaultName(client, { vault: query }),
          getAssetSymbol(client, { asset: query }),
        ]);

        return [{ name: vaultName, symbol: vaultSymbol, address: query }];
      }

      const data = await queryCoreSubgraph({
        deployment,
        document: vaultSearch,
        variables: {
          name: query,
        },
      });

      const vaults = data.releases.flatMap((release) => release.vaults ?? []);
      return vaults.map((vault) => {
        const fragment = useFragment(VaultBasicInfoFragmentDoc, vault);
        return { name: fragment.name, symbol: fragment.symbol, address: fragment.id as Address };
      });
    },
    placeholderData: (previous) => (significant && !isAddress(query) ? previous : undefined),
  });

  return result;
}

export function VaultSearch() {
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(value), 250, [value]);

  return (
    <Command shouldFilter={false} className="rounded-lg border shadow-md" loop={true}>
      <CommandInput placeholder="Search vaults ..." onValueChange={(value) => setValue(value)} />
      <CommandEmpty>No vaults found.</CommandEmpty>
      {deployments.map((deployment) => (
        <VaultSearchDeploymentGroup key={deployment} deployment={deployment} query={debounced} />
      ))}
    </Command>
  );
}

function VaultSearchDeploymentGroup({ deployment, query }: { deployment: Deployment; query: string }) {
  const router = useRouter();
  const heading = useMemo(() => `${deployment.slice(0, 1).toUpperCase()}${deployment.slice(1)}`, [deployment]);
  const result = useVaultSearch(deployment, query);
  const data = result.data ?? [];

  if (data.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading={heading}>
      {data.map((item) => (
        <CommandItem
          key={item.address}
          value={item.address}
          onSelect={() => router.push(`/${deployment}/${item.address}`)}
        >
          <Link href={`/${deployment}/${item.address}`} className="block">
            {item.name}
          </Link>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
