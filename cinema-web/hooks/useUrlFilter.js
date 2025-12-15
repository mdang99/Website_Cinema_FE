"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildUrlFromFilters, parseFiltersFromUrl } from "../utils/filterUrl";


export default function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = parseFiltersFromUrl(searchParams);

  const updateFilters = newFilters => {
    const query = buildUrlFromFilters(newFilters);
    router.push(`?${query}`, { scroll: false });
  };

  return { filters, updateFilters };
}
