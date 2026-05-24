export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse bg-surface-container" />
        <div className="h-10 w-80 animate-pulse bg-surface-container" />
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
        <div className="h-12 w-full animate-pulse bg-surface-container" />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="border border-surface-container bg-white" key={index}>
            <div className="h-44 animate-pulse bg-surface-bone" />
            <div className="space-y-3 p-6">
              <div className="h-6 w-2/3 animate-pulse bg-surface-container" />
              <div className="h-4 w-full animate-pulse bg-surface-container" />
              <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 animate-pulse bg-surface-container" />
                <div className="h-10 animate-pulse bg-surface-container" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
