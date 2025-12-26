"use client";

export const defaultFilters = {
  country: [],
  genres: [],
  ageRating: [],
  year: null,
  sort: "latest",
};

export default function FilterSort({
  options,
  draftFilters,
  setDraftFilters,
  onApply,
}) {
  const toggleArray = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="space-y-6">
      <FilterRow
        label="Quốc gia"
        options={options.country}
        selected={draftFilters.country}
        onToggle={(v) => toggleArray("country", v)}
      />

      <FilterRow
        label="Thể loại"
        options={options.genres}
        selected={draftFilters.genres}
        onToggle={(v) => toggleArray("genres", v)}
      />

      <FilterRow
        label="Độ tuổi"
        options={options.ageRating}
        selected={draftFilters.ageRating}
        onToggle={(v) => toggleArray("ageRating", v)}
      />

      <FilterRow
        label="Năm"
        options={options.years}
        selected={draftFilters.year ? [draftFilters.year] : []}
        onToggle={(v) =>
          setDraftFilters((p) => ({
            ...p,
            year: p.year === v ? null : v,
          }))
        }
      />

      {/* Sort */}
      <div className="flex items-center gap-3">
        <span className="w-[100px] text-gray-400">Sắp xếp:</span>
        {[
          { label: "Mới nhất", value: "latest" },
          { label: "IMDb", value: "rating" },
          { label: "Lượt xem", value: "views" },
        ].map((s) => (
          <button
            key={s.value}
            onClick={() => setDraftFilters((p) => ({ ...p, sort: s.value }))}
            className={`px-3 py-1 rounded-lg text-sm ${
              draftFilters.sort === s.value
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-700">
        <button
          onClick={onApply}
          className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold"
        >
          Lọc kết quả
        </button>
      </div>
    </div>
  );
}

function FilterRow({ label, options = [], selected = [], onToggle }) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="w-[100px] text-gray-400">{label}:</span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onToggle(opt)}
          className={`px-3 py-1 rounded-lg text-sm ${
            selected.includes(opt)
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
