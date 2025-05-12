/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstanceWithToken from "@/config/AxiosInstance";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const usePayrollOperations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: any) => {
      const response = await axiosInstanceWithToken.post("payroll", req);
      return response.data;
    },
    onMutate: async (newPayroll) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: ["strimzPayrolls"] });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(["strimzPayrolls"]);

      // Optimistically update
      queryClient.setQueryData(["strimzPayrolls"], (old: any) => ({
        ...old,
        rows: [newPayroll, ...old.rows],
        count: old.count + 1,
      }));

      return { previousData };
    },
    onError: (err, newPayroll, context) => {
      // Rollback on error
      queryClient.setQueryData(["strimzPayrolls"], context?.previousData);
    },
    onSettled: () => {
      // Final invalidation
      queryClient.invalidateQueries({ queryKey: ["strimzPayrolls"] });
    },
  });
};

export default usePayrollOperations;
