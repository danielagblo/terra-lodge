export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse bg-surface-container" />
        <div className="h-10 w-1/2 max-w-[420px] animate-pulse bg-surface-container" />
        <div className="h-5 w-full max-w-2xl animate-pulse bg-surface-container" />
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="border border-surface-container bg-white p-6"
            key={index}
          >
            <div className="h-12 w-12 animate-pulse bg-surface-bone" />
            <div className="mt-6 h-9 w-24 animate-pulse bg-surface-container" />
            <div className="mt-3 h-4 w-2/3 animate-pulse bg-surface-container" />
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="h-[280px] animate-pulse border border-surface-container bg-white" />
        <div className="h-[280px] animate-pulse border border-surface-container bg-white" />
      </section>

      <section className="h-[420px] animate-pulse border border-surface-container bg-white" />
    </div>
  );
}
