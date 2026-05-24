"use client";

import Icon from "@/components/icon";

type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function AdminConfirmModal({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  busy = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[240] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <div className="bg-red-700 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-eczar text-[28px] font-bold">{title}</h2>
              <p className="mt-1 font-body-md text-sm text-white/90">{description}</p>
            </div>
            <button
              aria-label="Close confirmation"
              className="text-white transition-colors hover:text-dry-grass disabled:cursor-not-allowed disabled:opacity-60"
              disabled={busy}
              onClick={onClose}
              type="button"
            >
              <Icon name="close" className="text-[28px]" />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <p className="font-body-md text-[15px] leading-relaxed text-on-surface-variant">
            This action cannot be undone.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              className="border border-surface-container bg-white px-6 py-3 font-label-caps text-sm font-bold uppercase text-charred-wood transition-colors hover:bg-surface-bone disabled:cursor-not-allowed disabled:opacity-70"
              disabled={busy}
              onClick={onClose}
              type="button"
            >
              {cancelLabel}
            </button>
            <button
              className="bg-red-700 px-6 py-3 font-label-caps text-sm font-bold uppercase text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={busy}
              onClick={onConfirm}
              type="button"
            >
              {busy ? "Working..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
