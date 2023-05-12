"use client";

import type { Network } from "@/lib/consts";
import { useAllowance } from "@/lib/hooks/useAllowance";
import { z } from "@/lib/zod";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type Address, zeroAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultBuySharesProps {
  network: Network;
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultBuyShares({ network, comptroller, denominationAsset }: VaultBuySharesProps) {
  const { address, isConnecting, isDisconnected } = useAccount();

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
    address: comptroller,
    abi: IComptroller,
    functionName: "buyShares",
  });

  const allowance = useAllowance({
    network,
    token: denominationAsset,
    owner: address ?? zeroAddress,
    spender: comptroller,
  });

  const approvedAmount = useMemo(() => allowance.data ?? 0n, [allowance.data]);

  const onSubmit = (data: zz.infer<typeof schema>) => {
    if (data.amount > approvedAmount) {
      console.log("Cannot deposit more than approved amount.");
      return;
    }
    write({ args: [data.amount, 1n] });
  };

  return (
    <form name="buyShares" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 2: Deposit</h1>
      <input {...register("amount")} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
