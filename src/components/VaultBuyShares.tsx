"use client";

import { IComptroller } from "@enzymefinance/abis/IComptroller";
import type { Address } from "viem";
import { useContractWrite } from "wagmi";

interface VaultDepositProps {
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultBuyShares({ comptroller, denominationAsset }: VaultDepositProps) {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: comptroller,
    abi: IComptroller,
    functionName: "buyShares",
    args: [1n, 1n],
  });

  return (
    <>
      <h1>Deposit</h1>
      <p>Denomination Asset: {denominationAsset}</p>
      <button onClick={() => write()}>Deposit</button>
    </>
  );
}
