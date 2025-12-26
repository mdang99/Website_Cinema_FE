import React, { useRef, useState } from "react";

export default function MovieCardsClip({ movies = [] }) {
  const scrollContainerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

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

  // Format duration từ phút sang giờ:phút
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Clip-path cắt bên phải (index lẻ)
  const clipPathRight =
    "polygon(94.239% 100%, 5.761% 100%, 5.761% 100%, 4.826% 99.95%, 3.94% 99.803%, 3.113% 99.569%, 2.358% 99.256%, 1.687% 98.87%, 1.111% 98.421%, .643% 97.915%, .294% 97.362%, .075% 96.768%, 0 96.142%, 0 3.858%, 0 3.858%, .087% 3.185%, .338% 2.552%, .737% 1.968%, 1.269% 1.442%, 1.92% .984%, 2.672% .602%, 3.512% .306%, 4.423% .105%, 5.391% .008%, 6.4% .024%, 94.879% 6.625%, 94.879% 6.625%, 95.731% 6.732%, 96.532% 6.919%, 97.272% 7.178%, 97.942% 7.503%, 98.533% 7.887%, 99.038% 8.323%, 99.445% 8.805%, 99.747% 9.326%, 99.935% 9.88%, 100% 10.459%, 100% 96.142%, 100% 96.142%, 99.925% 96.768%, 99.706% 97.362%, 99.357% 97.915%, 98.889% 98.421%, 98.313% 98.87%, 97.642% 99.256%, 96.887% 99.569%, 96.06% 99.803%, 95.174% 99.95%, 94.239% 100%)";

  // Clip-path cắt bên trái (index chẵn - mirror của clipPathRight)
  const clipPathLeft =
    "polygon(5.761% 100%, 94.239% 100%, 94.239% 100%, 95.174% 99.95%, 96.06% 99.803%, 96.887% 99.569%, 97.642% 99.256%, 98.313% 98.87%, 98.889% 98.421%, 99.357% 97.915%, 99.706% 97.362%, 99.925% 96.768%, 100% 96.142%, 100% 3.858%, 100% 3.858%, 99.913% 3.185%, 99.662% 2.552%, 99.263% 1.968%, 98.731% 1.442%, 98.08% .984%, 97.328% .602%, 96.488% .306%, 95.577% .105%, 94.609% .008%, 93.6% .024%, 5.121% 6.625%, 5.121% 6.625%, 4.269% 6.732%, 3.468% 6.919%, 2.728% 7.178%, 2.058% 7.503%, 1.467% 7.887%, .962% 8.323%, .555% 8.805%, .253% 9.326%, .065% 9.88%, 0% 10.459%, 0% 96.142%, 0% 96.142%, .075% 96.768%, .294% 97.362%, .643% 97.915%, 1.111% 98.421%, 1.687% 98.87%, 2.358% 99.256%, 3.113% 99.569%, 3.94% 99.803%, 4.826% 99.95%, 5.761% 100%)";

  // Lấy badge label từ ageRating
  const getAgeBadge = (ageRating) => {
    return ageRating || "P";
  };

  // Check xem có subtitle/originalTitle không
  const getSubtitle = (movie) => {
    return movie.originalTitle || movie.country || "";
  };

  if (movies.length === 0) {
    return (
      <div className="text-gray-400 text-center py-12">
        Chưa có phim để hiển thị
      </div>
    );
  }

  return (
    <>
      <div
        className="relative bg-gray-900 py-8"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Scroll Buttons */}
        {showButtons && movies.length > 3 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className="hidden max-[1120px]:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-black items-center justify-center transition-all shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="hidden max-[1120px]:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-black items-center justify-center transition-all shadow-lg"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-6 px-6 overflow-x-auto overflow-y-hidden no-scrollbar max-[1120px]:cursor-grab"
          onMouseDown={handleMouseDown}
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="flex-shrink-0 relative group flex items-center gap-4"
            >
              {/* Số thứ tự lớn */}

              {/* Card container */}
              <div className="flex-shrink-0" style={{ width: "280px" }}>
                {/* Card với clip-path */}
                <div
                  className="relative shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-3 cursor-pointer overflow-hidden mb-3"
                  style={{
                    clipPath: index % 2 === 0 ? clipPathLeft : clipPathRight,
                  }}
                >
                  {/* Image */}
                  <div
                    className="w-full h-[420px] bg-center bg-cover relative"
                    style={{
                      backgroundImage: `url(${movie.poster || movie.backdrop})`,
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>

                  {/* Badge top-left - Age Rating */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-1 rounded bg-red-600 text-white text-xs font-semibold">
                      {getAgeBadge(movie.ageRating)}
                    </span>
                  </div>
                </div>

                {/* Info bên dưới card */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <span
                      className="text-[50px] font-black leading-none block"
                      style={{
                        WebkitTextStroke: "3px #444",
                        WebkitTextFillColor: "transparent",
                        textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <div className="text-white">
                    <h3 className="font-bold text-base mb-1 line-clamp-2 leading-tight">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                      {getSubtitle(movie)}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                      <span>{getAgeBadge(movie.ageRating)}</span>
                      <span>•</span>
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{formatDuration(movie.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Tắt overflow-x khi màn hình >= 1120px */
        @media (min-width: 1120px) {
          .overflow-x-auto {
            overflow-x: visible;
          }
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

// Demo với data giả
const demoMovies = [
  {
    id: 16,
    title: "Galactic Empire: Rise",
    country: "USA",
    genre: ["Sci-Fi", "Action", "Adventure"],
    duration: 155,
    rating: 6.9,
    ageRating: "T13",
    releaseDate: "2024-12-20",
    poster:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400",
    backdrop:
      "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200",
    year: 2024,
  },
  {
    id: 17,
    title: "Tết Vui Vẻ",
    country: "Vietnam",
    genre: ["Comedy", "Family"],
    duration: 98,
    rating: 6.8,
    ageRating: "P",
    releaseDate: "2025-01-18",
    poster:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    year: 2025,
  },
  {
    id: 18,
    title: "Deadpool 3",
    country: "USA",
    genre: ["Action", "Comedy", "Superhero"],
    duration: 127,
    rating: 6.7,
    ageRating: "T18",
    releaseDate: "2024-12-25",
    poster:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400",
    year: 2023,
  },
  {
    id: 19,
    title: "Emergency Declaration 2",
    originalTitle: "비상선언 2",
    country: "Korea",
    genre: ["Action", "Thriller", "Disaster"],
    duration: 145,
    rating: 6.9,
    ageRating: "T16",
    releaseDate: "2024-12-30",
    poster: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400",
    year: 2024,
  },
  {
    id: 20,
    title: "Detective Chinatown 4",
    originalTitle: "唐人街探案4",
    country: "China",
    genre: ["Comedy", "Mystery", "Action"],
    duration: 136,
    rating: 6.6,
    ageRating: "T13",
    releaseDate: "2025-01-01",
    poster:
      "https://images.unsplash.com/photo-1574267432644-f610a68b50e6?w=400",
    year: 2022,
  },
];
