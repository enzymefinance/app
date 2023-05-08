import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest, { params }: { params: { network: string } }) {
  if (!Object.keys(networks).includes(params.network)) {
    return new Response(undefined, { status: 404 });
  }

  const network = networks[params.network as keyof typeof networks];
  const url = `https://${network}.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;

  return fetch(url, {
    method: "POST",
    body: req.body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const networks = {
  mainnet: "eth-mainnet",
  polygon: "polygon-mainnet",
} as const;
