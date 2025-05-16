import { userManager } from "@/config/ManageUser";
import { IERC20ABI } from "@/constants/ABIs/IERC20ABI";
import { USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";

/**
 * Custom hook to fetch and track the USDT balance of a user on the Sepolia network.
 *
 * This hook utilizes the `useReadContract` hook to call the `balanceOf` function
 * from the ERC20 contract deployed on Sepolia to retrieve the USDT balance of the
 * current user. It also listens for changes in the block number to invalidate
 * queries and update the balance accordingly.
 *
 * Returns:
 *   - A string representing the user's USDT balance formatted to two decimal places,
 *     or null if there's an error or the user is not logged in.
 *
 * Dependencies:
 *   - React hooks: useState, useEffect
 *   - Wagmi hooks: useBlockNumber, useReadContract
 *   - External constants: USDT_ON_SEPOLIA, IERC20ABI
 *   - User management: userManager
 *   - Utility functions: formatUnits
 */

const useGetUSDTBalance = () => {
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contract_address = USDT_ON_SEPOLIA;

  const user_address = userManager.getUser()?.address;

  const {
    data: balance,
    isError,
    queryKey,
    status,
  } = useReadContract({
    address: contract_address as `0x${string}`,
    abi: IERC20ABI,
    functionName: "balanceOf",
    args: [user_address as `0x${string}`],
    query: {
      enabled: !!user_address,
    },
  });

  useEffect(() => {
    if (user_address) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [blockNumber, queryClient, queryKey, user_address]);

  useEffect(() => {
    if (status === "success") {
      const rawBalance = balance as unknown as bigint;
      const formatted = formatUnits(rawBalance, 6); // USDC has 6 decimals
      setUsdtBalance(parseFloat(formatted).toFixed(2)); // Format as X.XX
    } else if (isError || !user_address) {
      setUsdtBalance(null);
    }
  }, [balance, status, isError, user_address]);

  return usdtBalance;
};

export default useGetUSDTBalance;
