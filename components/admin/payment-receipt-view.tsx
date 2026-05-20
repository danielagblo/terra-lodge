"use client";

import { useEffect } from "react";
import Icon from "@/components/icon";
import type { AdminPaymentReceipt } from "@/lib/admin-data";

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#eadfd4] bg-[#fffaf5] p-4">
      <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
        {label}
      </p>
      <p className="mt-2 font-body-md text-[14px] font-medium text-charred-wood">
        {value}
      </p>
    </div>
  );
}

export function PaymentReceiptView({
  receipt,
  autoPrint = false,
}: {
  receipt: AdminPaymentReceipt;
  autoPrint?: boolean;
}) {
  useEffect(() => {
    if (!autoPrint) return;

    const timer = window.setTimeout(() => {
      window.print();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [autoPrint]);

  return (
    <main className="min-h-screen bg-[#f7f2ec] px-4 py-8 text-charred-wood sm:px-6 sm:py-10 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4 flex justify-end print:hidden">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 font-label-caps text-[12px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            onClick={() => window.print()}
            type="button"
          >
            <Icon name="download" className="text-[18px]" />
            <span>Download PDF</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-[#eadfd4] bg-white shadow-[0_24px_60px_rgba(74,30,0,0.08)]">
          <div className="relative overflow-hidden bg-primary px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_42%),radial-gradient(circle_at_left_bottom,rgba(255,255,255,0.08),transparent_36%)]" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <span className="font-label-caps text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffe8d6]">
                  Terra Lodge Receipt
                </span>
                <h1 className="mt-3 font-eczar text-[34px] font-bold leading-tight sm:text-[44px]">
                  Payment Receipt
                </h1>
                <p className="mt-3 max-w-lg font-body-md text-[14px] leading-relaxed text-white/85">
                  A polished record of your stay and payment details, ready to save
                  or print as PDF.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Receipt Number
                </p>
                <p className="mt-1 font-nimbus text-[24px] font-bold">
                  {receipt.receiptId}
                </p>
                <p className="mt-3 font-label-caps text-[10px] font-bold uppercase tracking-widest text-white/70">
                  {receipt.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Guest" value={receipt.guestName} />
              <Field label="Email" value={receipt.guestEmail} />
              <Field label="Phone" value={receipt.guestPhone} />
              <Field label="Transaction Ref" value={receipt.transactionRef} />
            </section>

            <section className="overflow-hidden rounded-[24px] border border-[#eadfd4] bg-[#fffaf8]">
              <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary-fixed p-3 text-primary">
                      <Icon name="bed" className="text-[24px]" />
                    </div>
                    <div>
                      <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                        Stay Summary
                      </p>
                      <h2 className="font-eczar text-[24px] font-bold text-charred-wood">
                        {receipt.room}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Room Type" value={receipt.roomType} />
                    <Field label="Guests" value={String(receipt.guests)} />
                    <Field label="Check-In" value={receipt.checkIn} />
                    <Field label="Check-Out" value={receipt.checkOut} />
                    <Field label="Nights" value={String(receipt.nights)} />
                    <Field label="Booking Status" value={receipt.bookingStatus} />
                  </div>
                </div>

                <aside className="rounded-[24px] border border-[#eadfd4] bg-white p-5 shadow-[0_16px_36px_rgba(74,30,0,0.06)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                        Total Amount
                      </p>
                      <p className="mt-1 font-eczar text-[34px] font-bold text-primary">
                        {receipt.currency} {receipt.amount.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="rounded-full bg-primary-fixed p-3 text-primary">
                      <Icon name="payments" className="text-[22px]" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-dashed border-[#eadfd4] pb-3">
                      <span className="font-body-md text-[14px] text-on-surface-variant">
                        Payment status
                      </span>
                      <span className="rounded-full bg-dry-grass/20 px-3 py-1 font-label-caps text-[11px] font-bold uppercase tracking-wider text-charred-wood">
                        {receipt.paymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-dashed border-[#eadfd4] pb-3">
                      <span className="font-body-md text-[14px] text-on-surface-variant">
                        Booking code
                      </span>
                      <span className="font-body-md text-[14px] font-medium">
                        {receipt.bookingId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-dashed border-[#eadfd4] pb-3">
                      <span className="font-body-md text-[14px] text-on-surface-variant">
                        Booking date
                      </span>
                      <span className="font-body-md text-[14px] font-medium">
                        {receipt.bookingDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body-md text-[14px] text-on-surface-variant">
                        Last updated
                      </span>
                      <span className="font-body-md text-[14px] font-medium">
                        {receipt.updatedAt}
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <section className="rounded-[24px] border border-[#eadfd4] bg-white p-5">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                    Notes
                  </p>
                  <p className="mt-2 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                    Keep this receipt for your records. If the payment is pending, it
                    means the transaction is still awaiting Paystack confirmation.
                  </p>
                </div>
                <div className="rounded-2xl bg-surface-bone p-4">
                  <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                    Reference
                  </p>
                  <p className="mt-2 font-body-md text-[14px] font-medium text-charred-wood">
                    {receipt.transactionRef}
                  </p>
                </div>
                <div className="rounded-2xl bg-primary-fixed p-4">
                  <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-primary">
                    Status
                  </p>
                  <p className="mt-2 font-body-md text-[14px] font-medium text-charred-wood">
                    {receipt.paymentStatus} / {receipt.bookingStatus}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm;
          }

          body {
            background: #fff;
          }
        }
      `}</style>
    </main>
  );
}
