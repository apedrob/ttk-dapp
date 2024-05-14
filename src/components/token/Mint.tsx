import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useWriteTokenContractMint } from "@/wagmi.generated";

import { Button, Stack, Typography } from "@mui/material";

export function Mint() {
  const { address } = useAccount();
  const { writeContract, isPending, data: hash } = useWriteTokenContractMint();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (!address) return null;

  const amount = process.env.NEXT_PUBLIC_MINT_AMOUNT || "1";

  const isDisabled = isPending || isConfirming || Number(amount) < 1;

  return (
    <Stack direction="row" alignItems="baseline" spacing={2}>
      <Button
        variant="outlined"
        size="small"
        disabled={isDisabled}
        onClick={() => {
          writeContract({
            args: [address, BigInt(amount)],
          });
        }}
      >
        {isPending && "Pending for wallet confirmation"}
        {isConfirming && "Waiting for transaction completion"}
        {!isPending && !isConfirming && `Mint  ${amount} TTK`}
      </Button>
      {isSuccess && <Typography variant="overline">Transaction completed 🗸</Typography>}
    </Stack>
  );
}
