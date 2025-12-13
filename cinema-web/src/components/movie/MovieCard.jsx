import { useState, useEffect } from "react";

export default function MovieCard({ movie, disableHover = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop viewport
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Only allow hover on desktop
  const handleMouseEnter = () => {
    if (isDesktop && !disableHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative group w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal Card View */}
      <div
        className={`transition-opacity duration-300 ${
          isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a href={`/phim/${movie.slug}`} className="block">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={
                movie.poster ||
                "https://placehold.co/300x400/e1e1e1/333?text=Movie"
              }
              alt={movie.name}
              className="w-full h-auto aspect-[2/3] object-cover"
            />

            {/* Badges */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {movie.quality && (
                <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-gray-800">
                  {movie.quality}
                </div>
              )}
              {movie.lang && (
                <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-blue-600">
                  {movie.lang}
                </div>
              )}
              {movie.subtitle && (
                <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-green-600">
                  T.Minh
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 px-1">
            <h4 className="font-semibold text-sm text-white line-clamp-1">
              {movie.name}
            </h4>
            <h4 className="text-xs text-gray-400 line-clamp-1 mt-1">
              {movie.originName}
            </h4>
          </div>
        </a>
      </div>

      {/* Hover Popup - Only on Desktop */}
      {isDesktop && !disableHover && (
        <div
          className={`absolute top-0 left-0 w-[120%] bg-gray-900 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
            isHovered
              ? "opacity-100 -translate-y-4"
              : "opacity-0 translate-y-0 pointer-events-none"
          }`}
          style={{ minWidth: "320px" }}
        >
          {/* Trailer/Poster */}
          <div className="relative rounded-t-2xl overflow-hidden">
            <img
              src={
                movie.thumbUrl ||
                movie.poster ||
                "https://placehold.co/600x400/1a1a1a/fff?text=Trailer"
              }
              alt="Trailer"
              className="w-full h-auto aspect-[16/9] object-cover"
            />

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">
              {movie.name}
            </h3>
            <p className="text-yellow-500 text-sm mb-4 line-clamp-1">
              {movie.originName}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Xem ngay
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2.5 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white p-2.5 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Movie Info */}
            <div className="flex items-center gap-3 mb-3 text-sm flex-wrap">
              {movie.imdbRating && (
                <div className="flex items-center gap-1.5 border border-yellow-500 text-yellow-500 px-2 py-1 rounded">
                  <span className="font-semibold">IMDb</span>
                  <span>{movie.imdbRating}</span>
                </div>
              )}
              {movie.ageRating && (
                <div className="bg-white text-black font-bold px-2 py-1 rounded">
                  {movie.ageRating}
                </div>
              )}
              {movie.year && (
                <span className="text-gray-400">{movie.year}</span>
              )}
              {movie.time && (
                <span className="text-gray-400">{movie.time}</span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                {movie.genres.slice(0, 4).map((genre, index) => (
                  <span key={index}>
                    {genre.name}
                    {index < Math.min(movie.genres.length, 4) - 1 && " • "}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
