import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useWriteBankContract,
  useSimulateBankContract,
} from "@/wagmi.generated";

import { Button, Typography } from "@mui/material";

export function Movement({ type, value, disabled }: Props) {
  const { address } = useAccount();

  const {
    data,
    isLoading: isLoadingSimulation,
    isError: isErrorSimulation,
    isSuccess: isSuccessSimulation,
    failureReason,
  } = useSimulateBankContract({
    functionName: type as "deposit" | "withdraw",
    args: [BigInt(value)],
  });

  const {
    writeContract,
    reset,
    isError,
    isPending,
    data: hash,
  } = useWriteBankContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleWriteContract = () => {
    if (isSuccessSimulation && data) {
      writeContract(data.request);
    }
  };

  useEffect(() => {
    if (isSuccess && value) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (!address) return null;

  const isDisabled =
    disabled ||
    isLoadingSimulation ||
    isErrorSimulation ||
    isPending ||
    isConfirming ||
    Number(value) < 1;

  const isRunningSimulation = !disabled && isLoadingSimulation;
  const isActionInProgress = isPending || isConfirming || isRunningSimulation;
  const showErrorSimulationMessage = !disabled && isErrorSimulation;

  return (
    <>
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleWriteContract}
      >
        {isRunningSimulation && `Running ${type} simulation`}
        {isPending && "Pending for wallet confirmation"}
        {isConfirming && `Waiting for ${type} completion`}
        {!isActionInProgress && `${type} ${value} TTK`}
      </Button>
      {isSuccess && <Typography>Transaction completed 🗸</Typography>}
      {isError && <Typography>Wallet confirmation error</Typography>}
      {showErrorSimulationMessage && (
        <Typography>Simulation failed: {failureReason?.toString()}</Typography>
      )}
    </>
  );
}

interface Props {
  type: string;
  value: string;
  disabled: boolean;
}
