"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { getRpcUrl } from "@/lib/rpc";
import { RainbowKitProvider, connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, injectedWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
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
          return { http: getRpcUrl("ethereum") };
        }

        if (chain.network === "matic") {
          return { http: getRpcUrl("polygon") };
        }

        return null;
      },
    }),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [injectedWallet({ chains }), rainbowWallet({ chains })],
  },
  {
    groupName: "Others",
    wallets: [coinbaseWallet({ chains, appName: "Enzyme" }), walletConnectWallet({ chains })],
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
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#8b5cf6",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
