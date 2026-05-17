import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();
  return <AdminDashboardView data={data} />;
}
