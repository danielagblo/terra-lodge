export type Room = {
  id: string;
  name: string;
  slug: string;
  price_per_night: number;
  description: string;
  bed_type: string;
  max_guests: number;
  amenities: string[];
  images: string[];
  is_active: boolean;
};

export type Booking = {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  room_id: string;
  check_in: string;
  check_out: string;
  num_guests_adults: number;
  num_guests_children: number;
  num_rooms: number;
  total_price: number;
  paystack_reference: string;
  payment_status: "pending" | "paid" | "failed";
  booking_reference: string;
  created_at: string;
};

export type BookingFormData = {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: Date;
  check_out: Date;
  guests_adults: number;
  guests_children: number;
  rooms_count: number;
  room_id: string;
  total_price: number;
};
