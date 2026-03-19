import { Skeleton } from "@/components/ui/skeleton";

export default function MoodCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1C1C2A] rounded-[24px] p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
      {/* Avatar Circle */}
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />

      {/* Middle Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-2.5 translate-y-px">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-[40%] rounded-full" />
          <Skeleton className="h-2.5 w-[15%] rounded-full" />
        </div>
        <Skeleton className="h-2.5 w-[75%] rounded-full opacity-60" />
      </div>

      {/* Reaction Circle */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
        <Skeleton className="w-[28px] h-[28px] rounded-full" />
      </div>
    </div>
  );
}
