import type { Metadata } from "next";
import Image from "next/image";
import AvailabilitySearch from "@/components/availability-search";
import {
  AmenitiesSection,
  FeaturedRoomsSection,
  LocationSection,
  TestimonialsSection,
} from "@/components/home-sections";
import { getRooms } from "@/lib/room-data";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
  description: siteContent.brand.description,
};

export default async function Page() {
  const rooms = await getRooms();

  return (
    <main
      className="bg-surface-bone text-charred-wood selection:bg-dry-grass relative"
      id="home"
    >
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            alt={siteContent.home.hero.imageAlt}
            className="object-cover brightness-75"
            fill
            priority
            sizes="100vw"
            src={siteContent.home.hero.imageSrc}
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="inline-block bg-dry-grass/90 text-charred-wood px-4 py-1 font-label-caps text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            {siteContent.home.hero.badge}
          </span>
          <h1 className="font-eczar text-[48px] md:text-[80px] leading-tight text-white drop-shadow-lg font-bold">
            {siteContent.home.hero.title}
          </h1>
          <p className="font-body-lg text-white mt-6 max-w-2xl mx-auto drop-shadow-md font-medium">
            {siteContent.home.hero.description}
          </p>
        </div>

        <div className="relative z-20 mt-12 w-full max-w-6xl">
          <AvailabilitySearch submitLabel="Check Availability" />
        </div>
      </section>

      <AmenitiesSection amenities={siteContent.home.amenities} />
      <FeaturedRoomsSection rooms={rooms} />
      <TestimonialsSection testimonials={siteContent.home.testimonials} />
      <LocationSection />
    </main>
  );
}
