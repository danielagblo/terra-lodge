import Image from "next/image";
import Icon from "@/components/icon";
import type { AmenityRecord } from "@/lib/amenities";
import { siteContent } from "@/lib/site-content";

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-left text-white backdrop-blur">
      <div className="font-nimbus text-[28px] font-bold">{value}</div>
      <div className="font-label-caps text-[11px] font-bold uppercase tracking-widest text-white/80">
        {label}
      </div>
    </div>
  );
}

function AmenityCardView({ amenity }: { amenity: AmenityRecord }) {
  return (
    <article className="group h-full border border-surface-container bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center bg-primary-fixed text-primary">
        <Icon name={amenity.icon} className="text-[28px]" />
      </div>
      <h3 className="font-eczar text-[22px] font-bold text-charred-wood">{amenity.title}</h3>
      <p className="mt-3 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
        {amenity.description}
      </p>
    </article>
  );
}

export function AmenitiesPage({ amenities }: { amenities: readonly AmenityRecord[] }) {
  return (
    <main className="bg-surface-bone text-charred-wood">
      <section className="relative overflow-hidden px-6 py-20 md:px-section-padding">
        <div className="absolute inset-0">
          <Image
            alt={siteContent.home.sections.amenities.imageAlt}
            className="object-cover brightness-[0.55]"
            fill
            priority
            sizes="100vw"
            src={siteContent.home.sections.amenities.imageSrc}
          />
          <div className="absolute inset-0 bg-[#3d2214]/65" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-dry-grass">
              {siteContent.home.sections.amenities.eyebrow}
            </span>
            <h1 className="mt-3 font-eczar text-[44px] font-bold leading-tight text-white md:text-[72px]">
              {siteContent.home.sections.amenities.title}
            </h1>
            <p className="mt-5 max-w-2xl font-body-lg text-[16px] leading-relaxed text-white/85 md:text-[18px]">
              {siteContent.home.sections.amenities.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HeroStat label="Amenities" value={String(amenities.length)} />
            <HeroStat
              label="Featured"
              value={String(amenities.filter((item) => item.featured).length)}
            />
            <HeroStat label="Active" value={String(amenities.length)} />
            <HeroStat label="Open 24/7" value="Yes" />
          </div>
        </div>
      </section>

      <section className="px-6 py-section-padding md:px-section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-laterite-red">
                Featured Services
              </span>
              <h2 className="mt-2 font-eczar text-[32px] font-bold text-charred-wood md:text-[44px]">
                Everything you can expect at Terra Lodge
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {amenities.map((amenity) => (
              <AmenityCardView amenity={amenity} key={amenity.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-surface-container bg-white px-6 py-section-padding md:px-section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-laterite-red">
              Full List
            </span>
            <h2 className="mt-2 font-eczar text-[30px] font-bold text-charred-wood md:text-[40px]">
              Amenities table
            </h2>
          </div>

          <div className="overflow-hidden border border-surface-container">
            <table className="min-w-full divide-y divide-surface-container">
              <thead className="bg-surface-bone">
                <tr>
                  <th className="px-5 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                    Icon
                  </th>
                  <th className="px-5 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                    Title
                  </th>
                  <th className="px-5 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container bg-white">
                {amenities.map((amenity) => (
                  <tr key={amenity.id}>
                    <td className="px-5 py-4">
                      <div className="inline-flex h-10 w-10 items-center justify-center bg-primary-fixed text-primary">
                        <Icon name={amenity.icon} className="text-[22px]" />
                      </div>
                    </td>
                    <td className="px-5 py-4 font-body-md text-[15px] font-semibold text-charred-wood">
                      {amenity.title}
                    </td>
                    <td className="px-5 py-4 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                      {amenity.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
