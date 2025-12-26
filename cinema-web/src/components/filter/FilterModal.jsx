"use client";

export default function FilterModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      <div className="absolute bottom-0 w-full h-[90%] bg-[#0f111a] rounded-t-xl overflow-y-auto p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Bộ lọc</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
