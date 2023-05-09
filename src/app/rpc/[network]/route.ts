import { getRpcUrl } from "@/lib/rpc";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { network: string } }) {
  const network = params.network;
  if (network !== "mainnet" && network !== "polygon") {
    return new Response(undefined, { status: 404 });
  }

  return fetch(getRpcUrl(network), {
    method: "POST",
    body: req.body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const runtime = "edge";
