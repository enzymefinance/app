"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import type { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.network === "homestead") {
          return { http: "/rpc/ethereum" };
        }

        if (chain.network === "matic") {
          return { http: "/rpc/polygon" };
        }

        return null;
      },
    }),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [injectedWallet({ chains })],
  },
]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
