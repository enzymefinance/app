import {networks, SUBGRAPH_URL} from "@/consts";
import { getPublicClient } from "@/lib/rpc";
import { VaultDetailsDocument, VaultDetailsQuery } from "@/queries/core";
import { IVault } from "@enzymefinance/abis/IVault";
import { GraphQLClient } from "graphql-request";
import { Address, getAddress } from "viem";
import Link from "next/link";

const deployments = ["mainnet", "polygon", "testnet"] as const;

const getTrackedAssets = async (deployment: typeof deployments[number], vaultId: Address) => {
  const client = getPublicClient(networks[deployment]);

  return await client.readContract({
    abi: IVault,
    address: vaultId,
    functionName: "getTrackedAssets",
  });
};

async function getVaultDetails(id: string) {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
  return await client.request<VaultDetailsQuery>(VaultDetailsDocument, { id });
}

type VaultPageParams = { deployment: string; vault: string };

export default async function VaultPage({ params }: { params: VaultPageParams }) {
  const deployment = params.deployment as typeof deployments[number];

  const { vault } = await getVaultDetails(params.vault);

  const trackedAssets = await getTrackedAssets(deployment, getAddress(params.vault));
  console.log(trackedAssets);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Overview</h2>
      <section style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}>
        <div>Name: {vault?.name}</div>
        <div>Symbol: {vault?.symbol}</div>
        <div>Address: {vault?.id}</div>
        <div>Owner: {vault?.owner?.id}</div>
      </section>
      <h2>Portfolio</h2>
      <div style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}>
        {/*  */}
      </div>
      <h2>Configuration</h2>
      <div style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}>
        <h3>
          <strong>Fees</strong>
        </h3>
        {vault?.comptroller?.fees.map((fee, i) => {
          return (
            <div key={`fee-key-${i}`}>
              <div>Fee Type: {fee.feeType}</div>
            </div>
          );
        })}
        <h3>
          <strong>Policies</strong>
        </h3>
        {vault?.comptroller?.policies.map((policy, i) => {
          return (
            <div key={`policy-key-${i}`}>
              <div>Policy Type: {policy.policyType}</div>
            </div>
          );
        })}
      </div>
      <div style={{display: 'flex'}}>
        <Link href={`${params.deployment}/${vault?.id}/deposit`} style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}>Deposit</Link>
        <Link href={`${params.deployment}/${vault?.id}/redeem`} style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}>Redeem</Link>
      </div>
    </div>
  );
}

export const runtime = "edge";
