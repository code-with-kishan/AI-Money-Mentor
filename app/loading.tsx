import { Skeleton } from "@/components/Skeleton";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="glass rounded-2xl px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-6 w-44" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl px-7 py-10">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-4 h-14 w-3/4" />
          <Skeleton className="mt-3 h-5 w-2/3" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
