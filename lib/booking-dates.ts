export type BookingWindow = {
  checkIn: string;
  checkOut: string;
};

export function todayDateInput(reference = new Date()) {
  return reference.toISOString().slice(0, 10);
}

export function addDaysToInput(dateInput: string, days: number) {
  const date = new Date(`${dateInput}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return todayDateInput(date);
}

export function findNextAvailableDate(
  blockedRanges: BookingWindow[],
  startingAt: string,
) {
  let candidate = startingAt;
  const sortedRanges = [...blockedRanges].sort((left, right) =>
    left.checkIn.localeCompare(right.checkIn),
  );

  while (true) {
    const blockingRange = sortedRanges.find(
      (range) => range.checkIn <= candidate && range.checkOut > candidate,
    );

    if (!blockingRange) {
      return candidate;
    }

    candidate = blockingRange.checkOut;
  }
}

export function hasAvailabilityConflict(
  blockedRanges: BookingWindow[],
  checkIn: string,
  checkOut: string,
) {
  return blockedRanges.some(
    (range) => range.checkIn < checkOut && range.checkOut > checkIn,
  );
}

export function normalizeBookingDates(
  blockedRanges: BookingWindow[],
  requestedCheckIn: string,
  requestedCheckOut: string,
  fallbackCheckIn: string,
) {
  const safeCheckIn = findNextAvailableDate(
    blockedRanges,
    requestedCheckIn < fallbackCheckIn ? fallbackCheckIn : requestedCheckIn,
  );
  const safeCheckOut = findNextAvailableDate(
    blockedRanges,
    requestedCheckOut <= safeCheckIn
      ? addDaysToInput(safeCheckIn, 1)
      : requestedCheckOut,
  );

  if (safeCheckOut <= safeCheckIn) {
    return {
      checkIn: safeCheckIn,
      checkOut: addDaysToInput(safeCheckIn, 1),
    };
  }

  if (hasAvailabilityConflict(blockedRanges, safeCheckIn, safeCheckOut)) {
    return {
      checkIn: safeCheckIn,
      checkOut: addDaysToInput(safeCheckIn, 1),
    };
  }

  return {
    checkIn: safeCheckIn,
    checkOut: safeCheckOut,
  };
}
