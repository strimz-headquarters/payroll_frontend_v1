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
