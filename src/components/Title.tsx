import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Title({
  children,
  appearance = "default",
  size = "default",
}: {
  children: ReactNode;
  appearance?: "default" | "primary" | "secondary";
  size?: "default" | "sm" | "lg" | "xl";
}) {
  const classes = cn("my-4", {
    ["text-2xl"]: size === "xl",
    ["text-lg"]: size === "default",
    ["text-base"]: size === "sm",
    ["text-indigo-500"]: appearance === "primary",
    ["text-pink-600"]: appearance === "secondary",
  });

  return <h2 className={classes}>{children}</h2>;
}
