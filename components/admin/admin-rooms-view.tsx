"use client";

import { useMemo, useState, type ReactNode } from "react";
import Icon from "@/components/icon";
import type { AdminRoomRecord } from "@/lib/admin-data";

type RoomStatus = "Available" | "Maintenance";
type CurrentOccupancy = "Vacant" | "Occupied" | "Under Maintenance";

type RoomRecord = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  status: RoomStatus;
  amenities: string[];
  description: string;
  totalBookings: number;
  currentOccupancy: CurrentOccupancy;
};

const mockRooms: RoomRecord[] = [
  {
    id: "1",
    name: "The Silt Suite",
    type: "Suite",
    capacity: 2,
    pricePerNight: 650,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "Mini Bar", "Balcony"],
    description: "Elegant suite with panoramic views of the surrounding landscape",
    totalBookings: 45,
    currentOccupancy: "Vacant",
  },
  {
    id: "2",
    name: "Basalt Retreat",
    type: "Standard",
    capacity: 2,
    pricePerNight: 500,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "Work Desk"],
    description: "Cozy room with mountain views and modern amenities",
    totalBookings: 38,
    currentOccupancy: "Occupied",
  },
  {
    id: "3",
    name: "Lodge Suite",
    type: "Family Suite",
    capacity: 4,
    pricePerNight: 800,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "Kitchenette", "Living Area"],
    description: "Spacious family accommodation with separate living area",
    totalBookings: 32,
    currentOccupancy: "Vacant",
  },
  {
    id: "4",
    name: "Premium Suite",
    type: "Premium",
    capacity: 2,
    pricePerNight: 1200,
    status: "Maintenance",
    amenities: ["Wi-Fi", "Air Conditioning", "Jacuzzi", "Private Garden"],
    description: "Luxurious suite with premium amenities and private access",
    totalBookings: 28,
    currentOccupancy: "Under Maintenance",
  },
  {
    id: "5",
    name: "Garden View",
    type: "Standard",
    capacity: 2,
    pricePerNight: 550,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "Garden View"],
    description: "Comfortable room overlooking the garden areas",
    totalBookings: 42,
    currentOccupancy: "Occupied",
  },
  {
    id: "6",
    name: "Executive Suite",
    type: "Executive",
    capacity: 3,
    pricePerNight: 950,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "Office Space", "Mini Bar"],
    description: "Perfect for business travelers with dedicated workspace",
    totalBookings: 25,
    currentOccupancy: "Vacant",
  },
];

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-laterite-red">
          Admin Management
        </span>
        <h1 className="mt-2 font-eczar text-[36px] font-bold text-charred-wood">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl font-body-md text-[14px] leading-relaxed text-on-surface-variant">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}

function MetricCard({
  value,
  label,
  accentClassName,
}: {
  value: ReactNode;
  label: string;
  accentClassName?: string;
}) {
  return (
    <div className="border border-surface-container bg-white p-6">
      <div
        className={`mb-1 font-nimbus text-[32px] font-bold ${accentClassName ?? "text-charred-wood"}`}
      >
        {value}
      </div>
      <p className="font-body-md text-[14px] text-outline-clay">{label}</p>
    </div>
  );
}

function badgeClass(status: RoomStatus) {
  switch (status.toLowerCase()) {
    case "available":
      return "bg-green-100 text-green-800";
    case "maintenance":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-surface-container text-outline-clay";
  }
}

