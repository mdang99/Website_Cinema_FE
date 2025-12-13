import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHeart,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="relative w-full h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={activeMovie.poster}
          alt={activeMovie.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 xl:via-black/40 to-transparent"></div>
        <div className="absolute inset-0 backdrop-blur-[2px] xl:backdrop-blur-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end xl:items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 pb-24 sm:pb-28 md:pb-32 xl:pb-20">
        <div className="w-full max-w-[1600px]">
          <div className="flex flex-col xl:flex-row items-center xl:items-end justify-between gap-6 md:gap-8 xl:gap-12">
            {/* Movie Info */}
            <div className="flex-1 max-w-3xl text-center xl:text-left w-full">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 md:mb-3 xl:mb-4 leading-tight tracking-tight">
                {activeMovie.title}
              </h1>

              {/* English Title */}
              {activeMovie.englishTitle && (
                <p className="text-lg sm:text-xl md:text-2xl text-yellow-400 mb-4 md:mb-5 xl:mb-6 font-light">
                  {activeMovie.englishTitle}
                </p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 md:gap-2.5 xl:gap-3 mb-4 md:mb-5 xl:mb-6">
                {activeMovie.rating && (
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-yellow-500/20 border border-yellow-500 md:border-2 rounded-lg text-yellow-400 text-xs md:text-sm font-bold backdrop-blur-sm">
                    ⭐ {activeMovie.rating}
                  </span>
                )}
                {activeMovie.ageRating && (
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 border border-white/40 rounded-lg text-white text-xs md:text-sm font-semibold backdrop-blur-sm">
                    {activeMovie.ageRating}
                  </span>
                )}
                {activeMovie.year && (
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 border border-white/40 rounded-lg text-white/90 text-xs md:text-sm backdrop-blur-sm">
                    {activeMovie.year}
                  </span>
                )}
                {activeMovie.duration && (
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 border border-white/40 rounded-lg text-white/90 text-xs md:text-sm backdrop-blur-sm">
                    ⏱️ {activeMovie.duration}
                  </span>
                )}
              </div>

              {/* Genres */}
              {activeMovie.genres && activeMovie.genres.length > 0 && (
                <div className="hidden md:flex flex-wrap justify-center xl:justify-start gap-2 mb-5 xl:mb-6">
                  {activeMovie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="text-gray-300 text-sm md:text-base"
                    >
                      {genre}
                      {index < activeMovie.genres.length - 1 ? " •" : ""}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {activeMovie.description && (
                <p className="hidden md:block text-gray-200 text-base lg:text-lg leading-relaxed mb-6 xl:mb-8 max-w-2xl mx-auto xl:mx-0 line-clamp-2 xl:line-clamp-3">
                  {activeMovie.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 md:gap-4">
                <button className="flex items-center gap-2 md:gap-3 px-6 md:px-7 xl:px-8 py-3 md:py-3.5 xl:py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg xl:rounded-xl transition-all transform hover:scale-105 shadow-xl md:shadow-2xl shadow-yellow-500/30">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="w-4 md:w-5 h-4 md:h-5"
                  />
                  <span className="text-sm md:text-base">Xem Ngay</span>
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-lg xl:rounded-xl transition-all transform hover:scale-105 shadow-lg md:shadow-xl ${
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/30"
                      : "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`w-5 md:w-6 h-5 md:h-6 ${
                      isFavorite ? "text-white" : "text-white"
                    }`}
                  />
                </button>

                <button className="flex items-center justify-center w-12 md:w-14 h-12 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg xl:rounded-xl transition-all transform hover:scale-105 shadow-lg md:shadow-xl">
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className="w-5 md:w-6 h-5 md:h-6 text-white"
                  />
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex md:flex xl:flex items-center gap-3 md:gap-4 mt-6 md:mt-0">
              {displayedMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-14 h-20 md:w-16 md:h-24 xl:w-20 xl:h-28 rounded-lg overflow-hidden transition-all transform ${
                    activeIndex === index
                      ? "border-3 md:border-4 border-yellow-500 scale-105 md:scale-110 shadow-lg md:shadow-2xl shadow-yellow-500/50"
                      : "border-2 border-white/20 opacity-50 hover:opacity-100 hover:scale-105"
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
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-yellow-500 transition-all duration-500 shadow-lg shadow-yellow-500/50"
          style={{
            width: `${((activeIndex + 1) / displayedMovies.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
