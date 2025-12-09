import React from "react";
import MovieCard from "../movie/MovieCard";

export default function MoviesCateLayout({ catId }) {
  return (
    <>
      <section className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl font-bold mb-6">{catId}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </section>
    </>
  );
}
