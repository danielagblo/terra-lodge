import Link from "next/link";
import Icon from "@/components/icon";

export function AdminPlaceholderView({
  title,
  description,
  ctaHref = "/admin/dashboard",
  ctaLabel = "Back to Dashboard",
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-2xl border border-surface-container bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="construction" className="text-[28px]" />
        </div>
        <h1 className="font-eczar text-[36px] font-bold text-charred-wood">
          {title}
        </h1>
        <p className="mt-3 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
          {description}
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
          href={ctaHref}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
