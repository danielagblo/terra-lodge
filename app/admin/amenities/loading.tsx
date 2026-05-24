export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-28 animate-pulse bg-white border border-surface-container" />
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="h-28 animate-pulse bg-white border border-surface-container" key={index} />
        ))}
      </div>
      <div className="h-[520px] animate-pulse bg-white border border-surface-container" />
    </div>
  );
}
