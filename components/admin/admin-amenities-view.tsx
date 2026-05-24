"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/icon";
import type { AmenityRecord } from "@/lib/amenities";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { iconOptions } from "@/lib/icon-options";
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal";

const iconCategories = [
  "All",
  ...Array.from(new Set(iconOptions.map((icon) => icon.category))),
];

type AmenityFormState = {
  id: string | null;
  slug: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  is_active: boolean;
  sort_order: string;
};

const emptyAmenityForm = (): AmenityFormState => ({
  id: null,
  slug: "",
  title: "",
  description: "",
  icon: "",
  featured: false,
  is_active: true,
  sort_order: "0",
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toAmenityForm(amenity: AmenityRecord): AmenityFormState {
  return {
    id: amenity.id,
    slug: amenity.slug,
    title: amenity.title,
    description: amenity.description,
    icon: amenity.icon,
    featured: amenity.featured,
    is_active: amenity.is_active,
    sort_order: String(amenity.sort_order),
  };
}

function Badge({ active, featured }: { active: boolean; featured: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`inline-flex rounded-full px-2 py-1 text-[11px] font-bold ${
          active ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"
        }`}
      >
        {active ? "Active" : "Hidden"}
      </span>
      {featured ? (
        <span className="inline-flex rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-800">
          Featured
        </span>
      ) : null}
    </div>
  );
}

function AmenityModal({
  form,
  invalidFields,
  mode,
  isSaving,
  error,
  onChange,
  onClose,
  onSave,
  iconSearch,
  selectedIconCategory,
  filteredIcons,
  onIconSearchChange,
  onIconCategoryChange,
}: {
  form: AmenityFormState;
  invalidFields: Array<keyof AmenityFormState>;
  mode: "create" | "edit";
  isSaving: boolean;
  error: string | null;
  onChange: <K extends keyof AmenityFormState>(
    key: K,
    value: AmenityFormState[K],
  ) => void;
  onClose: () => void;
  onSave: () => void;
  iconSearch: string;
  selectedIconCategory: string;
  filteredIcons: typeof iconOptions;
  onIconSearchChange: (value: string) => void;
  onIconCategoryChange: (value: string) => void;
}) {
  const highlight = (field: keyof AmenityFormState) =>
    invalidFields.includes(field)
      ? "border-red-500 focus:border-red-500"
      : "border-surface-container";
  const selectedIcon =
    iconOptions.find((icon) => icon.name === form.icon) ?? null;

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-surface-container bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <div className="border-b border-surface-container bg-primary p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-eczar text-[28px] font-bold">
                {mode === "create" ? "Create Amenity" : "Edit Amenity"}
              </h2>
              <p className="mt-1 font-body-md text-sm text-white/90">
                Manage the amenity card shown on the public amenities page and home page.
              </p>
            </div>
            <button
              aria-label="Close amenity editor"
              className="cursor-pointer text-white transition-colors hover:text-dry-grass"
              onClick={onClose}
              type="button"
            >
              <Icon name="close" className="text-[28px]" />
            </button>
          </div>
        </div>

        <div className="space-y-6 bg-surface-bone p-6">
          {error ? (
            <div className="border border-red-200 bg-red-50 px-4 py-3 font-body-md text-[14px] text-red-700">
              {error}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
                Title
              </span>
              <input
                className={`w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary ${highlight("title")}`}
                onChange={(event) => {
                  const nextTitle = event.target.value;
                  onChange("title", nextTitle);
                  if (!form.slug || form.slug === slugify(form.title)) {
                    onChange("slug", slugify(nextTitle));
                  }
                }}
                placeholder="High-Speed Wi-Fi"
                value={form.title}
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
                Slug
              </span>
              <input
                className={`w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary ${highlight("slug")}`}
                onChange={(event) => onChange("slug", event.target.value)}
                placeholder="high-speed-wifi"
                value={form.slug}
              />
            </label>
          </div>

          <div className="block">
            <span className="mb-2 block font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
              Logo
            </span>
            <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
              <aside className="rounded-sm border border-surface-container bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                      Selected Logo
                    </p>
                    <h3 className="mt-1 truncate font-eczar text-[22px] font-bold text-charred-wood">
                      {selectedIcon?.label ?? "Pick one"}
                    </h3>
                    <p className="mt-1 truncate font-body-md text-[12px] text-outline-clay">
                      {selectedIcon?.category ?? "Choose from the gallery"}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-surface-container bg-surface-bone text-primary">
                    <Icon name={form.icon || "help"} className="text-[30px]" />
                  </div>
                </div>

                <div className="mt-5 border border-surface-container bg-surface-bone p-4">
                  <div className="flex items-center justify-center border border-surface-container bg-white px-4 py-10">
                    <div className="flex h-24 w-24 items-center justify-center border border-surface-container bg-primary-fixed text-primary">
                      <Icon name={form.icon || "help"} className="text-[52px]" />
                    </div>
                  </div>
                  <div className="border-t border-surface-container px-4 py-4">
                    <p className="font-label-caps text-[10px] font-bold uppercase tracking-widest text-outline-clay">
                      Card Preview
                    </p>
                    <p className="mt-1 font-body-md text-[13px] font-semibold text-charred-wood">
                      {form.icon
                        ? `${selectedIcon?.label ?? form.icon} will appear on the amenity card.`
                        : "The selected logo will appear here."}
                    </p>
                  </div>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                    Icon Name
                  </span>
                  <input
                    className={`w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary ${highlight("icon")}`}
                    onChange={(event) => onChange("icon", event.target.value)}
                    placeholder="wifi"
                    value={form.icon}
                  />
                </label>

                <div className="mt-4 border border-dashed border-surface-container bg-surface-bone px-4 py-4">
                  <p className="font-body-md text-[12px] leading-relaxed text-outline-clay">
                    Search by icon name, or pick directly from the gallery on the right.
                  </p>
                </div>
              </aside>

              <section className="rounded-sm border border-surface-container bg-white p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
                    <div className="max-w-2xl">
                      <p className="font-body-md text-[13px] font-semibold text-charred-wood">
                        Browse Logos
                      </p>
                      <p className="font-body-md text-[12px] text-outline-clay">
                        Filter by category or search by icon name.
                      </p>
                    </div>

                    <div className="w-full xl:max-w-md">
                      <div className="relative">
                        <Icon
                          name="search"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline-clay"
                        />
                        <input
                          className="w-full border border-surface-container bg-surface-bone py-3 pl-11 pr-4 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary focus:bg-white"
                          onChange={(event) =>
                            onIconSearchChange(event.target.value)
                          }
                          placeholder="Search logos by name, e.g. wifi, spa, parking..."
                          value={iconSearch}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-2">
                    {iconCategories.map((category) => {
                      const activeCategory =
                        selectedIconCategory === category;

                      return (
                        <button
                          className={`cursor-pointer rounded-full border px-3 py-1.5 font-label-caps text-[10px] font-bold uppercase tracking-widest transition-colors ${
                            activeCategory
                              ? "border-primary bg-primary-fixed text-primary"
                              : "border-surface-container bg-surface-bone text-outline-clay hover:border-primary/40 hover:text-charred-wood"
                          }`}
                          key={category}
                          onClick={() => onIconCategoryChange(category)}
                          type="button"
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="font-body-md text-[12px] text-outline-clay">
                      Showing {filteredIcons.length} logo
                      {filteredIcons.length === 1 ? "" : "s"}
                    </p>
                    {form.icon ? (
                      <button
                        className="cursor-pointer font-label-caps text-[11px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-laterite-red"
                        onClick={() => onChange("icon", "")}
                        type="button"
                      >
                        Clear selection
                      </button>
                    ) : null}
                  </div>

                  <div className="max-h-[30rem] overflow-y-auto pr-1">
                    {filteredIcons.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {filteredIcons.map((icon) => {
                          const active = form.icon === icon.name;

                          return (
                            <button
                              className={`cursor-pointer flex min-h-[132px] flex-col items-center justify-center rounded-[24px] border px-4 py-5 text-center transition-all ${
                                active
                                  ? "border-primary bg-primary-fixed text-primary shadow-md ring-1 ring-primary/20"
                                  : "border-surface-container bg-white hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                              }`}
                              key={icon.name}
                              onClick={() => onChange("icon", icon.name)}
                              type="button"
                            >
                              <div className="flex h-16 w-16 items-center justify-center border border-surface-container bg-surface-bone text-primary">
                                <Icon
                                  name={icon.name}
                                  className="text-[34px]"
                                />
                              </div>
                              <p className="mt-4 line-clamp-1 font-body-md text-[13px] font-semibold text-charred-wood">
                                {icon.label}
                              </p>
                              <p className="mt-1 line-clamp-1 font-body-md text-[11px] text-outline-clay">
                                {icon.name}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="border border-dashed border-surface-container bg-surface-bone px-6 py-10 text-center">
                        <p className="font-body-md text-[14px] font-semibold text-charred-wood">
                          No logos found.
                        </p>
                        <p className="mt-1 font-body-md text-[12px] text-outline-clay">
                          Try a different search or switch categories.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
                Sort Order
              </span>
              <input
                className={`w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary ${highlight("sort_order")}`}
                min={0}
                onChange={(event) => onChange("sort_order", event.target.value)}
                type="number"
                value={form.sort_order}
              />
            </label>
            <div className="flex items-end gap-4 rounded-sm border border-surface-container bg-white px-4 py-3">
              <label className="inline-flex cursor-pointer items-center gap-2 font-body-md text-[14px] text-charred-wood">
                <input
                  checked={form.featured}
                  onChange={(event) => onChange("featured", event.target.checked)}
                  type="checkbox"
                />
                Featured
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 font-body-md text-[14px] text-charred-wood">
                <input
                  checked={form.is_active}
                  onChange={(event) => onChange("is_active", event.target.checked)}
                  type="checkbox"
                />
                Active
              </label>
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block font-label-caps text-[12px] font-bold uppercase tracking-widest text-outline-clay">
              Description
            </span>
            <textarea
              className={`min-h-[120px] w-full border border-surface-container bg-white px-4 py-3 font-body-md text-[14px] text-charred-wood outline-none transition-colors focus:border-primary ${highlight("description")}`}
              onChange={(event) => onChange("description", event.target.value)}
              value={form.description}
            />
          </label>

          <div className="flex flex-col gap-3 border-t border-surface-container pt-6 sm:flex-row sm:justify-end">
            <button
              className="cursor-pointer border border-surface-container bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-charred-wood transition-colors hover:bg-surface-bone"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="cursor-pointer bg-primary px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSaving}
              onClick={onSave}
              type="button"
            >
              {isSaving
                ? "Saving..."
                : mode === "create"
                  ? "Create Amenity"
                  : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminAmenitiesView({
  amenities,
}: {
  amenities: AmenityRecord[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(amenities);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"create" | "edit">("create");
  const [form, setForm] = useState<AmenityFormState>(emptyAmenityForm());
  const [invalidFields, setInvalidFields] = useState<
    Array<keyof AmenityFormState>
  >([]);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDeleteAmenity, setPendingDeleteAmenity] =
    useState<AmenityRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [iconSearch, setIconSearch] = useState("");
  const [selectedIconCategory, setSelectedIconCategory] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) =>
      [item.title, item.slug, item.description, item.icon]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / perPage));
  const paginatedItems = filteredItems.slice(
    (page - 1) * perPage,
    page * perPage,
  );
  const filteredIcons = useMemo(() => {
    const term = iconSearch.trim().toLowerCase();
    return iconOptions.filter((icon) => {
      const matchesSearch = !term
        ? true
        : [icon.name, icon.label, icon.category]
            .join(" ")
            .toLowerCase()
            .includes(term);
      const matchesCategory =
        selectedIconCategory === "All" ||
        icon.category === selectedIconCategory;

      return matchesSearch && matchesCategory;
    });
  }, [iconSearch, selectedIconCategory]);

  function openCreateAmenity() {
    setEditorMode("create");
    setForm(emptyAmenityForm());
    setEditorError(null);
    setInvalidFields([]);
    setIconSearch("");
    setSelectedIconCategory("All");
    setEditorOpen(true);
  }

  function openEditAmenity(amenity: AmenityRecord) {
    setEditorMode("edit");
    setForm(toAmenityForm(amenity));
    setEditorError(null);
    setInvalidFields([]);
    setIconSearch("");
    setSelectedIconCategory("All");
    setEditorOpen(true);
  }

  function updateField<K extends keyof AmenityFormState>(
    key: K,
    value: AmenityFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function formPayload() {
    return {
      slug: form.slug.trim() || slugify(form.title),
      title: form.title.trim(),
      description: form.description.trim(),
      icon: form.icon.trim(),
      featured: form.featured,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };
  }

  async function saveAmenity() {
    setIsSaving(true);
    setEditorError(null);
    setInvalidFields([]);

    try {
      const payload = formPayload();
      const nextInvalidFields: Array<keyof AmenityFormState> = [];
      if (!payload.title) nextInvalidFields.push("title");
      if (!payload.slug) nextInvalidFields.push("slug");
      if (!payload.icon) nextInvalidFields.push("icon");
      if (!payload.description) nextInvalidFields.push("description");

      if (nextInvalidFields.length > 0) {
        setInvalidFields(nextInvalidFields);
        setEditorError("Please complete the highlighted amenity fields.");
        return;
      }

      const response = await fetch(
        editorMode === "create"
          ? "/api/amenities"
          : `/api/amenities/${form.id}`,
        {
          method: editorMode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          isRecord(result) && typeof result.error === "string"
            ? result.error
            : "Unable to save amenity.";
        setEditorError(message);
        return;
      }

      if (editorMode === "create") {
        setItems((current) => [result as AmenityRecord, ...current]);
      } else {
        setItems((current) =>
          current.map((item) =>
            item.id === form.id ? (result as AmenityRecord) : item,
          ),
        );
      }

      setEditorOpen(false);
      setForm(emptyAmenityForm());
      setPage(1);
      router.refresh();
    } catch {
      setEditorError("Unable to save amenity.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteAmenity(amenity: AmenityRecord) {
    try {
      setDeletingId(amenity.id);
      const response = await fetch(`/api/amenities/${amenity.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const message =
          isRecord(result) && typeof result.error === "string"
            ? result.error
            : "Unable to delete amenity.";
        setEditorError(message);
        setEditorOpen(true);
        setPendingDeleteAmenity(null);
        return;
      }

      setItems((current) => current.filter((item) => item.id !== amenity.id));
      setPendingDeleteAmenity(null);
      router.refresh();
    } catch {
      setEditorError("Unable to delete amenity.");
      setEditorOpen(true);
      setPendingDeleteAmenity(null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-label-caps text-xs font-bold uppercase tracking-widest text-laterite-red">
            Admin Management
          </span>
          <h1 className="mt-2 font-eczar text-[36px] font-bold text-charred-wood">
            Amenities Management
          </h1>
          <p className="mt-2 max-w-2xl font-body-md text-[14px] leading-relaxed text-on-surface-variant">
            Manage the service cards shown on the public amenities page and the
            home page promo block.
          </p>
        </div>
        <button
          className="inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-laterite-red"
          onClick={openCreateAmenity}
          type="button"
        >
          <Icon name="add" className="text-[18px]" />
          <span>Add Amenity</span>
        </button>
      </header>

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="border border-surface-container bg-white p-6">
          <div className="mb-1 font-nimbus text-[32px] font-bold text-charred-wood">
            {items.length}
          </div>
          <p className="font-body-md text-[14px] text-outline-clay">
            Total Amenities
          </p>
        </div>
        <div className="border border-surface-container bg-white p-6">
          <div className="mb-1 font-nimbus text-[32px] font-bold text-green-700">
            {items.filter((item) => item.is_active).length}
          </div>
          <p className="font-body-md text-[14px] text-outline-clay">
            Active Amenities
          </p>
        </div>
        <div className="border border-surface-container bg-white p-6">
          <div className="mb-1 font-nimbus text-[32px] font-bold text-amber-700">
            {items.filter((item) => item.featured).length}
          </div>
          <p className="font-body-md text-[14px] text-outline-clay">Featured</p>
        </div>
        <div className="border border-surface-container bg-white p-6">
          <div className="mb-1 font-nimbus text-[32px] font-bold text-primary">
            {paginatedItems.length}
          </div>
          <p className="font-body-md text-[14px] text-outline-clay">
            Showing on page
          </p>
        </div>
      </section>

      <section className="mb-6 border border-surface-container bg-white p-6">
        <div className="relative">
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
            placeholder="Search amenities by title, icon, or description..."
            value={searchTerm}
          />
        </div>
      </section>

      <section className="overflow-hidden border border-surface-container bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-surface-container">
            <thead className="bg-surface-bone">
              <tr>
                <th className="px-6 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                  Amenity
                </th>
                <th className="px-6 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                  Description
                </th>
                <th className="px-6 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                  Order
                </th>
                <th className="px-6 py-4 text-left font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                  Status
                </th>
                <th className="px-6 py-4 text-right font-label-caps text-[11px] font-bold uppercase tracking-widest text-outline-clay">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {paginatedItems.map((amenity) => (
                <tr key={amenity.id}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center bg-primary-fixed text-primary">
                        <Icon name={amenity.icon} className="text-[22px]" />
                      </div>
                      <div>
                        <div className="font-body-md text-[15px] font-semibold text-charred-wood">
                          {amenity.title}
                        </div>
                        <div className="font-body-md text-[12px] text-outline-clay">
                          /{amenity.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-body-md text-[14px] leading-relaxed text-on-surface-variant">
                    {amenity.description}
                  </td>
                  <td className="px-6 py-5 font-body-md text-[14px] text-charred-wood">
                    {amenity.sort_order}
                  </td>
                  <td className="px-6 py-5">
                    <Badge
                      active={amenity.is_active}
                      featured={amenity.featured}
                    />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        className="border border-surface-container bg-white px-3 py-2 text-primary transition-colors hover:bg-surface-bone cursor-pointer"
                        onClick={() => openEditAmenity(amenity)}
                        type="button"
                      >
                        <Icon name="edit" className="text-[18px]" />
                      </button>
                      <button
                        className="border border-red-300 bg-white px-3 py-2 text-red-700 transition-colors hover:bg-red-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={deletingId === amenity.id}
                        onClick={() => setPendingDeleteAmenity(amenity)}
                        type="button"
                      >
                        {deletingId === amenity.id ? (
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <Icon name="delete" className="text-[18px]" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedItems.length === 0 ? (
                <tr>
                  <td
                    className="px-6 py-10 text-center font-body-md text-[14px] text-outline-clay"
                    colSpan={5}
                  >
                    No amenities found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="border-t border-surface-container px-6 py-5">
          <AdminPagination
            itemLabel="amenities"
            onPageChange={setPage}
            page={page}
            pageCount={totalPages}
            pageSize={perPage}
            total={filteredItems.length}
          />
        </div>
      </section>

      {editorOpen ? (
        <AmenityModal
          error={editorError}
          form={form}
          filteredIcons={filteredIcons}
          iconSearch={iconSearch}
          invalidFields={invalidFields}
          isSaving={isSaving}
          mode={editorMode}
          onChange={updateField}
          onClose={() => setEditorOpen(false)}
          onSave={saveAmenity}
          onIconCategoryChange={setSelectedIconCategory}
          onIconSearchChange={setIconSearch}
          selectedIconCategory={selectedIconCategory}
        />
      ) : null}

      {pendingDeleteAmenity ? (
        <AdminConfirmModal
          busy={deletingId === pendingDeleteAmenity.id}
          confirmLabel="Delete Amenity"
          description={`Delete ${pendingDeleteAmenity.title}?`}
          onClose={() => setPendingDeleteAmenity(null)}
          onConfirm={() => deleteAmenity(pendingDeleteAmenity)}
          title="Delete Amenity"
        />
      ) : null}
    </div>
  );
}
