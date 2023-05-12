"use client";

import type { Network } from "../consts";
import { getPublicClient } from "../rpc";
import { useQuery } from "@tanstack/react-query";
import { type Address, parseAbi, zeroAddress } from "viem";

interface AllowanceProps {
  network: Network;
  token: Address;
  owner: Address;
  spender: Address;
}

export function useAllowance({ network, token, owner, spender }: AllowanceProps) {
  return useQuery({
    queryKey: ["useAllowance", network, token, owner, spender],
    queryFn: async () => {
      const publicClient = getPublicClient(network);
      return publicClient.readContract({
        address: token,
        abi: parseAbi(["function allowance(address owner, address spender) external view returns (uint256)"]),
        functionName: "allowance",
        args: [owner, spender],
      });
    },
    enabled: owner !== zeroAddress,
  });
}
