/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstanceWithToken from "@/config/AxiosInstance";
import { USDC_ON_SEPOLIA, USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { useCallback } from "react";
import { toast } from "sonner";

const useWithdrawFunds = () => {
  const withdrawFunds = useCallback(
    async (
      password: string,
      token: string,
      amount: number,
      recipient: string
    ) => {
      try {
        const tokenType = token === "usdc" ? USDC_ON_SEPOLIA : USDT_ON_SEPOLIA;

        const reqObj = {
          password,
          amount: String(amount),
          receipient: recipient,
          token: tokenType,
        };

        const formattedReq = JSON.stringify(reqObj);

        console.log("formattedReq: ", formattedReq);

        const response = await axiosInstanceWithToken.post(
          `users/withdraw`,
          formattedReq
        );

        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          console.log("data: ", response.data.data);
        }
      } catch (error: any) {
        console.error("Failed to withdraw:", error.response?.data);

        toast.error(error.response?.data?.message || "An error occurred", {
          position: "top-right",
        });
      }
    },
    []
  );

  return {
    withdrawFunds,
  };
};

export default useWithdrawFunds;
