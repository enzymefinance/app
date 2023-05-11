"use client";

import { z } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { type Address, parseAbi } from "viem";
import { useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultDepositProps {
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultApprove({ comptroller, denominationAsset }: VaultDepositProps) {
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
    address: denominationAsset,
    abi: parseAbi(["function approve(address, uint256) external returns (bool)"]),
    functionName: "approve",
  });

  const onSubmit = useCallback(
    () => (data: zz.infer<typeof schema>) => {
      write({ args: [comptroller, data.amount] });
    },
    [comptroller, schema],
  );

  return (
    <>
      <h1>Step 1: Approve </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" min={0} {...register("amount")} />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
