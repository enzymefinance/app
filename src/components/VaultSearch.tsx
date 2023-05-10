"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { type Deployment, getNetworkByDeployment } from "@/lib/consts";
import { VaultBasicInfoFragmentDoc, queryCoreSubgraph, useFragment } from "@/lib/gql";
import { getAssetSymbol } from "@/lib/rpc/getAssetSymbol";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { vaultSearch } from "@/lib/subgraphs/core/vaultSearch";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
        const network = getNetworkByDeployment(deployment);
        const [vaultName, vaultSymbol] = await Promise.all([
          getVaultName({ network, vault: query }),
          getAssetSymbol({ network, asset: query }),
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
      return data.vaults.map((vault) => {
        const fragment = useFragment(VaultBasicInfoFragmentDoc, vault);
        return { name: fragment.name, symbol: fragment.symbol, address: fragment.id as Address };
      });
    },
    keepPreviousData: true,
  });

  return significant ? result : undefined;
}

export function VaultSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(value), 250, [value]);

  const ethereum = useVaultSearch("ethereum", debounced);
  const polygon = useVaultSearch("polygon", debounced);

  const ethereumData = ethereum?.data ?? [];
  const polygonData = polygon?.data ?? [];

  return (
    <Command shouldFilter={false} className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search vaults ..." onValueChange={(value) => setValue(value)} />
      <CommandEmpty>No vaults found.</CommandEmpty>
      {(ethereumData.length ?? 0) > 0 ? (
        <CommandGroup heading="Ethereum">
          {ethereumData.map((item) => (
            <CommandItem
              key={item.address}
              value={item.address}
              onSelect={() => router.push(`/ethereum/${item.address}`)}
            >
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      ) : null}
      {(polygonData.length ?? 0) > 0 ? (
        <CommandGroup heading="Polygon">
          {polygonData.map((item) => (
            <CommandItem
              key={item.address}
              value={item.address}
              onSelect={() => router.push(`/polygon/${item.address}`)}
            >
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      ) : null}
    </Command>
  );
}
