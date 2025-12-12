import React, { useRef, useState } from "react";
import MovieCard from "../movie/MovieCard";

export default function MoviesCateLayout({ catId, movies = [] }) {
  const [showButtons, setShowButtons] = useState(false);
  const scrollContainerRef = useRef(null);
  const perpage = 7;
  const displayedMovies = movies.slice(0, perpage);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Mouse drag scroll functionality (chỉ dùng cho tablet/mobile)
  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;
    let isDown = true;

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      container.style.cursor = "grab";
    };

    container.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <section
        className="w-full relative mb-12"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Header với Title và Arrow */}
        <div className="flex items-center justify-between mb-6 px-4 lg:px-0">
          <h2 className="text-white text-2xl lg:text-3xl font-bold">{catId}</h2>
          <button className="w-12 h-12 rounded-full border-2 border-gray-600 hover:border-white flex items-center justify-center transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Layout: Grid cố định 7 cột - KHÔNG SCROLL */}
        <ul className="hidden lg:grid lg:grid-cols-7 list-none">
          {displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <li key={movie.id} className="w-[calc(100% / 7)] mr-[13px]">
                <MovieCard movie={movie} />
              </li>
            ))
          ) : (
            <li className="text-gray-400 col-span-7">
              Chưa có phim để hiển thị
            </li>
          )}
        </ul>

        {/* Tablet Layout: Horizontal Scroll */}
        <div className="hidden md:block lg:hidden relative">
          {/* Scroll Buttons cho Tablet */}
          {showButtons && displayedMovies.length > 3 && (
            <>
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab"
            onMouseDown={handleMouseDown}
          >
            <ul className="flex list-none">
              {displayedMovies.length > 0 ? (
                displayedMovies.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex-shrink-0 w-[calc(100% / 3)] mr-[13px] movie-card-no-hover"
                  >
                    <MovieCard movie={movie} />
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Chưa có phim để hiển thị</li>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Layout: Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto overflow-y-hidden no-scrollbar">
            <ul className="flex  list-none">
              {displayedMovies.length > 0 ? (
                displayedMovies.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex-shrink-0 w-[calc(100% / 2)] mr-[13px] movie-card-no-hover"
                  >
                    <MovieCard movie={movie} />
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Chưa có phim để hiển thị</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Tắt hover effect trên tablet và mobile */
        .movie-card-no-hover :global(.group:hover) .play-icon,
        .movie-card-no-hover :global(.group:hover .absolute.inset-0.flex) {
          opacity: 0 !important;
        }
      `}</style>
    </>
  );
}
