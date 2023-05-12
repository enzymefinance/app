"use client";

import type { Network } from "@/lib/consts";
import { useAllowance } from "@/lib/hooks/useAllowance";
import { useBalanceOf } from "@/lib/hooks/useBalanceOf";
import { getBuySharesAmount } from "@/lib/rpc/getBuySharesAmount";
import { type output, z } from "@/lib/zod";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Address, zeroAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";

interface VaultBuySharesProps {
  network: Network;
  comptroller: Address;
  denominationAsset: Address;
}

export function VaultBuyShares({ network, comptroller, denominationAsset }: VaultBuySharesProps) {
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

    const sharesReceived = await getBuySharesAmount({
      network,
      comptroller,
      amount: data.amount,
      account: address ?? zeroAddress,
    });

    const maxSlippage = BigInt(0.01 * 10000); // 1%
    const minShares = (sharesReceived * (10000n - maxSlippage)) / 10000n;

    write({ args: [data.amount, minShares] });
  };

  return accountBalance === undefined ? null : (
    <form name="buyShares" onSubmit={handleSubmit(onSubmit)}>
      <h1>Step 2: Deposit</h1>
      Denomination asset balance: {accountBalance?.toString()}
      Currently approved amount: {approvedAmount?.toString()}
      <br />
      <input {...register("amount")} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
