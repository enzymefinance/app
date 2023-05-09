// import { getPublicClient } from "@/lib/rpc";
// import { IVault } from "@enzymefinance/abis/IVault";
// import { notFound } from "next/navigation";
// import { isAddress } from "viem";
import { GraphQLClient } from "graphql-request";
import {SUBGRAPH_URL} from "@/consts";
import {VaultDetailsDocument, VaultDetailsQuery} from "@/queries/core";

// const deployments = ["mainnet", "polygon", "testnet"] as const;
// const networks = {
//   mainnet: "mainnet",
//   polygon: "polygon",
//   testnet: "polygon",
// } as const;
//
// async function getVault(params: VaultPageParams) {
//   if (!isAddress(params.vault)) {
//     return notFound();
//   }
//
//   const deployment = params.deployment as typeof deployments[number];
//   if (!deployments.includes(deployment)) {
//     return notFound();
//   }
//
//   const client = getPublicClient(networks[deployment]);
//   const result = await client.readContract({
//     abi: IVault,
//     functionName: "name",
//     address: params.vault,
//   });
//
//   return result;
// }

async function getVaultDetails(id: string) {
  const client = new GraphQLClient(SUBGRAPH_URL, { fetch: fetch });
  return await client.request<VaultDetailsQuery>(VaultDetailsDocument, { id });
}

// type VaultPageParams = { deployment: string; vault: string };

export default async function VaultPage({ params }: { params: { deployment: string; vault: string } }) {
  const { vault } = await getVaultDetails(params.vault);
  console.log(vault)

  return <div style={{padding: '1rem'}}>
    <h2>Overview</h2>
    <section
        style={{ border: "1px solid #333", padding: "1rem", backgroundColor: "#e8e8e8", margin: "1rem" }}
    >
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
      <h3><strong>Fees</strong></h3>
      {vault?.comptroller?.fees.map((fee) => {
        return <div>
          <div>Fee Type: {fee.feeType}</div>
        </div>
      })}
      <h3><strong>Policies</strong></h3>
      {vault?.comptroller?.policies.map((policy) => {
        return <div>
          <div>Policy Type: {policy.policyType}</div>
        </div>
      })}
    </div>
  </div>
}

export const runtime = "edge";
