"use client";

import { useEffect, useState, type ReactNode } from "react";
import Icon from "@/components/icon";

type TabId = "general" | "notifications" | "payments" | "security";

type GeneralSettings = {
  hotelName: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  timezone: string;
};

type NotificationSettings = {
  emailNotifications: boolean;
  smsNotifications: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  cancelationAlerts: boolean;
};

type PaymentSettings = {
  mobileMoney: boolean;
  cardPayments: boolean;
  bankTransfer: boolean;
  cashPayments: boolean;
};

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: "general", label: "General", icon: "business" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "payments", label: "Payments", icon: "payments" },
  { id: "security", label: "Security", icon: "lock" },
];

const STORAGE_KEY = "terra-lodge-admin-settings";

function loadPersistedSettings() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    return JSON.parse(raw) as {
      generalSettings?: GeneralSettings;
      notificationSettings?: NotificationSettings;
      paymentSettings?: PaymentSettings;
    };
  } catch {
    return {};
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

function SectionCard({
  title,
  children,
  footerAction,
}: {
  title: string;
  children: ReactNode;
  footerAction: ReactNode;
}) {
  return (
    <section className="border border-surface-container bg-white p-6">
      <h2 className="mb-6 font-eczar text-[24px] font-bold text-charred-wood">
        {title}
      </h2>
      {children}
      <div className="mt-8 border-t border-surface-container pt-6">
        {footerAction}
      </div>
    </section>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-surface-container py-4 last:border-b-0 last:pb-0">
      <div>
        <p className="font-body-md text-[16px] font-medium text-charred-wood">
          {title}
        </p>
        <p className="mt-1 font-body-md text-[14px] text-outline-clay">
          {description}
        </p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          checked={checked}
          className="peer sr-only"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span className="peer h-6 w-11 rounded-full bg-surface-container transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full" />
      </label>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  as = "input",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  as?: "input" | "textarea" | "select";
}) {
  return (
    <div>
      <label className="mb-2 block font-label-caps text-[14px] font-bold uppercase tracking-widest text-charred-wood">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          value={value}
        />
      ) : as === "select" ? (
        <select
          className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          {label === "Currency" ? (
            <>
              <option value="GHS">GHS - Ghana Cedi</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </>
          ) : (
            <>
              <option value="GMT">GMT - Greenwich Mean Time</option>
              <option value="WAT">WAT - West Africa Time</option>
              <option value="UTC">UTC - Coordinated Universal Time</option>
            </>
          )}
        </select>
      ) : (
        <input
          className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
          onChange={(event) => onChange(event.target.value)}
          type={type}
          value={value}
        />
      )}
    </div>
  );
}

