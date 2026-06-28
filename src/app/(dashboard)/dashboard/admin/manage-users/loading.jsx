import { Skeleton } from "@heroui/react";

export default function TableSkeleton() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8">
      
      <div className="w-full max-w-7xl space-y-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 w-full">
           
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}