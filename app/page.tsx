import type { Metadata } from "next";
import Image from "next/image";
import AvailabilitySearch from "@/components/availability-search";
import {
  AmenitiesSection,
  FeaturedRoomsSection,
  LocationSection,
  TestimonialsSection,
  type Amenity,
  type Testimonial,
} from "@/components/home-sections";

const amenities: Amenity[] = [
  {
    icon: "wifi",
    title: "Fast Wi-Fi",
    description: "Stay connected throughout the lodge.",
  },
  {
    icon: "local_parking",
    title: "Secure Parking",
    description: "24/7 security for your peace of mind.",
  },
  {
    icon: "restaurant",
    title: "Local Dining",
    description: "Authentic Ghanaian meals daily.",
  },
  {
    icon: "ac_unit",
    title: "Full A/C",
    description: "Climate controlled rooms for comfort.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "An absolute gem. The comfort level is top-notch and the staff treated me like family. Highly recommend for business travelers.",
    initials: "KM",
    name: "Kwame Mensah",
    location: "Accra, Ghana",
    rating: 5,
    accentClassName: "bg-baked-silt",
  },
  {
    quote:
      "The attention to detail in the rooms is impressive. It is clean, quiet, and perfectly located for easy access to the main road while staying peaceful.",
    initials: "AA",
    name: "Abena Appiah",
    location: "Kumasi, Ghana",
    rating: 4,
    accentClassName: "bg-primary-container",
  },
  {
    quote:
      "Great service and excellent local food. The internet was reliable for my remote meetings. Terra Lodge is now my go-to in Accra.",
    initials: "KB",
    name: "Kojo Boateng",
    location: "Cape Coast, Ghana",
    rating: 5,
    accentClassName: "bg-laterite-red",
  },
];

export const metadata: Metadata = {
  title: "Terra Lodge | Authentic Comfort",
  description:
    "Terra Lodge offers calm, comfortable accommodation in Accra with local hospitality and modern essentials.",
};

export default function Page() {
  return (
    <main
      className="bg-surface-bone text-charred-wood selection:bg-dry-grass relative"
      id="home"
    >
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12 pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            alt="A clean, sunlit bedroom in Terra Lodge"
            className="object-cover brightness-75"
            fill
            priority
            sizes="100vw"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlrmwjBV3wjEMNgLFGoZn8HZ-OKbxA5RVS6wH1nXZqH4vJ7zvWP0F4d_hd-V6SwqCQ81ZIVoMT2OUtTz3x_HXTIwiSlGsuqPiKX0dD83GTaDeFBvkWLBUGMZyUDoIC7ht9rHvfUigz3Oq7H2qICVQKXV-Re-7e-nTJlHQ-tcQWyGN0IpblXdifJrC0j1bkV03ocxo7Yc87d68936hE_gVsb00cYEfzXsAwM8uQx3bR0JgnxywA1F_wzsBRGFEJCNfWm7w0jf-Ki93"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="inline-block bg-dry-grass/90 text-charred-wood px-4 py-1 font-label-caps text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            Welcome
          </span>
          <h1 className="font-eczar text-[48px] md:text-[80px] leading-tight text-white drop-shadow-lg font-bold">
            Experience Authentic Comfort
          </h1>
          <p className="font-body-lg text-white mt-6 max-w-2xl mx-auto drop-shadow-md font-medium">
            Quality accommodation with traditional Ghanaian hospitality. Your
            serene home away from home.
          </p>
        </div>

        <div className="relative z-20 mt-12 w-full max-w-6xl">
          <AvailabilitySearch submitLabel="Check Availability" />
        </div>
      </section>

      <AmenitiesSection amenities={amenities} />
      <FeaturedRoomsSection />
      <TestimonialsSection testimonials={testimonials} />
      <LocationSection />
    </main>
  );
}
