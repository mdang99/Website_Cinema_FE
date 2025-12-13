import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../movie/MovieCard";

export default function MoviesCateLayout({ catId, movies = [] }) {
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const scrollContainerRef = useRef(null);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Số lượng movies hiển thị theo breakpoint
  const getDisplayCount = () => {
    if (isMobile) return 3;
    if (isTablet) return 5;
    return 7;
  };

  const displayCount = getDisplayCount();
  const displayedMovies = movies.slice(0, displayCount);
  const canScroll = isMobile || isTablet;

  // Handle card click
  const handleCardClick = (movieId, e) => {
    // Prevent click during drag
    if (e && e.defaultPrevented) return;

    if (canScroll) {
      // Mobile/Tablet: Toggle border only, no popup
      setActiveCard(activeCard === movieId ? null : movieId);
    }
    // Desktop: Let MovieCard handle hover popup naturally
  };

  // Scroll handlers
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector("li")?.offsetWidth || 0;
    const scrollAmount = cardWidth * (isMobile ? 2 : 3);

    const newScrollLeft =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // Touch/Mouse drag scroll
  const handleDragStart = (e) => {
    if (!canScroll) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const startX = e.type === "touchstart" ? e.touches[0].pageX : e.pageX;
    const scrollLeft = container.scrollLeft;
    let isDown = true;
    let hasMoved = false;

    const handleMove = (e) => {
      if (!isDown) return;
      hasMoved = true;
      e.preventDefault();

      const x = e.type === "touchmove" ? e.touches[0].pageX : e.pageX;
      const walk = (startX - x) * 2;
      container.scrollLeft = scrollLeft + walk;
    };

    const handleEnd = () => {
      isDown = false;
      // Reset activeCard if user was dragging
      if (hasMoved) {
        setActiveCard(null);
      }
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
      container.style.cursor = "grab";
    };

    container.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <section
      className="w-full relative mb-12"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4 lg:px-6">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold truncate">
          {catId}
        </h2>
        <button className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-600 hover:border-white flex items-center justify-center transition-colors">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Swiper Wrapper */}
      <div className="relative px-4 lg:px-6">
        {/* Scroll Buttons - Only for Tablet/Mobile with enough items */}
        {canScroll &&
          showButtons &&
          displayedMovies.length > (isMobile ? 2 : 4) && (
            <>
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all shadow-lg"
                aria-label="Scroll left"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-all shadow-lg"
                aria-label="Scroll right"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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

        {/* Movies Container */}
        <div
          ref={scrollContainerRef}
          className={`
            ${
              canScroll
                ? "overflow-x-auto overflow-y-hidden cursor-grab"
                : "overflow-visible"
            }
            no-scrollbar
          `}
          onMouseDown={canScroll ? handleDragStart : undefined}
          onTouchStart={canScroll ? handleDragStart : undefined}
        >
          <ul
            className={`
              list-none
              ${canScroll ? "flex" : "grid"}
              ${!canScroll ? "grid-cols-7 gap-3 xl:gap-4" : ""}
            `}
          >
            {displayedMovies.length > 0 ? (
              displayedMovies.map((movie, index) => (
                <li
                  key={movie.id || index}
                  className={`
                    ${canScroll ? "flex-shrink-0" : "relative"}
                    ${isMobile ? "w-[calc((100%-1rem)/3)]" : ""}
                    ${isTablet ? "w-[calc((100%-2rem)/5)]" : ""}
                    ${
                      canScroll && index < displayedMovies.length - 1
                        ? "mr-3 sm:mr-4"
                        : ""
                    }
                    ${!canScroll ? "group hover:z-50 cursor-pointer" : ""}
                    transition-all duration-300
                  `}
                  onClick={(e) => handleCardClick(movie.id, e)}
                >
                  <div
                    className={`
                    ${canScroll ? "relative rounded-lg overflow-hidden" : ""}
                    ${
                      canScroll && activeCard === movie.id
                        ? "ring-2 ring-red-500 ring-offset-2 ring-offset-gray-900"
                        : ""
                    }
                    ${
                      !canScroll
                        ? "transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300"
                        : ""
                    }
                    transition-all duration-200
                  `}
                  >
                    <MovieCard
                      movie={movie}
                      disableHover={canScroll}
                      showTrailerPopup={!canScroll}
                    />
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-400 col-span-full text-center py-8">
                Chưa có phim để hiển thị
              </li>
            )}
          </ul>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Smooth transitions */
        @media (prefers-reduced-motion: no-preference) {
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>
    </section>
  );
}
