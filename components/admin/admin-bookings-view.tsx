"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";

type BookingStatus = "Confirmed" | "Pending" | "Cancelled" | "Expired";
type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

type BookingRecord = {
  id: string;
  bookingId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  amount: number;
  status: BookingStatus;
  bookingDate: string;
  paymentStatus: PaymentStatus;
};

const mockBookings: BookingRecord[] = [
  {
    id: "BK-1234",
    guestName: "Kwame Mensah",
    guestEmail: "kwame.mensah@email.com",
    guestPhone: "+233 24 123 4567",
    room: "The Silt Suite",
    checkIn: "2026-05-20",
    checkOut: "2026-05-23",
    nights: 3,
    guests: 2,
    amount: 1950,
    status: "Confirmed",
    bookingDate: "2026-05-10",
    paymentStatus: "Paid",
  },
  {
    id: "BK-1235",
    guestName: "Ama Owusu",
    guestEmail: "ama.owusu@email.com",
    guestPhone: "+233 24 234 5678",
    room: "Basalt Retreat",
    checkIn: "2026-05-21",
    checkOut: "2026-05-24",
    nights: 3,
    guests: 2,
    amount: 1500,
    status: "Pending",
    bookingDate: "2026-05-12",
    paymentStatus: "Pending",
  },
  {
    id: "BK-1236",
    guestName: "Kofi Asante",
    guestEmail: "kofi.asante@email.com",
    guestPhone: "+233 24 345 6789",
    room: "Lodge Suite",
    checkIn: "2026-05-22",
    checkOut: "2026-05-25",
    nights: 3,
    guests: 4,
    amount: 2400,
    status: "Confirmed",
    bookingDate: "2026-05-11",
    paymentStatus: "Paid",
  },
  {
    id: "BK-1237",
    guestName: "Efua Boateng",
    guestEmail: "efua.boateng@email.com",
    guestPhone: "+233 24 456 7890",
    room: "The Silt Suite",
    checkIn: "2026-05-23",
    checkOut: "2026-05-26",
    nights: 3,
    guests: 2,
    amount: 1950,
    status: "Confirmed",
    bookingDate: "2026-05-13",
    paymentStatus: "Paid",
  },
  {
    id: "BK-1238",
    guestName: "Yaw Osei",
    guestEmail: "yaw.osei@email.com",
    guestPhone: "+233 24 567 8901",
    room: "Premium Suite",
    checkIn: "2026-05-25",
    checkOut: "2026-05-28",
    nights: 3,
    guests: 2,
    amount: 3600,
    status: "Cancelled",
    bookingDate: "2026-05-14",
    paymentStatus: "Refunded",
  },
  {
    id: "BK-1239",
    guestName: "Akua Mensah",
    guestEmail: "akua.mensah@email.com",
    guestPhone: "+233 24 678 9012",
    room: "Basalt Retreat",
    checkIn: "2026-05-26",
    checkOut: "2026-05-29",
    nights: 3,
    guests: 1,
    amount: 1500,
    status: "Confirmed",
    bookingDate: "2026-05-15",
    paymentStatus: "Paid",
  },
];

const filterOptions: Array<"all" | "confirmed" | "pending" | "cancelled" | "expired"> = [
  "all",
  "confirmed",
  "pending",
  "cancelled",
  "expired",
];

function badgeClassForBooking(status: BookingStatus) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "expired":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-surface-container text-charred-wood";
  }
}

function paymentBadgeClass(paymentStatus: PaymentStatus) {
  switch (paymentStatus.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "refunded":
      return "bg-red-100 text-red-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-surface-container text-charred-wood";
  }
}

function statusIcon(status: BookingStatus) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <Icon name="check_circle" className="text-[16px]" filled />;
    case "pending":
      return <Icon name="schedule" className="text-[16px]" />;
    case "cancelled":
      return <Icon name="cancel" className="text-[16px]" />;
    default:
      return null;
  }
}

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-laterite-red">
        Admin Management
      </span>
      <h1 className="mt-2 font-eczar text-[36px] font-bold text-charred-wood">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl font-body-md text-[14px] leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </header>
  );
}

