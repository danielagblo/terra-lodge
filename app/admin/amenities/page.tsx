import { AdminAmenitiesView } from "@/components/admin/admin-amenities-view";
import { getAdminAmenities } from "@/lib/amenities";

export const dynamic = "force-dynamic";

export default async function AdminAmenitiesPage() {
  const amenities = await getAdminAmenities();
  return <AdminAmenitiesView amenities={amenities} />;
}
