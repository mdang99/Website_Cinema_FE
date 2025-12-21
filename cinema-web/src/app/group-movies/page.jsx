"use client";

import { useState, useMemo } from "react";
import moviesListData from "../../../mockup-Data/moviesListData.json";

import MovieCard from "@/components/movie/MovieCard";
import Pagination from "@/components/pagination/Pagination";

import useUrlFilters from "../../../hooks/useUrlFilter";
import FilterModal from "@/components/filter/FilterModal";
import FilterSort, { defaultFilters } from "@/components/filter/FilterSort";

export default function GroupMovies() {
  const itemsPerPage = 14;
  const { filters, updateFilters } = useUrlFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  // draftFilters CHỈ dùng cho modal
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const movies = moviesListData.movies;

  const options = useMemo(
    () => ({
      country: [...new Set(movies.map((m) => m.country))],
      genres: [...new Set(movies.flatMap((m) => m.genres))],
      ageRating: [...new Set(movies.map((m) => m.ageRating))],
      years: [
        ...new Set(movies.map((m) => new Date(m.releaseDate).getFullYear())),
      ].sort((a, b) => b - a),
    }),
    [movies]
  );

  /* ======================
     FILTER LOGIC
  ====================== */
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (filters.country.length && !filters.country.includes(movie.country))
        return false;

      if (
        filters.genres.length &&
        !movie.genres.some((g) => filters.genres.includes(g))
      )
        return false;

      if (
        filters.ageRating.length &&
        !filters.ageRating.includes(movie.ageRating)
      )
        return false;

      if (
        filters.year &&
        new Date(movie.releaseDate).getFullYear() !== filters.year
      )
        return false;

      return true;
    });
  }, [movies, filters]);

  /* ======================
     SORT LOGIC
  ====================== */
  const sortedMovies = useMemo(() => {
    const list = [...filteredMovies];

    switch (filters.sort) {
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "views":
        return list.sort((a, b) => b.views - a.views);
      default:
        return list.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
    }
  }, [filteredMovies, filters.sort]);

  /* ======================
     PAGINATION
  ====================== */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = sortedMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ======================
     OPEN FILTER (COPY STATE)
  ====================== */
  const openFilterModal = () => {
    setDraftFilters(filters); // copy từ URL
    setOpenFilter(true);
  };

  /* ======================
     APPLY FILTER
  ====================== */
  const applyFilters = () => {
    updateFilters(draftFilters);
    setCurrentPage(1);
    setOpenFilter(false);
  };

  return (
    <section className="mt-[80px]">
      <h1 className="text-[25px] font-semibold mb-[20px]">Phim bộ</h1>

      {/* Button mở filter (mobile) */}
      <button
        className="lg:hidden px-4 py-2 bg-yellow-400 text-black rounded-lg mb-4"
        onClick={openFilterModal}
      >
        Bộ lọc
      </button>

      {/* Filter Modal */}
      <FilterModal open={openFilter} onClose={() => setOpenFilter(false)}>
        <FilterSort
          options={options}
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
          onApply={applyFilters}
        />
      </FilterModal>

      {/* Movies Grid */}
      {currentMovies.length ? (
        <ul
          className="grid grid-cols-2 gap-4
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-7"
        >
          {currentMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400 py-10">
          Không tìm thấy phim phù hợp
        </p>
      )}

      {/* Pagination */}
      <Pagination
        totalItems={sortedMovies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
