"use client";

import { type ChangeEvent, type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "@/components/icon";
import type { Room } from "@/lib/rooms";
import { siteContent } from "@/lib/site-content";

type ModalType = "success" | "failed" | "cancelled" | null;

type GuestInfo = {
  fullName: string;
  email: string;
  phone: string;
};

function isModalType(value: string | null): value is Exclude<ModalType, null> {
  return value === "success" || value === "failed" || value === "cancelled";
}

function ModalShell({
  onClose,
  icon,
  title,
  message,
  reference,
  primaryAction,
  secondaryAction,
  primaryLabel,
  secondaryLabel,
}: {
  onClose: () => void;
  icon: ReactNode;
  title: string;
  message: string;
  reference?: string;
  primaryAction: ReactNode;
  secondaryAction: ReactNode;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        type="button"
      />
      <div className="relative bg-white max-w-[520px] w-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-outline-clay hover:text-primary transition-colors"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" className="text-[20px]" />
        </button>

        <div className="p-12 pt-14">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>

          <h2 className="font-eczar text-[32px] text-center text-charred-wood mb-4">
            {title}
          </h2>

          <p className="font-body-md text-base text-center text-on-surface-variant mb-6 leading-relaxed">
            {message}
          </p>

          {reference ? (
            <div className="bg-surface-container-low border border-surface-container px-4 py-3 mb-8 text-center">
              <p className="font-body-md text-sm font-bold text-primary">
                {reference}
              </p>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-3">
            {primaryAction}
            {secondaryAction}
          </div>

          <div className="sr-only">
            <span>{primaryLabel}</span>
            <span>{secondaryLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({
  onClose,
  reference,
  roomId,
}: {
  onClose: () => void;
  reference: string;
  roomId: number;
}) {
  return (
    <ModalShell
      icon={<Icon name="check" className="text-3xl" />}
      message={siteContent.checkout.successMessage}
      onClose={onClose}
      primaryAction={
        <Link
          className="flex-1 bg-primary px-6 py-4 cursor-pointer hover:bg-laterite-red transition-colors text-center"
          href={`/room/${roomId}`}
        >
          <span className="font-label-caps text-sm font-bold text-white uppercase">
            View My Booking
          </span>
        </Link>
      }
      primaryLabel="View My Booking"
      reference={reference}
      secondaryAction={
        <Link
          className="flex-1 bg-white border-2 border-primary px-6 py-4 cursor-pointer hover:bg-surface-bone transition-colors text-center"
          href="/"
        >
          <span className="font-label-caps text-sm font-bold text-primary uppercase">
            Return to Home
          </span>
        </Link>
      }
      secondaryLabel="Return to Home"
      title="Booking Confirmed"
    />
  );
}

function FailedModal({ onClose }: { onClose: () => void }) {
  return (
      <ModalShell
      icon={<Icon name="error" className="text-3xl" />}
      message={siteContent.checkout.failureMessage}
      onClose={onClose}
      primaryAction={
        <button
          className="flex-1 bg-primary px-6 py-4 cursor-pointer hover:bg-laterite-red transition-colors"
          onClick={onClose}
          type="button"
        >
          <span className="font-label-caps text-sm font-bold text-white uppercase">
            Try Again
          </span>
        </button>
      }
      primaryLabel="Try Again"
      secondaryAction={
        <Link
          className="flex-1 bg-white border-2 border-primary px-6 py-4 cursor-pointer hover:bg-surface-bone transition-colors text-center"
          href="/contact"
        >
          <span className="font-label-caps text-sm font-bold text-primary uppercase">
            Contact Us
          </span>
        </Link>
      }
      secondaryLabel="Contact Us"
      title="Payment Failed"
      reference=""
    />
  );
}

function CancelledModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      icon={<Icon name="cancel" className="text-3xl" />}
      message="You cancelled the payment. No charges were made to your account."
      onClose={onClose}
      primaryAction={
        <button
          className="flex-1 bg-primary px-6 py-4 cursor-pointer hover:bg-laterite-red transition-colors"
          onClick={onClose}
          type="button"
        >
          <span className="font-label-caps text-sm font-bold text-white uppercase">
            Try Again
          </span>
        </button>
      }
      primaryLabel="Try Again"
      secondaryAction={
        <Link
          className="flex-1 bg-white border-2 border-primary px-6 py-4 cursor-pointer hover:bg-surface-bone transition-colors text-center"
          href="/rooms"
        >
          <span className="font-label-caps text-sm font-bold text-primary uppercase">
            Back to Rooms
          </span>
        </Link>
      }
      secondaryLabel="Back to Rooms"
      title="Payment Cancelled"
      reference=""
    />
  );
}

export default function CheckoutView({ room }: { room: Room }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modalFromUrl = searchParams.get("payment-status");
  const initialSelectedModalType: Exclude<ModalType, null> = isModalType(
    modalFromUrl,
  )
    ? modalFromUrl
    : "success";
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [selectedModalType, setSelectedModalType] = useState<
    Exclude<ModalType, null>
  >(initialSelectedModalType);
  const [isLoading, setIsLoading] = useState(false);

  const isDevelopment = process.env.NODE_ENV !== "production";
  const activeModal = isModalType(modalFromUrl) ? modalFromUrl : null;
  const booking = {
    checkIn: {
      date: "Tuesday, November 20, 2024",
      time: "2:00 PM",
    },
    checkOut: {
      date: "Sunday, November 25, 2024",
      time: "11:00 AM",
    },
    nights: 5,
    guests: {
      adults: 2,
      children: 0,
    },
    rooms: 1,
  };
  const subtotal = room.priceValue * booking.nights * booking.rooms;
  const referenceCode = `TSL-${String(room.id).padStart(3, "0")}-ABC123`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setGuestInfo((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const setModalInUrl = (modal: Exclude<ModalType, null> | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (modal) {
      nextParams.set("payment-status", modal);
    } else {
      nextParams.delete("payment-status");
    }

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const handlePay = () => {
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
      setModalInUrl(selectedModalType);
    }, 2000);
  };

  return (
    <main className="flex-1 bg-surface-bone text-charred-wood">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            alt={siteContent.checkout.heroAlt}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={room.image}
          />
        </div>
        <div className="absolute inset-0 bg-charred-wood/85" />
        <div className="max-w-[1152px] mx-auto px-6 md:px-section-padding relative z-10">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="inline-flex bg-dry-grass/90 text-charred-wood px-4 py-1 font-label-caps text-[10px] font-bold uppercase tracking-[0.2em]">
              Secure Booking
            </span>
            <h1 className="font-eczar text-[48px] md:text-[64px] text-white leading-tight">
              Complete Your Booking
            </h1>
            <p className="font-body-lg text-white/95 max-w-3xl leading-relaxed">
              You&apos;re just one step away from your perfect stay. Review your
              booking and enter your details below.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1152px] mx-auto px-6 md:px-section-padding py-20">
        <div className="grid lg:grid-cols-[1fr_450px] gap-12">
          <div className="flex flex-col gap-8">
            <article className="bg-white border border-surface-container overflow-hidden">
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  alt={room.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  src={room.image}
                />
              </div>
              <div className="p-6">
                <h2 className="font-headline-sm text-3xl font-bold text-charred-wood mb-4">
                  {room.name}
                </h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {room.description}
                </p>
              </div>
            </article>

            <article className="bg-white border border-surface-container p-8">
              <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
                Booking Details
              </span>
              <div className="flex flex-col gap-5 mt-6">
                <div className="flex items-start justify-between pb-5 border-b border-surface-container">
                  <div>
                    <p className="font-headline-sm text-lg font-bold text-charred-wood">
                      Check-in
                    </p>
                    <p className="font-body-md text-sm text-outline-clay mt-1">
                      {booking.checkIn.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body-md text-sm text-charred-wood">
                      {booking.checkIn.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between pb-5 border-b border-surface-container">
                  <div>
                    <p className="font-headline-sm text-lg font-bold text-charred-wood">
                      Check-out
                    </p>
                    <p className="font-body-md text-sm text-outline-clay mt-1">
                      {booking.checkOut.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body-md text-sm text-charred-wood">
                      {booking.checkOut.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-5 border-b border-surface-container">
                  <p className="font-headline-sm text-lg font-bold text-charred-wood">
                    Duration
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {booking.nights} nights
                  </p>
                </div>

                <div className="flex items-center justify-between pb-5 border-b border-surface-container">
                  <p className="font-headline-sm text-lg font-bold text-charred-wood">
                    Guests
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {booking.guests.adults} Adults
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-headline-sm text-lg font-bold text-charred-wood">
                    Rooms
                  </p>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {booking.rooms} room
                  </p>
                </div>
              </div>
            </article>

            <article className="bg-white border border-surface-container p-8">
              <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
                Price Breakdown
              </span>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                  <p className="font-body-md text-sm text-on-surface-variant">
                    GHS {room.priceValue} x {booking.nights} nights x{" "}
                    {booking.rooms} room
                  </p>
                  <p className="font-body-md text-sm text-charred-wood">
                    GHS {subtotal.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="font-headline-sm text-xl font-bold text-charred-wood">
                    Total
                  </p>
                  <p className="font-headline-sm text-2xl font-bold text-primary">
                    GHS {subtotal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-surface-container">
                <div className="flex items-start gap-3">
                  <Icon name="verified" className="text-primary mt-0.5" />
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {room.cancellationPolicy}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:sticky lg:top-6 h-fit flex flex-col gap-6">
            <article className="bg-white border border-surface-container shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]">
              <div className="p-8">
                <span className="font-label-caps text-xs font-bold text-laterite-red uppercase tracking-widest">
                  Guest Information
                </span>

                <form className="flex flex-col gap-5 mt-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline-clay mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-white border border-surface-container px-4 py-3 font-body-md text-base text-charred-wood outline-none focus:border-primary transition-colors"
                      name="fullName"
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      type="text"
                      value={guestInfo.fullName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline-clay mb-2">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-white border border-surface-container px-4 py-3 font-body-md text-base text-charred-wood outline-none focus:border-primary transition-colors"
                      name="email"
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      type="email"
                      value={guestInfo.email}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline-clay mb-2">
                      Phone Number
                    </label>
                    <input
                      className="w-full bg-white border border-surface-container px-4 py-3 font-body-md text-base text-charred-wood outline-none focus:border-primary transition-colors"
                      name="phone"
                      onChange={handleChange}
                      placeholder="+233 XX XXX XXXX"
                      required
                      type="tel"
                      value={guestInfo.phone}
                    />
                  </div>

                  <button
                    className="w-full mt-2 bg-primary text-white px-6 py-4 font-label-caps text-sm font-bold uppercase hover:bg-laterite-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={handlePay}
                    type="button"
                  >
                    {isLoading ? "Processing..." : "Pay with Paystack"}
                  </button>
                </form>

                {isDevelopment ? (
                  <div className="mt-6 pt-6 border-t border-surface-container">
                    <span className="font-label-caps text-xs font-bold text-outline-clay uppercase tracking-widest">
                      Test Payment Outcome
                    </span>
                    <div className="mt-4 space-y-3">
                      {(["success", "failed", "cancelled"] as const).map(
                        (value) => (
                          <label
                            className="flex items-center gap-3 cursor-pointer"
                            key={value}
                          >
                            <input
                              checked={selectedModalType === value}
                              className="w-4 h-4 accent-primary"
                              onChange={() => setSelectedModalType(value)}
                              name="test-payment-outcome"
                              type="radio"
                              value={value}
                            />
                            <span className="font-body-md text-sm capitalize text-charred-wood">
                              {value}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 text-center">
                  <p className="font-body-md text-xs text-outline-clay leading-relaxed">
                    Secure payment. You won&apos;t be charged yet.
                  </p>
                </div>
              </div>
            </article>

            <article className="bg-white border border-surface-container p-6 flex items-center justify-center gap-3">
              <Icon name="shield" className="text-primary" />
              <p className="font-body-md text-sm text-on-surface-variant">
                Secured by Paystack
              </p>
            </article>
          </div>
        </div>
      </section>

      {activeModal === "success" ? (
        <SuccessModal
          onClose={() => setModalInUrl(null)}
          reference={referenceCode}
          roomId={room.id}
        />
      ) : null}
      {activeModal === "failed" ? (
        <FailedModal onClose={() => setModalInUrl(null)} />
      ) : null}
      {activeModal === "cancelled" ? (
        <CancelledModal onClose={() => setModalInUrl(null)} />
      ) : null}
    </main>
  );
}
