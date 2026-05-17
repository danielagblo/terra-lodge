import { AdminBookingsView } from "@/components/admin/admin-bookings-view";
import { getAdminBookingsData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookingsData();
  return <AdminBookingsView bookings={bookings} />;
}
