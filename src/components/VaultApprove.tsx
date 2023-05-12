"use client";

import type { Network } from "../lib/consts";
import { useAllowance } from "../lib/hooks/useAllowance";
import { z } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type Address, parseAbi, parseUnits, zeroAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultApproveProps {
  network: Network;
  comptroller: Address;
  denominationAsset: Address;
}

export default function VaultApprove({ network, comptroller, denominationAsset }: VaultApproveProps) {
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
    address: denominationAsset,
    abi: parseAbi(["function approve(address, uint256) external returns (bool)"]),
    functionName: "approve",
  });

  const allowance = useAllowance({
    network,
    token: denominationAsset,
    owner: address ?? zeroAddress,
    spender: comptroller,
  });

  const approvedAmount = useMemo(() => allowance.data ?? 0n, [allowance.data]);

  const onSubmit = (data: zz.infer<typeof schema>) => {
    if (data.amount <= approvedAmount) {
      console.log("Approving less than already approved.");
      return;
    }
    write({ args: [comptroller, data.amount] });
  };

  return (
    <form name="approve" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 1: Approve </h1>
      Currently approved amount: {approvedAmount.toString()}
      <br />
      <input {...register("amount")} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
