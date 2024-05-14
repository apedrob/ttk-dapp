import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia } from "wagmi/chains";
import { Address } from "viem";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });

  return {
    out: "src/wagmi.generated.ts",
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: sepolia.id,
        contracts: [
          {
            name: "TokenContract",
            address: {
              [sepolia.id]: env.SEPOLIA_TOKEN_ADDRESS as Address,
            },
          },
          {
            name: "BankContract",
            address: {
              [sepolia.id]: env.SEPOLIA_BANK_ADDRESS as Address,
            },
          },
        ],
      }),
      react(),
    ],
  };
});
