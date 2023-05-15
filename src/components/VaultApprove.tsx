"use client";

import { Title } from "./Title";
import { Button } from "./ui/button";
import { type Deployment, getNetworkByDeployment } from "@/lib/consts";
import { useAllowance } from "@/lib/hooks/useAllowance";
import { z } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { type Address, parseAbi, zeroAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { z as zz } from "zod";

interface VaultApproveProps {
  deployment: Deployment;
  comptroller: Address;
  denominationAsset: Address;
}

export function VaultApprove({ deployment, comptroller, denominationAsset }: VaultApproveProps) {
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
    network: getNetworkByDeployment(deployment),
    token: denominationAsset,
    owner: address ?? zeroAddress,
    spender: comptroller,
  });

  const approvedAmount = useMemo(() => allowance.data ?? 0n, [allowance.data]);

  const onSubmit = (data: zz.infer<typeof schema>) => {
    if (data.amount <= approvedAmount) {
      console.log("Approving less (or equal_ than already approved. Why would you do that?");
      return;
    }

    write({ args: [comptroller, data.amount] });
  };

  return (
    <form name="approve" onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4 my-8">
      <Title appearance="primary">Step 1: Approve </Title>
      Currently approved amount: {approvedAmount.toString()}
      <br />
      <input {...register("amount")} className="h-10 rounded p-2" />
      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
}
