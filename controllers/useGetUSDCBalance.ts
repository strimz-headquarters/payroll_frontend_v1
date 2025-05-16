import { useEffect, useState } from "react";
import { useBlockNumber, useReadContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { USDC_ON_SEPOLIA } from "@/constants/Contracts";
import { IERC20ABI } from "@/constants/ABIs/IERC20ABI";
import { userManager } from "@/config/ManageUser";
import { formatUnits } from "viem";

/**
 * Custom hook to fetch and track the USDC balance of a user on the Sepolia network.
 *
 * This hook utilizes the `useReadContract` hook to call the `balanceOf` function
 * from the ERC20 contract deployed on Sepolia to retrieve the USDC balance of the
 * current user. It also listens for changes in the block number to invalidate
 * queries and update the balance accordingly.
 *
 * Returns:
 *   - A string representing the user's USDC balance formatted to two decimal places,
 *     or null if there's an error or the user is not logged in.
 *
 * Dependencies:
 *   - React hooks: useState, useEffect
 *   - Wagmi hooks: useBlockNumber, useReadContract
 *   - External constants: USDC_ON_SEPOLIA, IERC20ABI
 *   - User management: userManager
 *   - Utility functions: formatUnits
 */
const useGetUSDCBalance = () => {
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const contract_address = USDC_ON_SEPOLIA;

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
      setUsdcBalance(parseFloat(formatted).toFixed(2)); // Format as X.XX
    } else if (isError || !user_address) {
      setUsdcBalance(null);
    }
  }, [balance, status, isError, user_address]);

  return usdcBalance;
};

export default useGetUSDCBalance;
