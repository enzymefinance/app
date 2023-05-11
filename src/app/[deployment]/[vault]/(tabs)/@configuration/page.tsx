import {
  ALLOWED_DEPOSIT_RECIPIENTS_POLICY,
  ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY,
  MIN_MAX_INVESTMENT_POLICY,
  getNetworkByDeployment,
} from "@/lib/consts";
import { assertParams } from "@/lib/params";
import { getAllowedDepositRecipientsPolicy } from "@/lib/rpc/getAllowedDepositRecipientsPolicy";
import { getAllowedSharesTransferRecipientsPolicy } from "@/lib/rpc/getAllowedSharesTransferRecipientsPolicy";
import { getEnabledPoliciesForFund } from "@/lib/rpc/getEnabledPoliciesForFund";
import { getMinMaxInvestmentPolicy } from "@/lib/rpc/getMinMaxInvestmentPolicy";
import { getPolicyManager } from "@/lib/rpc/getPolicyManager";
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

  const policyManager = await getPolicyManager({ network, comptrollerProxy });

  const enabledPoliciesForFund = await getEnabledPoliciesForFund({
    network,
    comptroller: comptrollerProxy,
    policyManager,
  });

  let result;

  if (enabledPoliciesForFund.includes(ALLOWED_DEPOSIT_RECIPIENTS_POLICY)) {
    result = await getAllowedDepositRecipientsPolicy({
      network,
      comptrollerProxy,
      address: ALLOWED_DEPOSIT_RECIPIENTS_POLICY,
    });
    console.log("ALLOWED_DEPOSIT_RECIPIENTS_POLICY", result);
  }

  if (enabledPoliciesForFund.includes(MIN_MAX_INVESTMENT_POLICY)) {
    result = await getMinMaxInvestmentPolicy({
      network,
      comptrollerProxy,
      address: MIN_MAX_INVESTMENT_POLICY,
    });
    console.log("MIN_MAX_INVESTMENT_POLICY", result);
  }

  if (enabledPoliciesForFund.includes(ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY)) {
    result = await getAllowedSharesTransferRecipientsPolicy({
      network,
      comptrollerProxy,
      address: ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY,
    });
    console.log("ALLOWED_SHARES_TRANSFER_RECIPIENTS_POLICY", result);
  }

  return (
    <>
      <h2>Configuration</h2>
      <p>TODO</p>
    </>
  );
}
