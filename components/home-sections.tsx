import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/icon";
import AvailabilitySearch from "@/components/availability-search";
import RoomCard from "@/components/room-card";
import { roomInventory } from "@/lib/rooms";

export type Amenity = {
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  location: string;
  rating: number;
  accentClassName: string;
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
        {eyebrow}
      </span>
      <h2 className="font-headline-md text-charred-wood font-bold mt-2">
        {title}
      </h2>
      {description ? (
        <p className="font-body-md text-on-surface-variant mt-4 leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function AmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <div className="flex items-start gap-4">
      <Icon name={amenity.icon} className="text-primary bg-primary-fixed p-2" />
      <div>
        <h4 className="font-bold text-charred-wood">{amenity.title}</h4>
        <p className="text-sm text-on-surface-variant">{amenity.description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="bg-surface-container-low p-8 border border-surface-container shadow-sm hover:shadow-md transition-all">
      <div
        className="flex gap-1 text-dry-grass mb-4"
        aria-label={`${testimonial.rating} star rating`}
      >
        {Array.from({ length: 5 }).map((_, index) =>
          index < testimonial.rating ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5 fill-current"
              key={index}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.95 6.63 7.2.62-5.46 4.72 1.63 7.03L12 17.39 5.68 21l1.63-7.03L1.85 9.25l7.2-.62L12 2z" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              key={index}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l2.95 6.63 7.2.62-5.46 4.72 1.63 7.03L12 17.39 5.68 21l1.63-7.03L1.85 9.25l7.2-.62L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ),
        )}
      </div>
      <p className="font-body-md italic text-on-surface-variant mb-6">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 ${testimonial.accentClassName} rounded-full flex items-center justify-center text-white font-bold`}
        >
          {testimonial.initials}
        </div>
        <div>
          <h4 className="font-bold text-charred-wood text-sm">
            {testimonial.name}
          </h4>
          <p className="text-xs text-outline-clay">{testimonial.location}</p>
        </div>
      </div>
    </blockquote>
  );
}

export function AmenitiesSection({ amenities }: { amenities: Amenity[] }) {
  return (
    <section
      className="px-6 md:px-section-padding py-section-padding bg-white"
      id="amenities"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="flex flex-col gap-6">
            <span className="font-label-caps text-xs font-bold text-laterite-red tracking-widest uppercase">
              Our Service
            </span>
            <h2 className="font-headline-md text-charred-wood font-bold">
              Why Stay With Us?
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              At Terra Lodge, we prioritize your peace and comfort. Our lodge is
              built to offer a blend of traditional aesthetics and modern
              functionality.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {amenities.map((amenity) => (
                <AmenityCard amenity={amenity} key={amenity.title} />
              ))}
            </div>
            <div className="pt-6">
              <Link
                className="border-2 border-charred-wood px-8 py-3 font-bold text-sm font-label-caps uppercase hover:bg-charred-wood hover:text-white transition-all inline-flex"
                href="/about"
              >
                View All Amenities
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3]">
            <Image
              alt="Terra Lodge exterior with clean pathways"
              className="object-cover shadow-lg"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6QyRAJzExUYQqgcJW1sw5TJ-0B1_O_kknMgaFEHU2yzhxcXHx9hqtQDtGe3VO5HI3aTSHohNa_iQMsRNLa7SrFyx7kBscWv6ye9J91ZYWZvIb4lYV9TpmLILLHLafTCV7Ko_4rUClM-VTiQv7M2neLHW1znTdkM6nhP0Rw5GWqPNtLTMRSEjg-GNbGoNz8gZQrixSaML9fzeVoMwjbUrWZDXMLekhMPHUcuDfTXhG_EwCUTLhQTqTLNMuRao-ojqZBatTi9PHynm6"
            />
            <div className="absolute -bottom-6 -left-6 bg-baked-silt p-6 border-l-4 border-primary shadow-lg hidden lg:block">
              <p className="font-bold text-charred-wood">
                Experience Accra&apos;s Finest
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedRoomsSection() {
  return (
    <section
      className="px-6 md:px-section-padding py-section-padding bg-surface-container-low border-y border-surface-container"
      id="rooms"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Available Lodgings"
          title="Functional Sanctuaries"
          description="Comfortable, clean, and well-equipped rooms designed for a restful stay in the heart of the city."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {roomInventory.slice(0, 6).map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
      </div>
      <div className="mt-12 flex justify-center max-w-6xl mx-auto">
        <Link
          className="inline-flex items-center justify-center border-2 border-primary px-6 py-3 font-label-caps text-xs font-bold uppercase text-primary transition-all hover:bg-primary hover:text-white"
          href="/rooms"
        >
          View More
        </Link>
      </div>
    </section>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="px-6 md:px-section-padding py-section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
            Guest Experiences
          </span>
          <h2 className="font-headline-md text-charred-wood font-bold mt-2">
            What Our Visitors Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section
      className="px-6 md:px-section-padding py-section-padding bg-surface-container-low border-t border-surface-container"
      id="location"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
                Our Location
              </span>
              <h2 className="font-headline-md text-charred-wood font-bold mt-2">
                Find Us
              </h2>
              <div className="flex items-start gap-3 mt-4 text-on-surface-variant">
                <Icon name="location_on" className="text-primary mt-1" />
                <p className="font-body-lg font-medium">
                  X9 Coffee Highway, Adenta, Accra, Ghana
                </p>
              </div>
            </div>
            <div className="bg-white p-6 shadow-lg border border-surface-container">
              <h3 className="font-headline-sm text-xl font-bold mb-6">
                Reserve Your Stay
              </h3>
              <AvailabilitySearch compact submitLabel="Check Availability" />
            </div>
          </div>
          <div className="w-full h-[450px] relative bg-surface-container overflow-hidden shadow-xl border border-white">
            <iframe
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7729547445757!2d-0.1607389!3d5.6064541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMjMuMiJOIDDCsDA5JzM4LjciVw!5e0!3m2!1sen!2sgh!4v1234567890"
              title="Terra Lodge Location Map"
            />
            <div className="absolute inset-0 bg-charred-wood/10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
