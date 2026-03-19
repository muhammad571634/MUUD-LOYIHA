import React from "react";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-[#2A2A38] ${className || ""}`}
      {...props}
    />
  );
}
