function RoomCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden border border-surface-container bg-white shadow-sm">
      <div className="aspect-[4/3] animate-pulse bg-surface-bone" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="h-6 w-2/3 animate-pulse bg-surface-container" />
          <div className="h-5 w-20 animate-pulse bg-surface-container" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 animate-pulse bg-surface-container" />
          <div className="h-5 w-20 animate-pulse bg-surface-container" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse bg-surface-container" />
          <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
          <div className="h-4 w-2/3 animate-pulse bg-surface-container" />
        </div>
        <div className="mt-auto space-y-3 pt-2">
          <div className="h-11 w-full animate-pulse bg-surface-container" />
          <div className="h-11 w-full animate-pulse bg-surface-container" />
        </div>
      </div>
    </article>
  );
}

export default function LoadingRooms() {
  return (
    <main className="bg-surface-bone text-charred-wood">
      <section className="mx-auto max-w-[1152px] px-6 py-10 md:px-section-padding">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="hidden border border-surface-container bg-white p-6 lg:block">
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse bg-surface-container" />
              <div className="h-10 w-full animate-pulse bg-surface-container" />
              <div className="h-10 w-full animate-pulse bg-surface-container" />
              <div className="h-10 w-full animate-pulse bg-surface-container" />
              <div className="h-10 w-full animate-pulse bg-surface-container" />
              <div className="h-10 w-1/2 animate-pulse bg-surface-container" />
            </div>
          </aside>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-4 w-28 animate-pulse bg-surface-container" />
              <div className="h-12 w-3/4 animate-pulse bg-surface-container" />
              <div className="h-6 w-full max-w-3xl animate-pulse bg-surface-container" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <RoomCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
