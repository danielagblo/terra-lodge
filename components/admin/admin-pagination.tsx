"use client";

type AdminPaginationProps = {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel: string;
};

function range(start: number, end: number) {
  const items: number[] = [];
  for (let value = start; value <= end; value += 1) {
    items.push(value);
  }
  return items;
}

function buildPageItems(page: number, pageCount: number) {
  if (pageCount <= 7) {
    return range(1, pageCount);
  }

  const pages = new Set<number | "...">();
  pages.add(1);
  pages.add(pageCount);

  const left = Math.max(page - 1, 2);
  const right = Math.min(page + 1, pageCount - 1);

  if (left > 2) {
    pages.add("...");
  }

  for (let current = left; current <= right; current += 1) {
    pages.add(current);
  }

  if (right < pageCount - 1) {
    pages.add("...");
  }

  return Array.from(pages);
}

export function AdminPagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  itemLabel,
}: AdminPaginationProps) {
  if (pageCount <= 1 || total === 0) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const pageItems = buildPageItems(page, pageCount);

  return (
    <div className="flex flex-col gap-4 border-t border-surface-container px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-body-md text-[14px] text-on-surface-variant">
        Showing {start}-{end} of {total} {itemLabel}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className="border border-surface-container bg-white px-3 py-2 font-label-caps text-[12px] font-bold uppercase text-on-surface-variant transition-colors hover:bg-surface-bone disabled:cursor-not-allowed disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          type="button"
        >
          Prev
        </button>

        {pageItems.map((item, index) =>
          item === "..." ? (
            <span
              className="px-2 font-body-md text-[14px] text-outline-clay"
              key={`ellipsis-${index}`}
            >
              …
            </span>
          ) : (
            <button
              className={`min-w-10 border px-3 py-2 font-label-caps text-[12px] font-bold uppercase transition-colors ${
                item === page
                  ? "border-primary bg-primary text-white"
                  : "border-surface-container bg-white text-on-surface-variant hover:bg-surface-bone"
              }`}
              key={item}
              onClick={() => onPageChange(item)}
              type="button"
            >
              {item}
            </button>
          ),
        )}

        <button
          className="border border-surface-container bg-white px-3 py-2 font-label-caps text-[12px] font-bold uppercase text-on-surface-variant transition-colors hover:bg-surface-bone disabled:cursor-not-allowed disabled:opacity-50"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
