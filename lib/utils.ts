import { USDC_ON_SEPOLIA, USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A shorthand for `twMerge(clsx(...inputs))` to generate a className string
 * from multiple class value inputs.
 *
 * @param inputs - A variadic number of class values to merge into a single
 *   className string.
 * @returns A className string.
 *
 * @example
 * cn("text-red-500", "hover:text-blue-700") // => "text-red-500 hover:text-blue-700"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// import { baseSepolia } from "wagmi/chains";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: {
    ...baseSepolia,
    rpcUrls: {
      default: {
        http: [
          "https://base-sepolia.g.alchemy.com/v2/fBIUxxQd5jw0FD4kAAbpuOEq4eYeyQvW",
        ],
        webSocket: [
          "wss://base-sepolia.g.alchemy.com/v2/fBIUxxQd5jw0FD4kAAbpuOEq4eYeyQvW",
        ],
      },
    },
  },
  transport: http(
    "https://base-sepolia.g.alchemy.com/v2/fBIUxxQd5jw0FD4kAAbpuOEq4eYeyQvW"
  ),
});

export function formatDate(timestampInSeconds: number): string {
  const date = new Date(timestampInSeconds * 1000); // convert to milliseconds

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // e.g., "March"
  const year = date.getFullYear().toString().slice(-2); // last two digits
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${day}${suffix} ${month}, ${year} at ${hour12}:${minutes}${ampm}`;
}

export function getTokenName(address: string): "USDC" | "USDT" {
  let tokenName: "USDC" | "USDT";
  switch (address) {
    case USDC_ON_SEPOLIA:
      tokenName = "USDC";
      break;

    case USDT_ON_SEPOLIA:
      tokenName = "USDT";
      break;

    default:
      tokenName = "USDC";
      break;
  }

  return tokenName;
}
