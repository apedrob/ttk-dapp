import { useAccount } from "wagmi";
import {
  useReadBankContractGetBalance,
  useWatchBankContractEvent,
} from "@/wagmi.generated";

import { Typography } from "@mui/material";

export function Balance() {
  const { address } = useAccount();
  const { data: balance, refetch } = useReadBankContractGetBalance({
    args: address && [address ?? "0x0"],
  });

  useWatchBankContractEvent({
    onLogs: () => {
      refetch().catch(console.error);
    },
  });

  if (!balance && balance !== 0n) return null;

  return (
    <Typography>
      Balance: {balance.toString()}
    </Typography>
  );
}
