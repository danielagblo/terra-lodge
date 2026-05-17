import { AdminRoomsView } from "@/components/admin/admin-rooms-view";
import { getAdminRoomsData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await getAdminRoomsData();
  return <AdminRoomsView rooms={rooms} />;
}
