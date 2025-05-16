import { userManager } from "@/config/ManageUser";
import { DiamondABI } from "@/constants/ABIs/DiamondABI";
import {
  DIAMOND_ADDRESS,
  USDC_ON_SEPOLIA,
  USDT_ON_SEPOLIA,
} from "@/constants/Contracts";
import { publicClient } from "@/lib/utils";
import { useEffect, useState } from "react";
import { decodeEventLog, parseAbiItem } from "viem";
import { decodeBytes32String } from "ethers";
import { toast } from "sonner";

const useWatchContractEvents = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getPayrollEvents() {
    const userData = userManager.getUser();

    try {
      //   const currentBlock = await publicClient.getBlockNumber();
      if (!userData) return [];

      const data = await publicClient.readContract({
        address: DIAMOND_ADDRESS,
        abi: DiamondABI,
        functionName: "getUserHistory",
        args: [userData?.address],
      });

      console.log(data);

      //   const logs_ = await publicClient.getLogs({
      //     address: DIAMOND_ADDRESS,
      //     fromBlock: BigInt(Number(currentBlock) - 499),
      //     toBlock: "latest",
      //     event: parseAbiItem(
      //       "event NewPayroll(address indexed owner,bytes32 indexed title,uint256 indexed timestamp)"
      //     ),
      //     //   events: [
      //     //     parseAbiItem([
      //     //         "event Disburse(bool indexed success,address indexed owner,uint256 indexed timestamp,uint256 amount,bytes32 title)"

      //     //     ]
      //     //     ),

      //     // parseAbiItem(
      //     //   "event NewPayroll(address indexed owner,bytes32 indexed title,uint256 indexed timestamp)"
      //     // ),
      //     //   ],
      //     args: {
      //       owner: "0xfB8DF6Af048D0B2758d4e9797863A6B431a6deD2",
      //       // owner: userData?.address,
      //     },
      //   });
      //   let logs_construct = [];

      //   for (let i = 0; i < logs_.length; i++) {
      //     const log = logs_[i];
      //     const decoded = decodeEventLog({
      //       abi: [
      //         parseAbiItem(
      //           "event NewPayroll(address indexed owner,bytes32 indexed title,uint256 indexed timestamp)"
      //         ),
      //       ],
      //       data: log.data,
      //       topics: log.topics,
      //     });

      //     logs_construct.push({
      // title: "Payroll",
      // subtitle: decodeBytes32String((decoded.args as any)?.title),
      // timestamp: (decoded.args as any)?.timestamp,
      // success: (decoded.args as any)?.success,
      // amount: (decoded.args as any)?.amount,
      // token: (decoded.args as any)?.token,
      //     });
      //   }

      return ((data as any) ?? []).map((mp: any) => ({
        title: "Payroll",
        subtitle: decodeBytes32String(mp.title),
        timestamp: mp.timestamp,
        success: mp.success,
        amount: mp.amount,
        token: mp.token,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getTokenEvents() {
    try {
      const userData = userManager.getUser();

      const USDCFundEvents = publicClient.getLogs({
        address: USDC_ON_SEPOLIA,
        // fromBlock: BigInt(25801785),
        // toBlock: "latest",
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ),
        args: {
          to: userData?.address,
        },
      });

      const USDTFundEvents = publicClient.getLogs({
        address: USDT_ON_SEPOLIA,
        // fromBlock: BigInt(25801785),
        // toBlock: "latest",
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ),
        args: {
          to: userData?.address,
        },
      });

      const USDCWithdrawEvents = publicClient.getLogs({
        address: USDC_ON_SEPOLIA,
        // fromBlock: BigInt(25801785),
        // toBlock: "latest",
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ),
        args: {
          from: userData?.address,
        },
      });

      const USDTWithdrawEvents = publicClient.getLogs({
        address: USDT_ON_SEPOLIA,
        // fromBlock: BigInt(25801785),
        // toBlock: "latest",
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ),
        args: {
          from: userData?.address,
        },
      });

      const [
        USDT_FUND_LOGS,
        USDT_WITHDRAW_LOGS,
        USDC_FUND_LOGS,
        USDC_WITHDRAW_LOGS,
      ] = await Promise.all([
        USDTFundEvents,
        USDTWithdrawEvents,
        USDCFundEvents,
        USDCWithdrawEvents,
      ]);

      let logs_construct = [];

      for (let i = 0; i < USDC_FUND_LOGS.length; i++) {
        const log = USDC_FUND_LOGS[i];
        const decoded = decodeEventLog({
          abi: [
            parseAbiItem(
              "event Transfer(address indexed from, address indexed to, uint256 value)"
            ),
          ],
          data: log.data,
          topics: log.topics,
        });

        let construct = {
          title: "Fund",
          subtitle: "Fund",
          token: USDC_ON_SEPOLIA,
          success: true,
          amount: (decoded.args as any)?.value,
        };

        logs_construct.push(construct);
      }

      for (let i = 0; i < USDT_WITHDRAW_LOGS.length; i++) {
        const log = USDT_WITHDRAW_LOGS[i];
        const decoded = decodeEventLog({
          abi: [
            parseAbiItem(
              "event Transfer(address indexed from, address indexed to, uint256 value)"
            ),
          ],
          data: log.data,
          topics: log.topics,
        });

        let construct = {
          title: "Withdraw",
          subtitle: "Withdraw",
          token: USDT_ON_SEPOLIA,
          success: true,
          amount: (decoded.args as any)?.value,
        };

        logs_construct.push(construct);
      }

      for (let i = 0; i < USDT_FUND_LOGS.length; i++) {
        const log = USDT_FUND_LOGS[i];
        const decoded = decodeEventLog({
          abi: [
            parseAbiItem(
              "event Transfer(address indexed from, address indexed to, uint256 value)"
            ),
          ],
          data: log.data,
          topics: log.topics,
        });

        let construct = {
          title: "Fund",
          subtitle: "Fund",
          token: USDT_ON_SEPOLIA,
          success: true,
          amount: (decoded.args as any)?.value,
        };

        logs_construct.push(construct);
      }

      for (let i = 0; i < USDC_WITHDRAW_LOGS.length; i++) {
        const log = USDC_WITHDRAW_LOGS[i];
        const decoded = decodeEventLog({
          abi: [
            parseAbiItem(
              "event Transfer(address indexed from, address indexed to, uint256 value)"
            ),
          ],
          data: log.data,
          topics: log.topics,
        });

        let construct = {
          title: "Withdraw",
          subtitle: "Withdraw",
          token: USDC_ON_SEPOLIA,
          success: true,
          amount: (decoded.args as any)?.value,
        };

        logs_construct.push(construct);
      }

      return logs_construct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getLogs() {
    try {
      if (loading) return;
      if (isError) {
        setIsError(false);
      }
      setLoading(true);
      const [payrollEvents, tokenEvents] = await Promise.all([
        getPayrollEvents(),
        getTokenEvents(),
      ]);

      setLogs([...payrollEvents, ...tokenEvents]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
      toast.error("OOPPPSSS!! Something went wrong");
      console.log(error);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  return { logs, loading, isError, getLogs };
};

export default useWatchContractEvents;
