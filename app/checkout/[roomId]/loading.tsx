export default function LoadingCheckout() {
  return (
    <main className="flex-1 bg-surface-bone text-charred-wood">
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-3 px-6 text-center md:px-section-padding">
          <div className="h-4 w-28 animate-pulse bg-surface-container" />
          <div className="h-14 w-full max-w-3xl animate-pulse bg-surface-container" />
          <div className="h-6 w-full max-w-2xl animate-pulse bg-surface-container" />
        </div>
      </section>

      <section className="mx-auto max-w-[1152px] px-6 py-20 md:px-section-padding">
        <div className="grid gap-12 lg:grid-cols-[1fr_450px]">
          <div className="space-y-8">
            <div className="overflow-hidden border border-surface-container bg-white">
              <div className="h-[220px] animate-pulse bg-surface-bone" />
              <div className="space-y-3 p-6">
                <div className="h-7 w-2/3 animate-pulse bg-surface-container" />
                <div className="h-4 w-full animate-pulse bg-surface-container" />
                <div className="h-4 w-5/6 animate-pulse bg-surface-container" />
              </div>
            </div>

            <div className="border border-surface-container bg-white p-8">
              <div className="h-4 w-28 animate-pulse bg-surface-container" />
              <div className="mt-6 space-y-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex items-center justify-between gap-4" key={index}>
                    <div className="space-y-2">
                      <div className="h-5 w-28 animate-pulse bg-surface-container" />
                      <div className="h-4 w-40 animate-pulse bg-surface-container" />
                    </div>
                    <div className="h-4 w-20 animate-pulse bg-surface-container" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-surface-container bg-white p-8">
              <div className="h-4 w-28 animate-pulse bg-surface-container" />
              <div className="mt-6 space-y-4">
                <div className="h-11 w-full animate-pulse bg-surface-container" />
                <div className="h-11 w-full animate-pulse bg-surface-container" />
                <div className="h-11 w-full animate-pulse bg-surface-container" />
                <div className="h-12 w-full animate-pulse bg-surface-container" />
              </div>
            </div>
            <div className="h-16 animate-pulse border border-surface-container bg-white" />
          </div>
        </div>
      </section>
    </main>
  );
}
