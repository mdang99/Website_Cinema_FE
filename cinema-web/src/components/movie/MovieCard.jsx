"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MoviesCardTrailer from "./MoviesCardTrailers";

export default function MoviesCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={() => isDesktop && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <Link href={`/movie/${movie.slug}`}>
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 200px, 50vw"
            priority={movie.isFeatured}
          />

          {/* Badges */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {movie.quality && (
              <span className="bg-black/70 px-2 py-1 text-xs rounded">
                {movie.quality}
              </span>
            )}
            {movie.language && (
              <span className="bg-blue-600 px-2 py-1 text-xs rounded">
                {movie.language}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-semibold text-white line-clamp-1">
            {movie.title}
          </h4>
          <p className="text-xs text-gray-400 line-clamp-1">
            {movie.originalTitle}
          </p>
        </div>
      </Link>

      {/* Hover trailer */}
      {isDesktop && <MoviesCardTrailer movie={movie} isHovered={isHovered} />}
    </div>
  );
}
