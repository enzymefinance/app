import type { Network } from "../consts";
import { getPublicClient } from "../rpc";
import { type Address, parseAbi, zeroAddress } from "viem";
import { useQuery } from "wagmi";

interface BalanceOfProps {
  network: Network;
  token: Address;
  account: Address;
}

export async function fetchBalanceOf({ network, token, account }: BalanceOfProps) {
  const publicClient = getPublicClient(network);
  return publicClient.readContract({
    address: token,
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
    functionName: "balanceOf",
    args: [account],
  });
}

export function useBalanceOf({ network, token, account }: BalanceOfProps) {
  const queryKey = ["useBalanceOf", token, account];
  return useQuery(queryKey, {
    queryFn: async (context) => fetchBalanceOf({ network, token, account }),
    enabled: account !== zeroAddress,
  });
}
