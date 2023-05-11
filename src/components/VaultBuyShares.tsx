"use client";

import { z } from "@/lib/zod";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Address } from "viem";
import { useContractWrite } from "wagmi";

interface VaultDepositProps {
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultBuyShares({ comptroller, denominationAsset }: VaultDepositProps) {
  const schema = z.object({
    amount: z.bigint(),
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      amount: 0n,
    },
    resolver: zodResolver(schema),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: comptroller,
    abi: IComptroller,
    functionName: "buyShares",
    args: [1n, 1n],
  });

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 2: Deposit</h1>
      <input {...register("amount")} />
      <button type="submit">Submit</button>
    </form>
  );
}
