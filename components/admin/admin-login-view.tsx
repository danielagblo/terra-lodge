"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon";
import { ADMIN_LOGIN_EMAIL } from "@/lib/admin-auth";
import { siteContent } from "@/lib/site-content";

type AdminLoginViewProps = {
  nextPath?: string;
  loggedOut?: boolean;
};

export function AdminLoginView({ nextPath, loggedOut }: AdminLoginViewProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    loggedOut ? "You have been signed out." : "",
  );
  const [formData, setFormData] = useState({
    email: ADMIN_LOGIN_EMAIL,
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "Unable to sign in.");
        return;
      }

      router.replace(nextPath && nextPath.startsWith("/admin") ? nextPath : "/admin/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-bone px-4 py-8">
      <div className="w-full max-w-[440px]">
        <div className="mb-12 text-center">
          <h1 className="font-eczar text-[40px] font-bold text-primary">
            {siteContent.brand.name}
          </h1>
          <p className="mt-2 font-label-caps text-[14px] uppercase tracking-[0.2em] text-outline-clay">
            Admin Access
          </p>
        </div>

        <div className="border border-surface-container bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="font-eczar text-[28px] font-bold text-charred-wood">
              Sign In
            </h2>
            <p className="mt-2 font-body-md text-[14px] text-on-surface-variant">
              Enter your credentials to access the admin panel.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage ? (
              <div className="border border-red-200 bg-red-50 px-4 py-3 font-body-md text-[14px] text-red-800">
                {errorMessage}
              </div>
            ) : null}

            <div>
              <label
                className="mb-2 block font-label-caps text-[14px] font-bold uppercase tracking-widest text-charred-wood"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
                id="email"
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder={ADMIN_LOGIN_EMAIL}
                required
                type="email"
                value={formData.email}
              />
            </div>

            <div>
              <label
                className="mb-2 block font-label-caps text-[14px] font-bold uppercase tracking-widest text-charred-wood"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full border border-surface-container bg-white px-4 py-3 pr-12 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary"
                  id="password"
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-clay transition-colors hover:text-primary"
                  onClick={() => setShowPassword((current) => !current)}
                  type="button"
                >
                  <Icon
                    name={showPassword ? "visibility_off" : "visibility"}
                    className="text-[20px]"
                  />
                </button>
              </div>
            </div>

            <button
              className="w-full bg-primary px-8 py-4 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              className="font-body-md text-[14px] text-outline-clay transition-colors hover:text-primary"
              href="/"
            >
              {"\u2190"} Back to Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
