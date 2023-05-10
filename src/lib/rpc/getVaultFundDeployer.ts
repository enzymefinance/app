import type { Network } from "@/lib/consts";
import { getPublicClient } from "@/lib/rpc";
import { IVault } from "@enzymefinance/abis/IVault";
import type { Address } from "viem";
import { readContract } from "viem/contract";

export async function getVaultFundDeployer({
  network,
  vault,
}: {
  network: Network;
  vault: Address;
}) {
  const client = getPublicClient(network);
  const fundDeployer = await readContract(client, {
    abi: IVault,
    functionName: "getFundDeployer",
    address: vault,
  });

  return fundDeployer;
}
