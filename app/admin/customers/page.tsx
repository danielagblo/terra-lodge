import { AdminCustomersView } from "@/components/admin/admin-customers-view";
import { getAdminCustomersData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomersData();
  return <AdminCustomersView customers={customers} />;
}
