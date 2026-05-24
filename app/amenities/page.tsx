import type { Metadata } from "next";
import { AmenitiesPage } from "@/components/amenities-page";
import { getAmenities } from "@/lib/amenities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Amenities | Terra Lodge",
  description: "Explore the amenities and comfort features available at Terra Lodge.",
};

export default async function AmenitiesRoutePage() {
  const amenities = await getAmenities();
  return <AmenitiesPage amenities={amenities} />;
}
