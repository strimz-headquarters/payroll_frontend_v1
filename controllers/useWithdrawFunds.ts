/* eslint-disable @typescript-eslint/no-explicit-any */
import { IERC20ABI } from "@/constants/ABIs/IERC20ABI";
import { USDC_ON_SEPOLIA, USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { parseUnits } from "viem";
import { sepolia } from "viem/chains";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

const useWithdrawFunds = () => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const { data: hash, error, writeContract } = useWriteContract();

  const usdc_contract_address = USDC_ON_SEPOLIA;
  const usdt_contract_address = USDT_ON_SEPOLIA;

  const withdrawFunds = useCallback(
    async (token: string, amount: number) => {
      try {
        if (!isConnected) {
          toast.error("Please connect your wallet to withdraw funds", {
            position: "top-right",
          });
          return;
        }
        if (chainId !== sepolia.id) {
          toast.error("Please switch to Sepolia Testnet", {
            position: "top-right",
          });
          return;
        }
        if (amount <= 0) {
          toast.error("Amount must be greater than 0", {
            position: "top-right",
          });
          return;
        }

        const contract_address =
          token === "usdc" ? usdc_contract_address : usdt_contract_address;

        const parsedAmount = parseUnits(amount.toFixed(6), 6); // USDC and USDT have 6 decimals

        writeContract({
          address: contract_address as `0x${string}`,
          abi: IERC20ABI,
          functionName: "transfer",
          args: [address as `0x${string}`, parsedAmount],
        });
      } catch (error: any) {
        toast.error(error.message, { position: "top-right" });
      }
    },
    [
      chainId,
      isConnected,
      usdc_contract_address,
      usdt_contract_address,
      writeContract,
      address,
    ]
  );

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const toastId = "withdraw-toast";

  useEffect(() => {
    if (isConfirming) {
      toast.loading("Processing...", {
        id: toastId,
        position: "top-right",
      });
    }

    if (isConfirmed) {
      toast.success("Withdraw successful", {
        id: toastId,
        position: "top-right",
      });
    }

    if (error) {
      toast.error((error as BaseError).shortMessage || error.message, {
        id: toastId,
        position: "top-right",
      });
    }
  }, [isConfirmed, error, isConfirming]);

  return {
    withdrawFunds,
  };
};

export default useWithdrawFunds;
