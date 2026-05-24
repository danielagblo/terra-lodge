export default function LoadingRoomDetail() {
  return (
    <main className="bg-[#fafaf9] text-charred-wood">
      <section className="mx-auto max-w-[1152px] px-6 pt-8 md:px-section-padding">
        <div className="h-5 w-32 animate-pulse bg-surface-container" />
      </section>

      <section className="mx-auto max-w-[1152px] px-6 py-8 md:px-section-padding">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-12 w-3/4 animate-pulse bg-surface-container" />
              <div className="h-5 w-full max-w-xl animate-pulse bg-surface-container" />
              <div className="h-5 w-2/3 animate-pulse bg-surface-container" />
            </div>
            <div className="h-[400px] animate-pulse bg-surface-bone" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="h-[120px] animate-pulse bg-surface-container" key={index} />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-4 w-28 animate-pulse bg-surface-container" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse bg-surface-container" />
                <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
                <div className="h-4 w-2/3 animate-pulse bg-surface-container" />
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="border border-surface-container bg-white p-6">
              <div className="h-4 w-28 animate-pulse bg-surface-container" />
              <div className="mt-6 space-y-4">
                <div className="h-10 w-full animate-pulse bg-surface-container" />
                <div className="h-10 w-full animate-pulse bg-surface-container" />
                <div className="h-10 w-full animate-pulse bg-surface-container" />
                <div className="h-10 w-full animate-pulse bg-surface-container" />
                <div className="h-10 w-full animate-pulse bg-surface-container" />
                <div className="h-12 w-full animate-pulse bg-surface-container" />
              </div>
            </div>
            <div className="h-20 animate-pulse border border-surface-container bg-white" />
          </aside>
        </div>
      </section>
    </main>
  );
}
