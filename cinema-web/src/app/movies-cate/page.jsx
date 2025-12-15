"use client";
import moviesListData from "../../../mockup-Data/moviesListData.json";
import MovieCard from "@/components/movie/MovieCard";
import React from "react";

export default function GroupMovies() {
  return (
    <>
      <section className="mt-[80px]">
        <h1 className="text-[25px] leading-[1.4] font-semibold mb-[20px]">
          Phim bộ
        </h1>
        <ul className="flex flex-row flex-wrap gap-4">
          {moviesListData.movies.map((movie) => (
            <li
              key={movie.id}
              className="lg:w-[calc((100%-96px)/7)] md:w-[calc((100%-64px)/4)] sm:w-[calc((100%-32px)/2)]"
            >
              <MovieCard key={movie.slug} movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
