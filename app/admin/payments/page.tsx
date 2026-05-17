import { AdminPaymentsView } from "@/components/admin/admin-payments-view";
import { getAdminDashboardData, getAdminPaymentsData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const [dashboard, payments] = await Promise.all([
    getAdminDashboardData(),
    getAdminPaymentsData(),
  ]);

  const completedTotal = payments
    .filter((payment) => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const statusData = [
    {
      label: "Completed",
      count: payments.filter((payment) => payment.status === "Completed").length,
    },
    {
      label: "Pending",
      count: payments.filter((payment) => payment.status === "Pending").length,
    },
    {
      label: "Failed",
      count: payments.filter((payment) => payment.status === "Failed").length,
    },
  ];

  return (
    <AdminPaymentsView
      payments={payments}
      stats={[
        {
          label: "Total Revenue",
          value: `GHS ${completedTotal.toLocaleString("en-US")}`,
          icon: "payments",
          color: "#4a1e00",
          change: dashboard.stats[0]?.change ?? "0%",
        },
        {
          label: "Completed Payments",
          value: String(statusData[0].count),
          icon: "check_circle",
          color: "#16a34a",
          change: dashboard.stats[1]?.change ?? "0%",
        },
        {
          label: "Pending Payments",
          value: String(statusData[1].count),
          icon: "schedule",
          color: "#f59e0b",
          change: dashboard.stats[2]?.change ?? "0%",
        },
        {
          label: "Failed Payments",
          value: String(statusData[2].count),
          icon: "cancel",
          color: "#ef4444",
          change: dashboard.stats[3]?.change ?? "0%",
        },
      ]}
      revenueTrend={dashboard.revenueData.map((point) => ({
        month: point.label,
        revenue: point.value,
      }))}
      statusData={statusData}
    />
  );
}
