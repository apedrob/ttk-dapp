import { useAccount } from "wagmi";
import {
  useReadTokenContractAllowance,
  useWatchTokenContractTransferEvent,
  useWatchTokenContractApprovalEvent,
} from "@/wagmi.generated";
import { Typography } from "@mui/material";
import { Address } from "viem";

export function Allowance({ spender }: Props) {
  const { address } = useAccount();
  const { data: allowance, refetch } = useReadTokenContractAllowance({
    args: address && [
      address ?? "0x0",
      spender ?? "0x0",
    ],
  });

  useWatchTokenContractApprovalEvent({
    onLogs: () => {
      refetch().catch(console.error);
    },
  });

  useWatchTokenContractTransferEvent({
    onLogs: () => {
      refetch().catch(console.error);
    },
  });

  if (!allowance && allowance !== 0n) return null;

  return <Typography>Allowance: {allowance.toString()}</Typography>;
}

interface Props {
  spender: Address;
}
