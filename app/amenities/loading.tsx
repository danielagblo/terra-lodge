export default function Loading() {
  return (
    <main className="bg-surface-bone px-6 py-20 md:px-section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="h-4 w-28 animate-pulse bg-surface-container" />
            <div className="h-16 w-full max-w-2xl animate-pulse bg-surface-container" />
            <div className="h-6 w-full max-w-xl animate-pulse bg-surface-container" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="h-24 animate-pulse rounded-2xl bg-white" key={index} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="overflow-hidden border border-surface-container bg-white" key={index}>
              <div className="h-16 animate-pulse bg-surface-bone" />
              <div className="space-y-3 p-5">
                <div className="h-10 w-10 animate-pulse bg-surface-container" />
                <div className="h-5 w-2/3 animate-pulse bg-surface-container" />
                <div className="h-4 w-full animate-pulse bg-surface-container" />
                <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden border border-surface-container bg-white">
          <div className="border-b border-surface-container px-5 py-4">
            <div className="h-4 w-32 animate-pulse bg-surface-container" />
          </div>
          <div className="divide-y divide-surface-container">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="grid grid-cols-[64px_1fr] gap-4 px-5 py-4" key={index}>
                <div className="h-12 w-12 animate-pulse bg-surface-container" />
                <div className="space-y-3">
                  <div className="h-5 w-1/3 animate-pulse bg-surface-container" />
                  <div className="h-4 w-full animate-pulse bg-surface-container" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
