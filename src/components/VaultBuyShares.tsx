"use client";

import { z } from "@/lib/zod";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Address, parseUnits } from "viem";
import { useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultBuySharesProps {
  comptroller: Address;
  denominationAsset: Address;
  decimals: bigint;
}

export default function VaultBuyShares({ comptroller, decimals }: VaultBuySharesProps) {
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
    address: comptroller,
    abi: IComptroller,
    functionName: "buyShares",
  });

  const onSubmit = (data: zz.infer<typeof schema>) => {
    write({ args: [parseUnits(`${Number(data.amount)}`, Number(decimals)), 1n] });
  };

  return (
    <form name="buyShares" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 2: Deposit</h1>
      <input {...register("amount")} />
      <button type="submit">Submit</button>
    </form>
  );
}
