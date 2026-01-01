import { Skeleton } from "@/components/ui/glass/skeleton";

export function ExpenseTableSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-2">
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
      </div>
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <Skeleton className="w-32 h-10 bg-gray-700 rounded-md animate-pulse" />
  );
}
