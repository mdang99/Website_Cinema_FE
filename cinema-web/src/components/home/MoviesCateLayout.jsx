import React, { useState } from "react";
import MovieCard from "../movie/MovieCard";

export default function MoviesCateLayout({ catId, movies = [] }) {
  const [showButtons, setShowButtons] = useState(false);
  const perpage = 7;
  const displayedMovies = movies.slice(0, perpage); // Chỉ lấy 7 phim đầu

  return (
    <section
      className="w-full relative mb-12 px-4 "
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <h2 className="text-white text-2xl font-bold mb-6">{catId}</h2>

      <ul
        className="grid grid-cols-7 lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-4 w-full pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <li
              key={movie.id}
              className="flex-shrink-0"
              style={{ width: "calc(100% / 7)" }}
            >
              <MovieCard movie={movie} />
            </li>
          ))
        ) : (
          <p className="text-gray-400">Chưa có phim để hiển thị</p>
        )}
      </ul>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
