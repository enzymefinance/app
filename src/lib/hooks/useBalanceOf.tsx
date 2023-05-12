"use client";

import type { Network } from "../consts";
import { getPublicClient } from "../rpc";
import { useQuery } from "@tanstack/react-query";
import { type Address, parseAbi, zeroAddress } from "viem";

interface BalanceOfProps {
  network: Network;
  token: Address;
  account: Address;
}

export function useBalanceOf({ network, token, account }: BalanceOfProps) {
  return useQuery({
    queryKey: ["useBalanceOf", token, account],
    queryFn: async () => {
      const publicClient = getPublicClient(network);
      return publicClient.readContract({
        address: token,
        abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
        functionName: "balanceOf",
        args: [account],
      });
    },
    enabled: account !== zeroAddress,
  });
}
