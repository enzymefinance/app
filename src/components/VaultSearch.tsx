"use client";

import { type Deployment, getNetworkByDeployment } from "@/lib/consts";
import { VaultBasicInfoFragmentDoc, queryCoreSubgraph, useFragment } from "@/lib/gql";
import { getAssetSymbol } from "@/lib/rpc/getAssetSymbol";
import { getVaultName } from "@/lib/rpc/getVaultName";
import { vaultSearch } from "@/lib/subgraphs/core/vaultSearch";
import { Combobox } from "@headlessui/react";
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

      const data = await queryCoreSubgraph(vaultSearch, { name: query });
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

  const result = useVaultSearch("ethereum", debounced);

  return (
    <Combobox onChange={(value: VaultBaseInfo) => router.push(`/ethereum/${value.address}`)}>
      <Combobox.Input
        onChange={(event) => setValue(event.target.value)}
        displayValue={(item: VaultBaseInfo) => item.name}
      />
      <Combobox.Options>
        {result?.data?.map((item) => (
          <Combobox.Option key={item.address} value={item}>
            {item.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