export function AdminSettingsView() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(() =>
    loadPersistedSettings().generalSettings ?? {
      hotelName: "Terra Santa Lodge",
      email: "info@terrasanta.com",
      phone: "+233 30 123 4567",
      address: "Adenta, Accra, Ghana",
      currency: "GHS",
      timezone: "GMT",
    },
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(() =>
      loadPersistedSettings().notificationSettings ?? {
        emailNotifications: true,
        smsNotifications: false,
        bookingAlerts: true,
        paymentAlerts: true,
        cancelationAlerts: true,
      },
    );
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() =>
    loadPersistedSettings().paymentSettings ?? {
      mobileMoney: true,
      cardPayments: true,
      bankTransfer: true,
      cashPayments: true,
    },
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          generalSettings,
          notificationSettings,
          paymentSettings,
        }),
      );
    } catch {
      // Ignore storage write failures.
    }
  }, [generalSettings, notificationSettings, paymentSettings]);

  return (
    <div>
      <PageHeader
        description="Manage hotel information, notifications, payments, and security preferences."
        title="Settings"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="border border-surface-container bg-white p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left font-body-md text-[14px] transition-colors ${
                      active
                        ? "bg-primary-fixed text-primary font-bold"
                        : "text-on-surface-variant hover:bg-surface-bone"
                    }`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    <Icon
                      className="text-[20px]"
                      name={tab.icon}
                      filled={active}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {activeTab === "general" ? (
            <SectionCard
              footerAction={
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red">
                    <Icon name="save" className="text-[18px]" />
                    Save Changes
                  </button>
                </div>
              }
              title="General Settings"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Hotel Name"
                    onChange={(value) =>
                      setGeneralSettings((current) => ({
                        ...current,
                        hotelName: value,
                      }))
                    }
                    value={generalSettings.hotelName}
                  />
                  <Field
                    label="Email Address"
                    onChange={(value) =>
                      setGeneralSettings((current) => ({
                        ...current,
                        email: value,
                      }))
                    }
                    type="email"
                    value={generalSettings.email}
                  />
                  <Field
                    label="Phone Number"
                    onChange={(value) =>
                      setGeneralSettings((current) => ({
                        ...current,
                        phone: value,
                      }))
                    }
                    type="tel"
                    value={generalSettings.phone}
                  />
                  <Field
                    label="Currency"
                    as="select"
                    onChange={(value) =>
                      setGeneralSettings((current) => ({
                        ...current,
                        currency: value,
                      }))
                    }
                    value={generalSettings.currency}
                  />
                </div>

                <Field
                  as="textarea"
                  label="Address"
                  onChange={(value) =>
                    setGeneralSettings((current) => ({
                      ...current,
                      address: value,
                    }))
                  }
                  value={generalSettings.address}
                />

                <Field
                  as="select"
                  label="Timezone"
                  onChange={(value) =>
                    setGeneralSettings((current) => ({
                      ...current,
                      timezone: value,
                    }))
                  }
                  value={generalSettings.timezone}
                />
              </div>
            </SectionCard>
          ) : null}

          {activeTab === "notifications" ? (
            <SectionCard
              footerAction={
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red">
                    <Icon name="save" className="text-[18px]" />
                    Save Changes
                  </button>
                </div>
              }
              title="Notification Settings"
            >
              <div className="space-y-2">
                <ToggleRow
                  checked={notificationSettings.emailNotifications}
                  description="Receive email notifications for important updates"
                  onChange={(value) =>
                    setNotificationSettings((current) => ({
                      ...current,
                      emailNotifications: value,
                    }))
                  }
                  title="Email Notifications"
                />
                <ToggleRow
                  checked={notificationSettings.smsNotifications}
                  description="Get SMS alerts for critical events"
                  onChange={(value) =>
                    setNotificationSettings((current) => ({
                      ...current,
                      smsNotifications: value,
                    }))
                  }
                  title="SMS Notifications"
                />
                <ToggleRow
                  checked={notificationSettings.bookingAlerts}
                  description="Notify when new bookings are made"
                  onChange={(value) =>
                    setNotificationSettings((current) => ({
                      ...current,
                      bookingAlerts: value,
                    }))
                  }
                  title="Booking Alerts"
                />
                <ToggleRow
                  checked={notificationSettings.paymentAlerts}
                  description="Get notified about payment transactions"
                  onChange={(value) =>
                    setNotificationSettings((current) => ({
                      ...current,
                      paymentAlerts: value,
                    }))
                  }
                  title="Payment Alerts"
                />
                <ToggleRow
                  checked={notificationSettings.cancelationAlerts}
                  description="Alert when bookings are cancelled"
                  onChange={(value) =>
                    setNotificationSettings((current) => ({
                      ...current,
                      cancelationAlerts: value,
                    }))
                  }
                  title="Cancelation Alerts"
                />
              </div>
            </SectionCard>
          ) : null}

          {activeTab === "payments" ? (
            <SectionCard
              footerAction={
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red">
                    <Icon name="save" className="text-[18px]" />
                    Save Changes
                  </button>
                </div>
              }
              title="Payment Settings"
            >
              <div className="space-y-2">
                <ToggleRow
                  checked={paymentSettings.mobileMoney}
                  description="Accept payments via MTN, Vodafone, AirtelTigo"
                  onChange={(value) =>
                    setPaymentSettings((current) => ({
                      ...current,
                      mobileMoney: value,
                    }))
                  }
                  title="Mobile Money"
                />
                <ToggleRow
                  checked={paymentSettings.cardPayments}
                  description="Accept Visa, Mastercard, and other cards"
                  onChange={(value) =>
                    setPaymentSettings((current) => ({
                      ...current,
                      cardPayments: value,
                    }))
                  }
                  title="Card Payments"
                />
                <ToggleRow
                  checked={paymentSettings.bankTransfer}
                  description="Allow direct bank transfers"
                  onChange={(value) =>
                    setPaymentSettings((current) => ({
                      ...current,
                      bankTransfer: value,
                    }))
                  }
                  title="Bank Transfer"
                />
                <ToggleRow
                  checked={paymentSettings.cashPayments}
                  description="Accept cash payments at the property"
                  onChange={(value) =>
                    setPaymentSettings((current) => ({
                      ...current,
                      cashPayments: value,
                    }))
                  }
                  title="Cash Payments"
                />
              </div>
            </SectionCard>
          ) : null}

          {activeTab === "security" ? (
            <SectionCard
              footerAction={
                <div className="flex justify-end">
                  <button className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red">
                    <Icon name="save" className="text-[18px]" />
                    Update Password
                  </button>
                </div>
              }
              title="Security Settings"
            >
              <div className="space-y-6">
                <Field label="Current Password" onChange={() => {}} type="password" value="" />
                <Field label="New Password" onChange={() => {}} type="password" value="" />
                <Field label="Confirm New Password" onChange={() => {}} type="password" value="" />

                <div className="border border-dry-grass/40 bg-dry-grass/20 p-4">
                  <p className="mb-2 font-label-caps text-[14px] font-bold uppercase text-primary">
                    Password Requirements:
                  </p>
                  <ul className="list-inside list-disc space-y-1 font-body-md text-[13px] text-on-surface-variant">
                    <li>At least 8 characters long</li>
                    <li>Include at least one uppercase letter</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character</li>
                  </ul>
                </div>
              </div>
            </SectionCard>
          ) : null}
        </div>
      </div>
    </div>
  );
}
