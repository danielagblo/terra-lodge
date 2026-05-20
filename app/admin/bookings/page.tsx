import { AdminBookingsView } from "@/components/admin/admin-bookings-view";
import { getAdminBookingsData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function parseSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const bookings = await getAdminBookingsData();
  const query = await searchParams;
  return <AdminBookingsView bookings={bookings} initialSearchTerm={parseSearchParam(query.search)} />;
}
