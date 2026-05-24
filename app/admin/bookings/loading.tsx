export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse bg-surface-container" />
        <div className="h-10 w-72 animate-pulse bg-surface-container" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-surface-container" />
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="border border-surface-container bg-white p-6" key={index}>
            <div className="h-10 w-20 animate-pulse bg-surface-container" />
            <div className="mt-3 h-4 w-2/3 animate-pulse bg-surface-container" />
          </div>
        ))}
      </section>

      <section className="border border-surface-container bg-white p-6">
        <div className="flex gap-3">
          <div className="h-12 flex-1 animate-pulse bg-surface-container" />
          <div className="h-12 w-36 animate-pulse bg-surface-container" />
          <div className="h-12 w-36 animate-pulse bg-surface-container" />
        </div>
      </section>

      <section className="border border-surface-container bg-white">
        <div className="overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_0.6fr_0.8fr_0.8fr_0.6fr] gap-4 border-b border-surface-container px-4 py-4"
              key={index}
            >
              {Array.from({ length: 9 }).map((__, cellIndex) => (
                <div className="h-4 animate-pulse bg-surface-container" key={cellIndex} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
