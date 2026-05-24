export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse bg-surface-container" />
        <div className="h-10 w-72 animate-pulse bg-surface-container" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-surface-container" />
      </div>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="border border-surface-container bg-white p-6" key={index}>
            <div className="h-12 w-12 animate-pulse bg-surface-bone" />
            <div className="mt-6 h-8 w-24 animate-pulse bg-surface-container" />
            <div className="mt-3 h-4 w-2/3 animate-pulse bg-surface-container" />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-[280px] animate-pulse border border-surface-container bg-white" />
        <div className="h-[280px] animate-pulse border border-surface-container bg-white" />
      </section>

      <section className="border border-surface-container bg-white p-6">
        <div className="h-12 w-full animate-pulse bg-surface-container" />
      </section>

      <section className="border border-surface-container bg-white">
        <div className="overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="grid grid-cols-[1.1fr_1fr_1fr_1fr_0.8fr_0.8fr_0.8fr_0.4fr] gap-4 border-b border-surface-container px-4 py-4"
              key={index}
            >
              {Array.from({ length: 8 }).map((__, cellIndex) => (
                <div className="h-4 animate-pulse bg-surface-container" key={cellIndex} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
