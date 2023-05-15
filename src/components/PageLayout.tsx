import { cn } from "@/lib/utils";

export function PageLayout({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const classes = cn("container mx-auto space-y-4 my-4", className);

  return <div className={classes}>{children}</div>;
}
