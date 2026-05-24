import Link from "next/link";
import Icon from "@/components/icon";
import { siteContent } from "@/lib/site-content";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-surface-bone px-6 py-16 text-charred-wood">
      <section className="w-full max-w-2xl border border-surface-container bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="search_off" className="text-[32px]" />
        </div>
        <p className="font-label-caps text-xs font-bold uppercase tracking-[0.2em] text-laterite-red">
          404
        </p>
        <h1 className="mt-3 font-eczar text-[36px] font-bold text-charred-wood md:text-[48px]">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-body-md text-[15px] leading-relaxed text-on-surface-variant">
          The page you were looking for does not exist or has moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex items-center justify-center bg-primary px-6 py-4 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
            href="/"
          >
            Back Home
          </Link>
          <Link
            className="inline-flex items-center justify-center border-2 border-primary bg-white px-6 py-4 font-label-caps text-sm font-bold uppercase text-primary transition-colors hover:bg-surface-bone"
            href="/rooms"
          >
            Browse Rooms
          </Link>
        </div>

        <p className="mt-8 font-body-md text-xs text-outline-clay">
          {siteContent.brand.name}
        </p>
      </section>
    </main>
  );
}
