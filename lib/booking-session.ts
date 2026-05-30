import { addDaysToInput, todayDateInput } from "@/lib/booking-dates";

export const BOOKING_SESSION_STORAGE_KEY = "terra:booking-session";

export type BookingSession = {
  bookingCode: string;
  checkInDate: string;
  checkOutDate: string;
  expiresAt: string;
  reference: string;
  roomId: string;
};

type BookingSessionInput = Omit<BookingSession, "expiresAt">;
type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function createBookingSession(input: BookingSessionInput): BookingSession {
  return {
    ...input,
    expiresAt: addDaysToInput(input.checkOutDate, 1),
  };
}

export function readBookingSession(storage: StorageLike | null | undefined): BookingSession | null {
  if (!storage) {
    return null;
  }

  const rawValue = storage.getItem(BOOKING_SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;
    if (!isRecord(parsed)) {
      return null;
    }

    const session: BookingSession = {
      bookingCode: isString(parsed.bookingCode) ? parsed.bookingCode : "",
      checkInDate: isString(parsed.checkInDate) ? parsed.checkInDate : "",
      checkOutDate: isString(parsed.checkOutDate) ? parsed.checkOutDate : "",
      expiresAt: isString(parsed.expiresAt) ? parsed.expiresAt : "",
      reference: isString(parsed.reference) ? parsed.reference : "",
      roomId: isString(parsed.roomId) ? parsed.roomId : "",
    };

    if (
      !session.bookingCode ||
      !session.checkInDate ||
      !session.checkOutDate ||
      !session.expiresAt ||
      !session.reference ||
      !session.roomId
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function writeBookingSession(
  storage: StorageLike | null | undefined,
  session: BookingSession,
) {
  if (!storage) {
    return;
  }

  storage.setItem(BOOKING_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearBookingSession(storage: StorageLike | null | undefined) {
  if (!storage) {
    return;
  }

  storage.removeItem(BOOKING_SESSION_STORAGE_KEY);
}

export function isBookingSessionExpired(session: BookingSession, reference = new Date()) {
  return todayDateInput(reference) >= session.expiresAt;
}