function MetricCard({
  value,
  label,
  accentClassName,
}: {
  value: ReactNode;
  label: string;
  accentClassName?: string;
}) {
  return (
    <div className="border border-surface-container bg-white p-6">
      <div
        className={`mb-1 font-nimbus text-[32px] font-bold ${accentClassName ?? "text-charred-wood"}`}
      >
        {value}
      </div>
      <p className="font-body-md text-[14px] text-outline-clay">{label}</p>
    </div>
  );
}

function Modal({
  booking,
  onClose,
  onEdit,
  onCancel,
  onDelete,
}: {
  booking: BookingRecord;
  onClose: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white">
        <div className="bg-primary p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-eczar text-[28px] font-bold">
                Booking Details
              </h2>
              <p className="mt-1 font-body-md text-sm">{booking.id}</p>
            </div>
            <button
              aria-label="Close booking details"
              className="text-white transition-colors hover:text-dry-grass"
              onClick={onClose}
              type="button"
            >
              <Icon name="close" className="text-[28px]" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section className="border-b border-surface-container pb-6">
            <h3 className="mb-4 font-eczar text-[20px] font-bold text-charred-wood">
              Guest Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Name" value={booking.guestName} />
              <Detail label="Email" value={booking.guestEmail} />
              <Detail label="Phone" value={booking.guestPhone} />
              <Detail label="Guests" value={String(booking.guests)} />
            </div>
          </section>

          <section className="border-b border-surface-container pb-6">
            <h3 className="mb-4 font-eczar text-[20px] font-bold text-charred-wood">
              Reservation Details
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Room" value={booking.room} />
              <Detail label="Booking Date" value={booking.bookingDate} />
              <Detail label="Check-In" value={booking.checkIn} />
              <Detail label="Check-Out" value={booking.checkOut} />
              <Detail label="Nights" value={String(booking.nights)} />
              <Detail label="Status" value={booking.status} />
            </div>
          </section>

          <section>
            <h3 className="mb-4 font-eczar text-[20px] font-bold text-charred-wood">
              Payment Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Total Amount" value={`GH₵ ${booking.amount.toLocaleString()}`} />
              <div>
                <p className="mb-1 font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                  Payment Status
                </p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[12px] font-bold ${paymentBadgeClass(booking.paymentStatus)}`}
                >
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-surface-container pt-6 sm:flex-row">
            <button
              className="flex-1 bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
              onClick={onEdit}
              type="button"
            >
              Edit Booking
            </button>
            <button
              className="flex-1 border-2 border-primary bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-primary transition-colors hover:bg-surface-bone"
              onClick={onCancel}
              type="button"
            >
              Cancel Booking
            </button>
            <button
              className="flex-1 border-2 border-red-300 bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-red-700 transition-colors hover:bg-red-50"
              onClick={onDelete}
              type="button"
            >
              Delete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
        {label}
      </p>
      <p className="font-body-md text-[14px] text-charred-wood">{value}</p>
    </div>
  );
}

type BookingEditForm = {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: string;
  guests: string;
  amount: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
};

function bookingToEditForm(booking: BookingRecord): BookingEditForm {
  return {
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    guestPhone: booking.guestPhone,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    nights: String(booking.nights),
    guests: String(booking.guests),
    amount: String(booking.amount),
    bookingStatus: booking.status,
    paymentStatus: booking.paymentStatus,
  };
}

function BookingEditorModal({
  booking,
  draft,
  busy,
  onClose,
  onChange,
  onSave,
}: {
  booking: BookingRecord;
  draft: BookingEditForm;
  busy: boolean;
  onClose: () => void;
  onChange: <K extends keyof BookingEditForm>(field: K, value: BookingEditForm[K]) => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white">
        <div className="bg-primary p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-eczar text-[28px] font-bold">Edit Booking</h2>
              <p className="mt-1 font-body-md text-sm">{booking.id}</p>
            </div>
            <button
              aria-label="Close edit booking"
              className="text-white transition-colors hover:text-dry-grass"
              onClick={onClose}
              type="button"
            >
              <Icon name="close" className="text-[28px]" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <section className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Guest Name", field: "guestName", type: "text" as const },
              { label: "Guest Email", field: "guestEmail", type: "email" as const },
              { label: "Guest Phone", field: "guestPhone", type: "tel" as const },
              { label: "Check-In", field: "checkIn", type: "date" as const },
              { label: "Check-Out", field: "checkOut", type: "date" as const },
              { label: "Nights", field: "nights", type: "number" as const },
              { label: "Guests", field: "guests", type: "number" as const },
              { label: "Amount", field: "amount", type: "number" as const },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label className="mb-2 block font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                  {label}
                </label>
                <input
                  className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
                  onChange={(event) =>
                    onChange(
                      field as keyof BookingEditForm,
                      event.target.value as BookingEditForm[keyof BookingEditForm],
                    )
                  }
                  type={type}
                  value={draft[field as keyof BookingEditForm]}
                />
              </div>
            ))}
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                Booking Status
              </label>
              <select
                className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
                onChange={(event) =>
                  onChange("bookingStatus", event.target.value as BookingStatus)
                }
                value={draft.bookingStatus}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                Payment Status
              </label>
              <select
                className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
                onChange={(event) =>
                  onChange("paymentStatus", event.target.value as PaymentStatus)
                }
                value={draft.paymentStatus}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-surface-container pt-6 sm:flex-row">
            <button
              className="flex-1 bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red disabled:cursor-not-allowed disabled:opacity-70"
              disabled={busy}
              onClick={onSave}
              type="button"
            >
              {busy ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="flex-1 border-2 border-primary bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-primary transition-colors hover:bg-surface-bone"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type AdminBookingsViewProps = {
  bookings?: BookingRecord[];
  initialSearchTerm?: string;
};

function AdminBookingsContent({
  bookings = mockBookings,
  initialSearchTerm = "",
}: AdminBookingsViewProps = {}) {
  const router = useRouter();
  const [bookingsState, setBookingsState] = useState(bookings);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "confirmed" | "pending" | "cancelled" | "expired"
  >("all");
  const [searchTerm, setSearchTerm] = useState(() => initialSearchTerm);
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(
    null,
  );
  const [editingBooking, setEditingBooking] = useState<BookingRecord | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingEditForm | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingDeleteBooking, setPendingDeleteBooking] = useState<BookingRecord | null>(null);
  const pageSize = 5;

  const filteredBookings = useMemo(() => {
    return bookingsState.filter((booking) => {
      const matchesFilter =
        selectedFilter === "all" ||
        booking.status.toLowerCase() === selectedFilter;
      const matchesSearch =
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.bookingId?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.checkIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.checkOut.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [bookingsState, searchTerm, selectedFilter]);

  const pageCount = Math.max(Math.ceil(filteredBookings.length / pageSize), 1);

  const displayPage = Math.min(page, pageCount);

  const paginatedBookings = useMemo(() => {
    const start = (displayPage - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [displayPage, filteredBookings]);

  const openEditBooking = (booking: BookingRecord) => {
    setSelectedBooking(null);
    setEditingBooking(booking);
    setBookingDraft(bookingToEditForm(booking));
    setActionError(null);
  };

  const closeEditBooking = () => {
    setEditingBooking(null);
    setBookingDraft(null);
    setActionBusy(false);
  };

  const saveBookingEdits = async () => {
    if (!editingBooking || !bookingDraft) {
      return;
    }

    setActionBusy(true);

    try {
      const response = await fetch(`/api/bookings/${editingBooking.bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_name: bookingDraft.guestName,
          guest_email: bookingDraft.guestEmail,
          guest_phone: bookingDraft.guestPhone,
          check_in_date: bookingDraft.checkIn,
          check_out_date: bookingDraft.checkOut,
          guest_count: Number(bookingDraft.guests),
          room_count: 1,
          total_amount: Number(bookingDraft.amount),
          booking_status: bookingDraft.bookingStatus.toLowerCase(),
          payment_status:
            bookingDraft.paymentStatus === "Paid"
              ? "paid"
              : bookingDraft.paymentStatus === "Refunded"
                ? "refunded"
                : bookingDraft.paymentStatus === "Failed"
                  ? "failed"
                  : "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update booking.");
      }

      setBookingsState((current) =>
        current.map((item) =>
          item.bookingId === editingBooking.bookingId
            ? {
                ...item,
                guestName: bookingDraft.guestName,
                guestEmail: bookingDraft.guestEmail,
                guestPhone: bookingDraft.guestPhone,
                checkIn: bookingDraft.checkIn,
                checkOut: bookingDraft.checkOut,
                nights: Number(bookingDraft.nights),
                guests: Number(bookingDraft.guests),
                amount: Number(bookingDraft.amount),
                status: bookingDraft.bookingStatus,
                paymentStatus: bookingDraft.paymentStatus,
              }
            : item,
        ),
      );

      setEditingBooking(null);
      setBookingDraft(null);
      router.refresh();
      setActionError(null);
    } catch {
      setActionError("Unable to update booking.");
    } finally {
      setActionBusy(false);
    }
  };

  const cancelBooking = async (booking: BookingRecord) => {
    setActionBusy(true);

    try {
      const response = await fetch(`/api/bookings/${booking.bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_status: "cancelled",
          payment_status:
            booking.paymentStatus === "Paid" ? "refunded" : "failed",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to cancel booking.");
      }

      setBookingsState((current) =>
        current.map((item) =>
          item.bookingId === booking.bookingId
            ? {
                ...item,
                status: "Cancelled",
                paymentStatus: booking.paymentStatus === "Paid" ? "Refunded" : "Failed",
              }
            : item,
        ),
      );

      setSelectedBooking(null);
      setEditingBooking(null);
      setBookingDraft(null);
      router.refresh();
      setActionError(null);
    } catch {
      setActionError("Unable to cancel booking.");
    } finally {
      setActionBusy(false);
    }
  };

  const deleteBooking = async (booking: BookingRecord) => {
    setActionBusy(true);

    try {
      const response = await fetch(`/api/bookings/${booking.bookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete booking.");
      }

      setBookingsState((current) =>
        current.filter((item) => item.bookingId !== booking.bookingId),
      );

      setSelectedBooking(null);
      setEditingBooking(null);
      setBookingDraft(null);
      setPendingDeleteBooking(null);
      router.refresh();
      setActionError(null);
    } catch {
      setActionError("Unable to delete booking.");
      setPendingDeleteBooking(null);
    } finally {
      setActionBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        description="Manage reservations, payment states, and booking records for Terra Lodge."
        title="Bookings"
      />

      {actionError ? (
        <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 font-body-md text-[14px] text-red-700">
          {actionError}
        </div>
      ) : null}

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <MetricCard
          label="Confirmed Bookings"
          value={bookings.filter((booking) => booking.status === "Confirmed").length}
        />
        <MetricCard
          label="Pending Bookings"
          value={bookings.filter((booking) => booking.status === "Pending").length}
        />
        <MetricCard
          label="Cancelled Bookings"
          value={bookings.filter((booking) => booking.status === "Cancelled").length}
        />
        <MetricCard
          accentClassName="text-primary"
          label="Total Revenue"
          value={`GH₵ ${bookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}`}
        />
      </section>

      <section className="mb-6 border border-surface-container bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline-clay"
            />
            <input
              className="w-full border border-surface-container bg-white py-3 pl-11 pr-4 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
              placeholder="Search by guest name, booking ID, or room..."
              value={searchTerm}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const active = selectedFilter === filter;

              return (
                <button
                  className={`inline-flex items-center gap-2 rounded-sm px-4 py-3 font-label-caps text-sm font-bold uppercase transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "border border-surface-container bg-white text-on-surface-variant hover:bg-surface-bone"
                  }`}
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setPage(1);
                  }}
                  type="button"
                >
                  <Icon
                    name={
                      filter === "all"
                        ? "filter_alt"
                        : filter === "confirmed"
                          ? "check_circle"
                          : filter === "pending"
                            ? "schedule"
                            : "cancel"
                    }
                    className="text-[18px]"
                    filled={active && filter !== "all"}
                  />
                  <span>{filter}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border border-surface-container bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-surface-bone">
              <tr className="border-b border-surface-container">
                {[
                  "Booking ID",
                  "Guest",
                  "Room",
                  "Check-In",
                  "Check-Out",
                  "Nights",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    className="px-4 py-4 text-left font-label-caps text-[12px] font-bold uppercase tracking-wider text-outline-clay"
                    key={heading}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr
                  className="border-b border-surface-container transition-colors hover:bg-surface-bone"
                  key={booking.id}
                >
                  <td className="px-4 py-4 font-body-md text-[14px] font-medium text-charred-wood">
                    {booking.id}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-body-md text-[14px] font-bold text-charred-wood">
                      {booking.guestName}
                    </p>
                    <p className="font-body-md text-[12px] text-outline-clay">
                      {booking.guestEmail}
                    </p>
                  </td>
                  <td className="px-4 py-4 font-body-md text-[14px] text-on-surface-variant">
                    {booking.room}
                  </td>
                  <td className="px-4 py-4 font-body-md text-[14px] text-charred-wood">
                    {booking.checkIn}
                  </td>
                  <td className="px-4 py-4 font-body-md text-[14px] text-charred-wood">
                    {booking.checkOut}
                  </td>
                  <td className="px-4 py-4 font-body-md text-[14px] text-charred-wood">
                    {booking.nights}
                  </td>
                  <td className="px-4 py-4 font-body-md text-[14px] font-bold text-primary">
                    GH₵ {booking.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold ${badgeClassForBooking(booking.status)}`}
                    >
                      {statusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`View booking ${booking.id}`}
                        className="text-primary transition-colors hover:text-laterite-red"
                        onClick={() => setSelectedBooking(booking)}
                        type="button"
                      >
                        <Icon name="visibility" className="text-[20px]" />
                      </button>
                      <button
                        aria-label={`Edit booking ${booking.id}`}
                        className="text-outline-clay transition-colors hover:text-primary"
                        onClick={() => openEditBooking(booking)}
                        type="button"
                      >
                        <Icon name="edit" className="text-[20px]" />
                      </button>
                      <button
                        aria-label={`Delete booking ${booking.id}`}
                        className="text-red-700 transition-colors hover:text-red-900"
                        onClick={() => setPendingDeleteBooking(booking)}
                        type="button"
                      >
                        <Icon name="delete" className="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AdminPagination
          itemLabel="bookings"
          onPageChange={setPage}
          page={displayPage}
          pageCount={pageCount}
          pageSize={pageSize}
          total={filteredBookings.length}
        />
      </section>

      {selectedBooking ? (
        <Modal
          booking={selectedBooking}
          onCancel={() => cancelBooking(selectedBooking)}
          onClose={() => setSelectedBooking(null)}
          onDelete={() => setPendingDeleteBooking(selectedBooking)}
          onEdit={() => openEditBooking(selectedBooking)}
        />
      ) : null}

      {pendingDeleteBooking ? (
        <AdminConfirmModal
          busy={actionBusy}
          confirmLabel="Delete Booking"
          description={`Delete booking ${pendingDeleteBooking.id}?`}
          onClose={() => setPendingDeleteBooking(null)}
          onConfirm={() => deleteBooking(pendingDeleteBooking)}
          title="Delete Booking"
        />
      ) : null}

      {editingBooking && bookingDraft ? (
        <BookingEditorModal
          busy={actionBusy}
          booking={editingBooking}
          draft={bookingDraft}
          onChange={(field, value) =>
            setBookingDraft((current) =>
              current ? { ...current, [field]: value } : current,
            )
          }
          onClose={closeEditBooking}
          onSave={saveBookingEdits}
        />
      ) : null}
    </div>
  );
}

export function AdminBookingsView(props: AdminBookingsViewProps = {}) {
  return <AdminBookingsContent {...props} />;
}
