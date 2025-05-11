import { userManager } from "@/config/ManageUser";
import { IERC20ABI } from "@/constants/ABIs/IERC20ABI";
import { USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";

const useGetUSDTBalance = () => {
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const constract_address = USDT_ON_SEPOLIA;

  const user_address = userManager.getUser()?.address;

  const {
    data: balance,
    isError,
    queryKey,
    status,
  } = useReadContract({
    address: constract_address as `0x${string}`,
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
