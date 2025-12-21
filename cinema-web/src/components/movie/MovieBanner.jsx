"use client";
import Image from "next/image";

export default function MovieBanner({ movie }) {
  return (
    <section className="relative h-[480px] w-full overflow-hidden">
      {/* BACKDROP */}
      <Image
        src={movie.backdropUrl}
        alt={`Backdrop phim ${movie.title}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto h-full flex items-end pb-12 px-4">
        <div className="flex gap-6">
          {/* POSTER */}
          <div className="relative w-44 h-64 flex-shrink-0">
            <Image
              src={movie.posterUrl}
              alt={`Poster phim ${movie.title}`}
              fill
              sizes="176px"
              className="object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl font-bold mb-1">{movie.title}</h1>

            <p className="text-gray-400 italic mb-3">{movie.originalTitle}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-white/10 rounded text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
                ▶ Xem ngay
              </button>

              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
