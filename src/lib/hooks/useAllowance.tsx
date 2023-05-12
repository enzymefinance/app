import type { Network } from "../consts";
import { getPublicClient } from "../rpc";
import { type Address, parseAbi, zeroAddress } from "viem";
import { useQuery } from "wagmi";

interface AllowanceProps {
  network: Network;
  token: Address;
  owner: Address;
  spender: Address;
}

export async function fetchAllowance({ network, token, owner, spender }: AllowanceProps) {
  const publicClient = getPublicClient(network);
  return publicClient.readContract({
    address: token,
    abi: parseAbi(["function allowance(address owner, address spender) external view returns (uint256)"]),
    functionName: "allowance",
    args: [owner, spender],
  });
}

export function useAllowance({ network, token, owner, spender }: AllowanceProps) {
  const queryKey = ["useAllowance", token, owner, spender];
  return useQuery(queryKey, {
    queryFn: async (context) => fetchAllowance({ network, token, owner, spender }),
    enabled: owner !== zeroAddress,
  });
}
