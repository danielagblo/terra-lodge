import Link from "next/link";
import Icon from "@/components/icon";
import RoomImage from "@/components/room-image";
import type { Room } from "@/lib/rooms";

export default function RoomCard({
  room,
  className = "",
}: {
  room: Room;
  className?: string;
}) {
  return (
    <article
      className={`bg-white border border-surface-container shadow-sm hover:shadow-md transition-shadow group flex flex-col ${className}`.trim()}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <RoomImage
          alt={room.alt}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={room.image}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-headline-sm font-bold text-xl">{room.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">
            GHS {room.priceValue}/night
          </span>
        </div>
        <div className="flex flex-wrap gap-4 text-outline-clay text-sm font-body-md">
          {room.features.slice(0, 2).map((feature) => (
            <span className="flex items-center gap-1" key={feature.label}>
              <Icon name={feature.icon} className="text-sm" />
              {feature.label}
            </span>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant font-body-md">
          {room.description}
        </p>
        <Link
          className="mt-auto w-full border-2 border-primary text-primary font-bold py-3 text-xs uppercase hover:bg-primary hover:text-white transition-all text-center"
          href={`/room/${room.id}`}
        >
          View Details
        </Link>
        <Link
          className="w-full bg-primary text-white font-bold py-3 text-xs uppercase hover:bg-laterite-red transition-all text-center"
          href={`/checkout/${room.id}`}
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
