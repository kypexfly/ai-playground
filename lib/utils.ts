import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isCurrentPathOrChild(
  currentPath: string,
  targetPath: string,
): boolean {
  if (targetPath === currentPath) {
    return true;
  }

  if (currentPath.startsWith(targetPath + "/")) {
    return true;
  }

  return false;
}
