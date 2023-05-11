"use client";

import { type Address, parseAbi } from "viem";
import { useContractWrite } from "wagmi";

interface VaultDepositProps {
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultApprove({ comptroller, denominationAsset }: VaultDepositProps) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: denominationAsset,
    abi: parseAbi(["function approve(address spender, uint256 value) external returns (bool)"]),
    functionName: "approve",
    args: [comptroller, 1n],
  });

  return (
    <>
      <h1>Approve</h1>
      <p>Denomination Asset: {denominationAsset}</p>
      <button onClick={() => write()}>Approve</button>
    </>
  );
}
