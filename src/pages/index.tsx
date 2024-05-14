import { NextPage } from "next";
import { useAccount, useChainId } from "wagmi";
import { bankContractAddress, tokenContractAddress } from "@/wagmi.generated";
import { Stack, Divider } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Form } from "@/components";
import * as Bank from "@/components/bank";
import * as Token from "@/components/token";

import type { WagmiConfig } from "@/components/Web3";

const Home: NextPage = () => {
  const chainId = useChainId<WagmiConfig>();
  const { address, chain } = useAccount();

  const bankAddress =
    bankContractAddress[chainId as keyof typeof bankContractAddress];

  const tokenAddress =
    tokenContractAddress[chainId as keyof typeof tokenContractAddress];

  return (
    <Stack m={10} direction="column" justifyContent="center" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <h1>Account</h1>
        <ConnectButton showBalance={false} />
      </Stack>

      {address && chain && (
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={4}
        >
          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <h2>BankToken (TTK)</h2>
              <small>{tokenAddress}</small>
            </Stack>

            <Stack direction="column" spacing={2}>
              <Token.Balance />

              <Stack direction="row" alignItems="baseline" spacing={2}>
                <i>For testing purposes:</i>
                <Token.Mint />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <h2>Bank</h2>
              <small>{bankAddress}</small>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Bank.Balance />
              <Token.Allowance spender={bankAddress} />
            </Stack>

            <Form />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Home;
