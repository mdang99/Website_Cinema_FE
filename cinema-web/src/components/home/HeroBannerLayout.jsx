import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function HeroBannerLayout({ movies }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!movies || movies.length === 0) {
    return null;
  }

  const perpage = 6;
  const displayedMovies = movies.slice(0, perpage);
  const activeMovie = displayedMovies[activeIndex];

  return (
    <div className="relative w-full top-[-100px] h-[720px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={activeMovie.poster}
          alt={activeMovie.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 md:bg-gradient-to-r md:from-black/95 md:via-black/60 md:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-20 bottom-0 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          {/* Left Section - Movie Info */}
          <div className="flex-1 max-w-3xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {activeMovie.title}
            </h1>

            {/* English Title */}
            {activeMovie.englishTitle && (
              <p className="text-lg md:text-xl lg:text-2xl text-yellow-400 mb-4 md:mb-6 font-light">
                {activeMovie.englishTitle}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
              {activeMovie.rating && (
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-400 text-sm font-semibold">
                  IMDb {activeMovie.rating}
                </span>
              )}
              {activeMovie.ageRating && (
                <span className="px-3 py-1 bg-white/20 border border-white/50 rounded text-white text-sm font-semibold">
                  {activeMovie.ageRating}
                </span>
              )}
              {activeMovie.year && (
                <span className="px-3 py-1 bg-white/20 border border-white/50 rounded text-white text-sm">
                  {activeMovie.year}
                </span>
              )}
              {activeMovie.duration && (
                <span className="px-3 py-1 bg-white/20 border border-white/50 rounded text-white text-sm">
                  {activeMovie.duration}
                </span>
              )}
            </div>

            {/* Genres - Hidden on mobile */}
            {activeMovie.genres && activeMovie.genres.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-2 mb-6">
                {activeMovie.genres.map((genre, index) => (
                  <span key={index} className="text-gray-300 text-sm">
                    {genre}
                    {index < activeMovie.genres.length - 1 ? " •" : ""}
                  </span>
                ))}
              </div>
            )}

            {/* Description - Hidden on mobile */}
            {activeMovie.description && (
              <p className="hidden md:block text-gray-200 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                {activeMovie.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg">
                <FontAwesomeIcon icon="fa-solid fa-play" className="w-4 h-4" />
                <span className="text-sm md:text-base">Xem Ngay</span>
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                }`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    isFavorite ? "text-white" : "text-white"
                  }`}
                />
              </button>

              <button className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all transform hover:scale-105 shadow-lg">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="w-5 h-5 md:w-6 md:h-6 text-white"
                />
              </button>
            </div>
          </div>

          {/* Right Section - Movie Carousel - Hidden on mobile */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {displayedMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-[80px] h-[50px] lg:w-[80px] lg:h-[50px] rounded overflow-hidden border-4 transition-all transform hover:scale-110 ${
                    activeIndex === index
                      ? "border-yellow-500 scale-110 shadow-xl rounded shadow-yellow-500/50"
                      : "border-white/30 rounded opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  {activeIndex === index && (
                    <div className="absolute inset-0 border-2 border-yellow-400 rounded"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel - Bottom */}
        <div className="md:hidden absolute bottom-20 left-0 right-0 px-6">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {displayedMovies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => setActiveIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-3 transition-all ${
                  activeIndex === index
                    ? "border-yellow-500 scale-110 shadow-lg shadow-yellow-500/50"
                    : "border-white/40 opacity-60"
                }`}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-yellow-500 transition-all duration-300"
          style={{
            width: `${((activeIndex + 1) / displayedMovies.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
