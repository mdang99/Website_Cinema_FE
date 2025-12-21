"use client";

import Image from "next/image";
import Link from "next/link";

export default function MoviesCardTrailer({ movie, isHovered }) {
  if (!isHovered) return null;

  return (
    <div className="absolute top-0 left-0 w-[420px] z-50 rounded-2xl overflow-hidden shadow-2xl bg-[#0f1117]">
      {/* BACKDROP */}
      <div className="relative aspect-[16/9]">
        <Image
          src={movie.backdropUrl || movie.thumbUrl || movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="420px"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/60 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative p-5 -mt-20">
        {/* Title */}
        <h3 className="text-white text-xl font-bold leading-tight">
          {movie.title}
        </h3>
        <p className="text-yellow-400 text-sm mb-4">{movie.originalTitle}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/movie/${movie.slug}`}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2.5 rounded-xl transition"
          >
            ▶ Xem ngay
          </Link>

          <button className="flex items-center gap-2 border border-white/30 text-white px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
            ❤ Thích
          </button>

          <Link
            href={`/movie/${movie.slug}`}
            className="flex items-center gap-2 border border-white/30 text-white px-4 py-2.5 rounded-xl hover:bg-white/10 transition"
          >
            ℹ Chi tiết
          </Link>
        </div>

        {/* Meta */}
        <div className="flex items-center flex-wrap gap-3 text-sm mb-3">
          {movie.rating && (
            <span className="border border-yellow-400 text-yellow-400 px-2 py-1 rounded">
              IMDb {movie.rating}
            </span>
          )}
          {movie.ageRating && (
            <span className="bg-white text-black font-bold px-2 py-1 rounded">
              {movie.ageRating}
            </span>
          )}
          {movie.releaseDate && (
            <span className="text-gray-300">
              {movie.releaseDate.slice(0, 4)}
            </span>
          )}
          {movie.runtime && (
            <span className="text-gray-300">{movie.runtime}m</span>
          )}
        </div>

        {/* Genres */}
        {movie.genres?.length > 0 && (
          <div className="text-gray-300 text-sm">
            {movie.genres.join(" • ")}
          </div>
        )}
      </div>
    </div>
  );
}
