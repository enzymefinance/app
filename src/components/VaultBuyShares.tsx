"use client";

import { Title } from "./Title";
import { Button } from "./ui/button";
import { type Deployment, getNetworkByDeployment } from "@/lib/consts";
import { useAllowance } from "@/lib/hooks/useAllowance";
import { useBalanceOf } from "@/lib/hooks/useBalanceOf";
import { getPublicClientForDeployment } from "@/lib/rpc";
import { type output, z } from "@/lib/zod";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { getBuySharesAmount } from "@enzymefinance/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Address, zeroAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";

interface VaultBuySharesProps {
  deployment: Deployment;
  comptroller: Address;
  denominationAsset: Address;
}

export function VaultBuyShares({ deployment, comptroller, denominationAsset }: VaultBuySharesProps) {
  const network = getNetworkByDeployment(deployment);
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

  const approvedAmount = allowance.data ?? 0n;

  const balance = useBalanceOf({
    network,
    token: denominationAsset,
    account: address ?? zeroAddress,
  });

  const accountBalance = balance.data ?? 0n;

  const onSubmit = async (data: output<typeof schema>) => {
    if (data.amount > approvedAmount) {
      console.log("Cannot deposit more than approved amount. Nice try!");
      return;
    }

    if (data.amount > accountBalance) {
      console.log("Balance too low. Go buy some more first.");
      return;
    }

    const client = getPublicClientForDeployment(deployment);
    const sharesReceived = await getBuySharesAmount(client, {
      comptroller,
      amount: data.amount,
      account: address ?? zeroAddress,
    });

    const maxSlippage = BigInt(0.01 * 10000); // 1%
    const minShares = (sharesReceived * (10000n - maxSlippage)) / 10000n;

    write({ args: [data.amount, minShares] });
  };

  return accountBalance === undefined ? null : (
    <form name="buyShares" onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4 my-8">
      <Title appearance="primary">Step 2: Deposit</Title>
      Denomination asset balance: {accountBalance?.toString()}
      Currently approved amount: {approvedAmount?.toString()}
      <br />
      <input {...register("amount")} className="h-10 rounded p-2" />
      <br />
      <Button type="submit">Submit</Button>
    </form>
  );
}
