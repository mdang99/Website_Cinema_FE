import { defaultFilters } from "@/components/filter/FilterSort";

export function parseFiltersFromUrl(params) {
  const parsed = {
    country: params.get("country")?.split(",") ?? [],
    genres: params.get("genres")?.split(",") ?? [],
    ageRating: params.get("age")?.split(",") ?? [],
    year: params.get("year") ? Number(params.get("year")) : null,
    sort: params.get("sort") ?? "latest",
  };

  return {
    ...defaultFilters,
    ...parsed,
  };
}

export function buildUrlFromFilters(filters) {
  const p = new URLSearchParams();

  if (filters.country.length)
    p.set("country", filters.country.join(","));

  if (filters.genres.length)
    p.set("genres", filters.genres.join(","));

  if (filters.ageRating.length)
    p.set("age", filters.ageRating.join(","));

  if (filters.year) p.set("year", filters.year);

  if (filters.sort !== "latest") p.set("sort", filters.sort);

  return p.toString();
}
