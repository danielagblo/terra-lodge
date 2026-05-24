export function RoomCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden border border-surface-container bg-white shadow-sm">
      <div className="aspect-[4/3] animate-pulse bg-surface-bone" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="h-6 w-2/3 animate-pulse bg-surface-container" />
          <div className="h-5 w-24 animate-pulse bg-surface-container" />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-4 w-20 animate-pulse bg-surface-container" />
          <div className="h-4 w-16 animate-pulse bg-surface-container" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse bg-surface-container" />
          <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
          <div className="h-4 w-2/3 animate-pulse bg-surface-container" />
        </div>
        <div className="mt-auto h-11 w-full animate-pulse bg-surface-container" />
        <div className="h-11 w-full animate-pulse bg-surface-container" />
      </div>
    </article>
  );
}
