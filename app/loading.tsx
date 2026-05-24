import { RoomCardSkeleton } from "@/components/room-card-skeleton";

export default function Loading() {
  return (
    <main className="bg-surface-bone text-charred-wood">
      <section className="relative overflow-hidden px-6 pt-12 pb-20">
        <div className="mx-auto grid max-w-[1152px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="h-4 w-28 animate-pulse bg-surface-container" />
            <div className="h-16 w-full max-w-3xl animate-pulse bg-surface-container" />
            <div className="h-6 w-full max-w-2xl animate-pulse bg-surface-container" />
            <div className="flex gap-3 pt-4">
              <div className="h-12 w-40 animate-pulse bg-surface-container" />
              <div className="h-12 w-40 animate-pulse bg-surface-container" />
            </div>
          </div>

          <div className="overflow-hidden border border-surface-container bg-white">
            <div className="aspect-[4/3] animate-pulse bg-surface-bone" />
            <div className="space-y-4 p-6">
              <div className="h-6 w-2/3 animate-pulse bg-surface-container" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-11 animate-pulse bg-surface-container" />
                <div className="h-11 animate-pulse bg-surface-container" />
                <div className="h-11 animate-pulse bg-surface-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1152px] px-6 pb-20 md:px-section-padding">
        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[220px] animate-pulse border border-surface-container bg-white" />
          <div className="h-[220px] animate-pulse border border-surface-container bg-white" />
        </div>
      </section>
    </main>
  );
}