function RoomModal({
  room,
  onClose,
}: {
  room: RoomRecord;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white">
        <div className="bg-primary p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-eczar text-[28px] font-bold">{room.name}</h2>
              <p className="mt-1 font-body-md text-sm">{room.type}</p>
            </div>
            <button
              aria-label="Close room details"
              className="text-white transition-colors hover:text-dry-grass"
              onClick={onClose}
              type="button"
            >
              <Icon name="close" className="text-[28px]" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section>
            <h3 className="mb-4 font-eczar text-[20px] font-bold text-charred-wood">
              Description
            </h3>
            <p className="font-body-md text-[14px] leading-relaxed text-on-surface-variant">
              {room.description}
            </p>
          </section>

          <section className="border-y border-surface-container py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Capacity" value={`${room.capacity} Guests`} />
              <Detail label="Price Per Night" value={`GH₵ ${room.pricePerNight}`} />
              <Detail label="Status" value={room.status} />
              <Detail label="Current Occupancy" value={room.currentOccupancy} />
            </div>
          </section>

          <section>
            <h3 className="mb-4 font-eczar text-[20px] font-bold text-charred-wood">
              Amenities
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {room.amenities.map((amenity) => (
                <div
                  className="flex items-center gap-2 font-body-md text-[14px] text-charred-wood"
                  key={amenity}
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-surface-container pt-6">
            <p className="mb-1 font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
              Total Bookings
            </p>
            <div className="font-nimbus text-[32px] font-bold text-charred-wood">
              {room.totalBookings}
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-surface-container pt-6 sm:flex-row">
            <button
              className="flex-1 bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
              type="button"
            >
              Edit Room
            </button>
            <button
              className="flex-1 border-2 border-primary bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-primary transition-colors hover:bg-surface-bone"
              type="button"
            >
              View Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-1 font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
        {label}
      </p>
      <p className="font-body-md text-[14px] text-charred-wood">{value}</p>
    </div>
  );
}

type AdminRoomsViewProps = {
  rooms?: AdminRoomRecord[];
};

export function AdminRoomsView({
  rooms: roomsProp = mockRooms,
}: AdminRoomsViewProps = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<RoomRecord | null>(null);
  const rooms = roomsProp;

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const query = searchTerm.toLowerCase();
      return (
        room.name.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query)
      );
    });
  }, [rooms, searchTerm]);

  return (
    <div>
      <PageHeader
        action={
          <button className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red">
            <Icon name="add" className="text-[18px]" />
            <span>Add New Room</span>
          </button>
        }
        description="Manage room inventory, pricing, and availability from one place."
        title="Rooms Management"
      />

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <MetricCard label="Total Rooms" value={rooms.length} />
        <MetricCard
          accentClassName="text-green-700"
          label="Available Rooms"
          value={rooms.filter((room) => room.currentOccupancy === "Vacant").length}
        />
        <MetricCard
          accentClassName="text-blue-700"
          label="Occupied Rooms"
          value={rooms.filter((room) => room.currentOccupancy === "Occupied").length}
        />
        <MetricCard
          accentClassName="text-amber-700"
          label="Under Maintenance"
          value={rooms.filter((room) => room.status === "Maintenance").length}
        />
      </section>

      <section className="mb-6 border border-surface-container bg-white p-6">
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline-clay"
          />
          <input
            className="w-full border border-surface-container bg-white py-3 pl-11 pr-4 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search rooms by name or type..."
            value={searchTerm}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredRooms.map((room) => (
          <article
            className="overflow-hidden border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
            key={room.id}
          >
            <div className="bg-surface-bone p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center bg-primary-fixed text-primary">
                    <Icon name="bed" className="text-[24px]" />
                  </div>
                  <div>
                    <h2 className="font-eczar text-[20px] font-bold text-charred-wood">
                      {room.name}
                    </h2>
                    <p className="font-body-md text-[12px] text-outline-clay">
                      {room.type}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-bold ${badgeClass(room.status)}`}
                >
                  {room.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <p className="font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                {room.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Detail label="Capacity" value={`${room.capacity} Guests`} />
                <Detail label="Price/Night" value={`GH₵ ${room.pricePerNight}`} />
              </div>

              <div>
                <p className="mb-2 font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      className="rounded-sm bg-surface-bone px-2 py-1 font-body-md text-[12px] text-on-surface-variant"
                      key={amenity}
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 ? (
                    <span className="rounded-sm bg-surface-bone px-2 py-1 font-body-md text-[12px] text-outline-clay">
                      +{room.amenities.length - 3} more
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Detail label="Current" value={room.currentOccupancy} />
                <Detail label="Bookings" value={String(room.totalBookings)} />
              </div>

              <div className="flex gap-2 border-t border-surface-container pt-4">
                <button
                  className="flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-3 font-label-caps text-xs font-bold uppercase text-white transition-colors hover:bg-laterite-red"
                  onClick={() => setSelectedRoom(room)}
                  type="button"
                >
                  <Icon name="visibility" className="text-[18px]" />
                  View
                </button>
                <button
                  className="border border-surface-container bg-white px-4 py-3 text-primary transition-colors hover:bg-surface-bone"
                  type="button"
                >
                  <Icon name="edit" className="text-[18px]" />
                </button>
                <button
                  className="border border-red-300 bg-white px-4 py-3 text-red-700 transition-colors hover:bg-red-50"
                  type="button"
                >
                  <Icon name="delete" className="text-[18px]" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {selectedRoom ? (
        <RoomModal
          onClose={() => setSelectedRoom(null)}
          room={selectedRoom}
        />
      ) : null}
    </div>
  );
}
