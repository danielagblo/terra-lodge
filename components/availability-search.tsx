"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon";

type AvailabilityValues = {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
};

function buildRoomsUrl(values: AvailabilityValues) {
  const params = new URLSearchParams({
    checkIn: values.checkIn,
    checkOut: values.checkOut,
    guests: String(values.guests),
    roomType: values.roomType,
  });

  return `/rooms?${params.toString()}`;
}

export default function AvailabilitySearch({
  compact = false,
  submitLabel = "Check Availability",
  onSubmitNavigate = true,
  onNavigate,
}: {
  compact?: boolean;
  submitLabel?: string;
  onSubmitNavigate?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState<AvailabilityValues>({
    checkIn: "2024-11-20",
    checkOut: "2024-11-25",
    guests: 2,
    roomType: "Suite",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmitNavigate) {
      router.push(buildRoomsUrl(values));
      onNavigate?.();
    }
  };

  const updateValue = <K extends keyof AvailabilityValues>(
    key: K,
    value: AvailabilityValues[K],
  ) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <form
      className={compact ? "flex flex-col gap-4" : "w-full"}
      onSubmit={handleSubmit}
    >
      {compact ? (
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-1 gap-3">
            <Field
              compact
              label="Check-in"
              value={values.checkIn}
              onChange={(value) => updateValue("checkIn", value)}
            />
            <Field
              compact
              label="Check-out"
              value={values.checkOut}
              onChange={(value) => updateValue("checkOut", value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SelectField
              compact
              label="Guests"
              value={String(values.guests)}
              onChange={(value) =>
                updateValue("guests", Number.parseInt(value, 10))
              }
              options={[
                { label: "1 Guest", value: "1" },
                { label: "2 Guests", value: "2" },
                { label: "3 Guests", value: "3" },
                { label: "4 Guests", value: "4" },
              ]}
            />
            <SelectField
              compact
              label="Room Type"
              value={values.roomType}
              onChange={(value) => updateValue("roomType", value)}
              options={[
                { label: "Suite", value: "Suite" },
                { label: "Deluxe", value: "Deluxe" },
                { label: "Premium", value: "Premium" },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 md:p-2 shadow-xl border border-surface-container-high grid grid-cols-1 md:grid-cols-5 gap-2">
          <Field
            compact={compact}
            label="Check-in"
            value={values.checkIn}
            onChange={(value) => updateValue("checkIn", value)}
          />
          <Field
            compact={compact}
            label="Check-out"
            value={values.checkOut}
            onChange={(value) => updateValue("checkOut", value)}
          />
          <SelectField
            compact={compact}
            label="Guests"
            value={String(values.guests)}
            onChange={(value) => updateValue("guests", Number.parseInt(value, 10))}
            options={[
              { label: "1 Guest", value: "1" },
              { label: "2 Guests", value: "2" },
              { label: "3 Guests", value: "3" },
              { label: "4 Guests", value: "4" },
            ]}
          />
          <SelectField
            compact={compact}
            label="Room Type"
            value={values.roomType}
            onChange={(value) => updateValue("roomType", value)}
            options={[
              { label: "Suite", value: "Suite" },
              { label: "Deluxe", value: "Deluxe" },
              { label: "Premium", value: "Premium" },
            ]}
          />
          <div className="flex flex-col">
            <button
              className="h-full bg-primary hover:bg-laterite-red text-white font-label-caps text-sm font-bold py-4 px-6 uppercase transition-all shadow-md flex items-center justify-center"
              type="submit"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      )}

      {compact ? (
        <button
          className="w-full bg-primary hover:bg-laterite-red text-white font-label-caps text-sm font-bold py-4 uppercase transition-all shadow-md inline-flex items-center justify-center"
          type="submit"
        >
          {submitLabel}
        </button>
      ) : (
        <p className="text-white text-[11px] font-body-md mt-2 text-center md:text-left md:px-2 drop-shadow-sm">
          <Icon name="check_circle" className="inline-block align-middle mr-1 text-[12px]" />
          Free cancellation up to 48 hours before check-in
        </p>
      )}
    </form>
  );
}

function Field({
  compact,
  label,
  value,
  onChange,
}: {
  compact: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={
        compact
          ? "flex flex-col"
          : "flex flex-col px-4 py-2 border-b md:border-b-0 md:border-r border-surface-container"
      }
    >
      <label className="font-label-micro text-outline-clay uppercase font-bold text-[10px] mb-1">
        {label}
      </label>
      <input
        className={
          compact
            ? "w-full border border-surface-container px-4 py-3 font-body-md text-charred-wood focus:ring-0"
            : "border-none p-0 font-body-md text-charred-wood focus:ring-0 w-full"
        }
        onChange={(event) => onChange(event.target.value)}
        type="date"
        value={value}
      />
    </div>
  );
}

function SelectField({
  compact,
  label,
  value,
  onChange,
  options,
}: {
  compact: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div
      className={
        compact
          ? "flex flex-col"
          : "flex flex-col px-4 py-2 border-b md:border-b-0 md:border-r border-surface-container"
      }
    >
      <label className="font-label-micro text-outline-clay uppercase font-bold text-[10px] mb-1">
        {label}
      </label>
      <select
        className={
          compact
            ? "w-full border border-surface-container px-4 py-3 font-body-md text-charred-wood bg-white"
            : "border-none p-0 font-body-md text-charred-wood focus:ring-0 w-full bg-transparent"
        }
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function AvailabilityLink({
  children,
  values,
  className = "",
}: {
  children: ReactNode;
  values: AvailabilityValues;
  className?: string;
}) {
  return (
    <Link className={className} href={buildRoomsUrl(values)}>
      {children}
    </Link>
  );
}

export type { AvailabilityValues };
