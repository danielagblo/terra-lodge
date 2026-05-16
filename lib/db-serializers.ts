type JsonLike = Record<string, unknown> | unknown[];

export type RoomDbRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_per_night: string | number;
  bed_type: string;
  max_guests: number;
  room_type: string;
  view_type: string;
  size: string;
  images: JsonLike | null;
  amenities: JsonLike | null;
  features: JsonLike | null;
  cancellation_policy: string | null;
  is_active: boolean;
  availability_status: string;
  availability_blocks: JsonLike | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type BookingDbRow = {
  id: string;
  booking_code: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  room_count: number;
  special_requests: string | null;
  total_amount: string | number;
  currency: string;
  booking_status: string;
  payment_status: string;
  paystack_reference: string | null;
  created_at: string;
  updated_at: string;
};

function asArray<T>(value: JsonLike | null | undefined): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function serializeRoom(row: RoomDbRow) {
  return {
    ...row,
    price_per_night: Number(row.price_per_night),
    images: asArray(row.images),
    amenities: asArray(row.amenities),
    features: asArray(row.features),
    availability_blocks: asArray(row.availability_blocks),
  };
}

export function serializeBooking(row: BookingDbRow) {
  return {
    ...row,
    total_amount: Number(row.total_amount),
  };
}
