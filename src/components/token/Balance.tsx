import {
  useReadTokenContractBalanceOf,
  useWatchTokenContractEvent,
  useWatchBankContractEvent,
} from "@/wagmi.generated";
import { Typography } from "@mui/material";
import { useAccount } from "wagmi";

export function Balance() {
  const { address } = useAccount();
  const { data: balance, refetch } = useReadTokenContractBalanceOf({
    args: address && [address ?? "0x0"],
  });

  useWatchTokenContractEvent({
    onLogs: () => {
      refetch().catch(console.error);
    },
  });

  
  useWatchBankContractEvent({
    onLogs: () => {
      refetch().catch(console.error);
    },
  });

  if (!balance && balance !== 0n) return null;

  return <Typography>Balance: {balance.toString()}</Typography>;
}
