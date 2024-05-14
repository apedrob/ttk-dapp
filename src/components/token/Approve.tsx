import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useWriteTokenContractApprove } from "@/wagmi.generated";

import { Button, Typography } from "@mui/material";
import { Address } from "viem";

export function Approve({ spender, value, disabled }: Props) {
  const { address } = useAccount();

  const {
    writeContract,
    reset,
    isPending,
    data: hash,
  } = useWriteTokenContractApprove();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && value) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!address) return null;

  const isDisabled =
    disabled ||
    isPending ||
    isConfirming ||
    Number(value) < 1;

  return (
    <>
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={() => {
          writeContract({
            args: [spender ?? "0x0", BigInt(value)],
          });
        }}
      >
        {isPending && "Pending for wallet confirmation"}
        {isConfirming && `Waiting for approve completion`}
        {!isPending && !isConfirming && `Approve  ${value} TTK`}
      </Button>
      {isSuccess && <Typography>Transaction completed 🗸</Typography>}
    </>
  );
}

interface Props {
  spender: Address;
  value: string;
  disabled: boolean;
}
