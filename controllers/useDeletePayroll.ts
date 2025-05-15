/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstanceWithToken from "@/config/AxiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

const useDeletePayroll = () => {
  const queryClient = useQueryClient();

  return useCallback(
    async (payrollId: string) => {
      try {
        const response = await axiosInstanceWithToken.delete(
          `payroll/${payrollId}`
        );

        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          console.log("data: ", response.data.data);

          // Invalidate the payroll query to trigger refetch
          queryClient.invalidateQueries({ queryKey: ["strimzPayrolls"] });
        }
      } catch (error: any) {
        console.error("Failed to create payroll:", error.response?.data);

        toast.error(error.response?.data?.message || "An error occurred", {
          position: "top-right",
        });
      }
    },
    [queryClient]
  );
};

export default useDeletePayroll;
