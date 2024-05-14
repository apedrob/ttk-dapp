import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import {
  useReadTokenContractAllowance,
  useReadBankContractGetBalance,
  useReadTokenContractBalanceOf,
  bankContractAddress,
} from "@/wagmi.generated";
import { useAccount, useChainId } from "wagmi";

import * as Bank from "@/components/bank";
import * as Token from "@/components/token";

import type { WagmiConfig } from "@/components/Web3";

export function Form() {
  const { address } = useAccount();
  const chainId = useChainId<WagmiConfig>();
  const [action, setAction] = useState<"deposit" | "withdraw" | "approve">(
    "deposit"
  );
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const bankAddress =
    bankContractAddress[chainId as keyof typeof bankContractAddress];

  const { data: allowance } = useReadTokenContractAllowance({
    args: address && [address ?? "0x0", bankAddress],
  });
  const { data: bankBalance } = useReadBankContractGetBalance({
    args: address && [address ?? "0x0"],
  });
  const { data: walletBalance } = useReadTokenContractBalanceOf({
    args: address && [address ?? "0x0"],
  });

  const clearForm = () => {
    setAmount("");
    setError(false);
    setErrorText("");
  };

  useEffect(() => {
    clearForm();
  }, [allowance, bankBalance, walletBalance]);

  const handleAction = (
    _event: React.MouseEvent<HTMLElement>,
    newAction: "deposit" | "withdraw" | "approve"
  ) => {
    if (newAction !== null) {
      setAction(newAction);
      clearForm();
    }
  };

  const handleMaxAmount = () => {
    let maxAmount = "";

    if (action === "deposit" && allowance && walletBalance && allowance > 0) {
      maxAmount =
        walletBalance > allowance
          ? allowance.toString()
          : walletBalance.toString();
    }

    if (action === "withdraw" && bankBalance && bankBalance > 0) {
      // Bank contract does not allow to withdraw all balance
      // require (balance > _amount, "Cannot withdraw more than current balance");
      maxAmount = (BigInt(bankBalance) - BigInt("1")).toString();
    }

    setAmount(maxAmount);
  };

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    const isValidInteger = /^\d+$/.test(inputValue);

    if (!isValidInteger) {
      setAmount("");
      setErrorText("Invalid amount. Please insert a positive integer.");
      setError(true);
      return;
    }

    const currentAmount = BigInt(inputValue);
    setAmount(currentAmount.toString());
    setError(false);
    setErrorText("");

    const allowanceValue = BigInt(allowance ?? 0);
    const walletBalanceValue = BigInt(walletBalance ?? 0);
    const bankBalanceValue = BigInt(bankBalance ?? 0) - BigInt("1");

    if (action === "deposit" && allowanceValue < currentAmount) {
      setErrorText("Insufficient allowance. Please approve more tokens.");
      setError(true);
    } else if (action === "deposit" && walletBalanceValue < currentAmount) {
      setErrorText("Insufficient wallet balance. Please mint more tokens.");
      setError(true);
    } else if (action === "withdraw" && bankBalanceValue < currentAmount) {
      setErrorText("Insufficient bank balance.");
      setError(true);
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <ToggleButtonGroup
          color="primary"
          value={action}
          exclusive
          onChange={handleAction}
          aria-label="Platform"
        >
          <ToggleButton value="deposit">Deposit</ToggleButton>
          <ToggleButton value="withdraw">Withdraw</ToggleButton>
          <ToggleButton value="approve">Approve</ToggleButton>
        </ToggleButtonGroup>

        {action !== "approve" && (
          <Button onClick={handleMaxAmount} size="small" variant="text">
            Max amount
          </Button>
        )}
      </Stack>
      <TextField
        id="amount"
        onChange={handleAmount}
        value={amount}
        label="Amount"
        error={error}
        helperText={errorText}
        type="number"
      />

      {action === "approve" ? (
        <Token.Approve spender={bankAddress} disabled={error} value={amount} />
      ) : (
        <Bank.Movement type={action} disabled={error} value={amount} />
      )}
    </Stack>
  );
}
