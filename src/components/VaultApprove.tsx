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
    amount: z.bigint(),
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      amount: 1000000000000000000n,
    },
    resolver: zodResolver(schema),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: denominationAsset,
    abi: parseAbi(["function approve(address, uint256) external returns (bool)"]),
    functionName: "approve",
  });

  const onSubmit = (data: zz.infer<typeof schema>) => {
    write({ args: [comptroller, data.amount] });
  };

  return (
    <form name="approve" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 1: Approve </h1>
      <input {...register("amount")} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
