import { getNetworkByDeployment } from "@/lib/consts";
import {
  ENTRANCE_RATE_BURN_FEE,
  ENTRANCE_RATE_DIRECT_FEE,
  EXIT_RATE_BURN_FEE,
  EXIT_RATE_DIRECT_FEE,
  MANAGEMENT_FEE,
  PERFORMANCE_FEE,
} from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getEnabledFeesForFund } from "@/lib/rpc/getEnabledFeesForFund";
import { getEntranceRateBurnFee } from "@/lib/rpc/getEntranceRateBurnFee";
import { getEntranceRateDirectFee } from "@/lib/rpc/getEntranceRateDirectFee";
import { getExitRateBurnFee } from "@/lib/rpc/getExitRateBurnFee";
import { getExitRateDirectFee } from "@/lib/rpc/getExitRateDirectFee";
import { getFeeManager } from "@/lib/rpc/getFeeManager";
import { getManagementFee } from "@/lib/rpc/getManagementFee";
import { getPerformanceFee } from "@/lib/rpc/getPerformanceFee";
import { getVaultComptroller } from "@/lib/rpc/getVaultComptroller";
import { z } from "@/lib/zod";

export default async function ConfigurationPage({
  params,
}: {
  params: {
    deployment: string;
    vault: string;
  };
}) {
  const { vault, deployment } = assertParams({
    params,
    schema: z.object({
      deployment: z.deployment(),
      vault: z.address(),
    }),
  });

  const network = getNetworkByDeployment(deployment);

  const comptrollerProxy = await getVaultComptroller({ network, vault });

  const feeManager = await getFeeManager({ network, comptrollerProxy });

  const enabledFeesForFund = await getEnabledFeesForFund({
    network,
    comptrollerProxy,
    feeManager,
  });

  console.log("FEES", enabledFeesForFund);

  let result;

  if (enabledFeesForFund.includes(EXIT_RATE_BURN_FEE)) {
    result = await getExitRateBurnFee({
      network,
      comptrollerProxy,
      address: EXIT_RATE_BURN_FEE,
    });
    console.log("EXIT_RATE_BURN_FEE", result);
  }

  if (enabledFeesForFund.includes(EXIT_RATE_DIRECT_FEE)) {
    result = await getExitRateDirectFee({
      network,
      comptrollerProxy,
      address: EXIT_RATE_DIRECT_FEE,
    });
    console.log("EXIT_RATE_DIRECT_FEE", result);
  }

  if (enabledFeesForFund.includes(ENTRANCE_RATE_DIRECT_FEE)) {
    result = await getEntranceRateDirectFee({
      network,
      comptrollerProxy,
      address: ENTRANCE_RATE_DIRECT_FEE,
    });
    console.log("ENTRANCE_RATE_DIRECT_FEE", result);
  }

  if (enabledFeesForFund.includes(ENTRANCE_RATE_BURN_FEE)) {
    result = await getEntranceRateBurnFee({
      network,
      comptrollerProxy,
      address: ENTRANCE_RATE_BURN_FEE,
    });
    console.log("ENTRANCE_RATE_BURN_FEE", result);
  }

  if (enabledFeesForFund.includes(PERFORMANCE_FEE)) {
    result = await getPerformanceFee({
      network,
      comptrollerProxy,
      address: PERFORMANCE_FEE,
    });
    console.log("PERF", result);
  }

  if (enabledFeesForFund.includes(MANAGEMENT_FEE)) {
    result = await getManagementFee({
      network,
      comptrollerProxy,
      address: MANAGEMENT_FEE,
    });
    console.log("MANG", result);
  }

  return (
    <>
      <h2>Configuration</h2>
      <p>TODO</p>
    </>
  );
}

export const runtime = "edge";
