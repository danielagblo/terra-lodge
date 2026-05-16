import React from "react";
import Icon from "./icon";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full relative bg-charred-wood text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-section-padding py-16 w-full max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <div className="font-headline-md text-dry-grass font-bold mb-4">
            Terra Lodge
          </div>
          <p className="font-body-md text-baked-silt text-sm leading-relaxed mb-6">
            Quality accommodation in Accra. Experience true comfort and
            hospitality during your stay in Ghana.
          </p>
          <div className="flex gap-4">
            <a
              className="bg-white/10 p-2 rounded-sm hover:bg-primary transition-colors"
              href="#"
            >
              <Icon name="facebook" className="text-white" />
            </a>
            <a
              className="bg-white/10 p-2 rounded-sm hover:bg-primary transition-colors"
              href="#"
            >
              <Icon name="photo_camera" className="text-white" />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-label-caps text-xs text-dry-grass/60 uppercase font-bold tracking-widest mb-2">
            Company
          </span>
          <Link
            className="text-baked-silt hover:text-white transition-colors font-body-md text-sm"
            href="/about"
          >
            About Us
          </Link>
          <Link
            className="text-baked-silt hover:text-white transition-colors font-body-md text-sm"
            href="/rooms"
          >
            Rooms &amp; Rates
          </Link>
          <Link
            className="text-baked-silt hover:text-white transition-colors font-body-md text-sm"
            href="/about"
          >
            Our Services
          </Link>
          <Link
            className="text-baked-silt hover:text-white transition-colors font-body-md text-sm"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-label-caps text-xs text-dry-grass/60 uppercase font-bold tracking-widest mb-2">
            Location
          </span>
          <p className="text-baked-silt font-body-md text-sm">
            124 Otoo Street, Adenta Housing Down
          </p>
          <p className="text-baked-silt font-body-md text-sm">Accra, Ghana</p>
          <p className="text-baked-silt font-body-md text-sm">
            info@terra-lodge.com
          </p>
          <p className="text-baked-silt font-body-md text-sm">
            +233 24 123 4567
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-label-caps text-xs text-dry-grass/60 uppercase font-bold tracking-widest mb-2">
            Newsletter
          </span>
          <p className="text-xs text-baked-silt font-body-md">
            Get updates on special offers and room availability.
          </p>
          <div className="flex">
            <input
              className="w-full bg-white/5 border border-white/20 px-4 py-2 text-white focus:border-primary focus:ring-0 placeholder:text-baked-silt/40 text-sm"
              placeholder="Email Address"
              type="email"
            />
            <button
              className="bg-primary px-4 hover:bg-laterite-red transition-all"
              type="button"
            >
              <Icon name="send" />
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-section-padding pb-8 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
        <span className="font-label-micro text-[10px] text-baked-silt/50 uppercase font-bold tracking-widest">
          &copy; 2026 Terra Lodge. Accra, Ghana.
        </span>
        <div className="flex gap-6 mt-4 md:mt-0 items-center">
          <span className="text-[10px] text-baked-silt/50 uppercase font-bold">
            Privacy Policy
          </span>
          <span className="text-[10px] text-baked-silt/50 uppercase font-bold">
            Terms of Service
          </span>
          <Icon name="payments" className="text-baked-silt/30 text-xl" />
        </div>
      </div>
    </footer>
  );
};
