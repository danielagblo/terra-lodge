"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon";
import { siteContent } from "@/lib/site-content";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email && formData.password) {
      router.push("/admin/dashboard");
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
                placeholder="admin@terrasanta.com"
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
              className="w-full bg-primary px-8 py-4 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
              type="submit"
            >
              Sign In
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
