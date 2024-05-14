"use client";

import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const wagmi = getDefaultConfig({
  appName: "TTK dApp",
  projectId: process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID ?? "YOUR_PROJECT_ID",
  chains: [
    process.env.NEXT_PUBLIC_WAGMI_NETWORK === "testnet" ? sepolia : mainnet,
  ],
  ssr: true,
});

export type WagmiConfig = typeof wagmi;

export function Web3({ children }: Props) {
  return (
    <WagmiProvider config={wagmi}>
      <RainbowKitProvider showRecentTransactions={true}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

interface Props {
  children: React.ReactNode;
}
