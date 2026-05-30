import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import AvailabilitySearch from "@/components/availability-search";
import {
  AmenitiesSection,
  FeaturedRoomsSection,
  LocationSection,
} from "@/components/home-sections";
import TestimonialsSection from "@/components/testimonials-section";
import { getAmenities } from "@/lib/amenities";
import { getPriceConversion } from "@/lib/currency";
import { getRooms } from "@/lib/room-data";
import { getSiteSettings } from "@/lib/site-settings";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
  description: siteContent.brand.description,
};

export default async function Page() {
  const acceptLanguage = (await headers()).get("accept-language");
  const [rooms, amenities, priceConversion, siteSettings] = await Promise.all([
    getRooms(),
    getAmenities(),
    getPriceConversion(acceptLanguage),
    getSiteSettings(),
  ]);
  const heroSettings = siteSettings.heroSettings;

  return (
    <main
      className="bg-surface-bone text-charred-wood selection:bg-dry-grass relative"
      id="home"
    >
      <section className="relative isolate min-h-[68vh] md:min-h-[86vh] flex items-end overflow-hidden px-6 pb-12 pt-10 md:px-section-padding md:pb-20 md:pt-14">
        <div className="absolute inset-0 z-0">
          <Image
            alt={heroSettings.imageAlt}
            className="object-cover object-[62%_50%] brightness-[0.72] scale-105"
            fill
            priority
            sizes="100vw"
            src={heroSettings.imageSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(32,15,8,0.92)_0%,rgba(32,15,8,0.86)_36%,rgba(32,15,8,0.56)_60%,rgba(108,47,0,0.2)_84%,rgba(108,47,0,0.08)_100%)] mix-blend-multiply" />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden w-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_100%)] lg:block"
            style={{
              clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="max-w-2xl text-left pb-2 md:pb-8 lg:pt-8">
              <span className="inline-block bg-dry-grass/90 text-charred-wood px-4 py-1 font-label-caps text-[10px] font-bold uppercase tracking-widest mb-5 shadow-sm">
                {heroSettings.badge}
              </span>
              <h1 className="font-eczar text-[42px] leading-[1.02] text-white drop-shadow-lg font-bold sm:text-[56px] lg:text-[82px]">
                {heroSettings.title}
              </h1>
              <p className="font-body-lg text-white/95 mt-5 max-w-xl leading-relaxed drop-shadow-md font-medium">
                {heroSettings.description}
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              {heroSettings.showAvailabilityWidget ? (
                <div className="relative z-20 w-full max-w-2xl">
                  <AvailabilitySearch submitLabel="Check Availability" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <AmenitiesSection amenities={amenities} />
      <FeaturedRoomsSection priceConversion={priceConversion} rooms={rooms} />
      <TestimonialsSection testimonials={siteContent.home.testimonials} />
      <LocationSection />
    </main>
  );
}
