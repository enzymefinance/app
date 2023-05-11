"use client";

import { z } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Address, parseAbi, parseUnits } from "viem";
import { useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultApproveProps {
  comptroller: Address;
  denominationAsset: Address;
  decimals: bigint;
}

export default function VaultApprove({ comptroller, denominationAsset, decimals }: VaultApproveProps) {
  const schema = z.object({
    amount: z.string(),
  });

  const { register, handleSubmit, getFieldState } = useForm({
    defaultValues: {
      amount: "1",
    },
    resolver: zodResolver(schema),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: denominationAsset,
    abi: parseAbi(["function approve(address, uint256) external returns (bool)"]),
    functionName: "approve",
  });

  const onSubmit = (data: zz.infer<typeof schema>) => {
    console.log(data);
    write({ args: [comptroller, parseUnits(`${Number(data.amount)}`, Number(decimals))] });
  };

  return (
    <form name="approve" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 1: Approve </h1>
      <input {...register("amount")} />
      <button type="submit">Submit</button>
    </form>
  );
}
