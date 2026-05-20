import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PaymentReceiptView } from "@/components/admin/payment-receipt-view";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { getAdminPaymentReceiptData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function PaymentReceiptPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookingCode: string }>;
  searchParams?: Promise<{ download?: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!(await verifyAdminSessionToken(token))) {
    redirect("/admin/login");
  }

  const { bookingCode } = await params;
  const receipt = await getAdminPaymentReceiptData(bookingCode);

  if (!receipt) {
    notFound();
  }

  const query = (await searchParams) ?? {};
  const autoPrint = query.download === "1" || query.download === "true";

  return <PaymentReceiptView autoPrint={autoPrint} receipt={receipt} />;
}
