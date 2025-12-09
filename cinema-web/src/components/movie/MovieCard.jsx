import { useState } from "react";

export default function CardMovies() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Card 1 */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Normal Card View */}
          <div
            className={`transition-opacity duration-300 ${
              isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <a href="/phim/nhoc-trum-noi-nghiep-gia-dinh" className="block">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://placehold.co/300x400/e1e1e1/333?text=Boss+Baby"
                  alt="Nhóc Trùm"
                  className="w-full h-auto aspect-[3/4] object-cover"
                />

                {/* Badges */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                  <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-gray-800">
                    P.Đề
                  </div>
                  <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-blue-600">
                    L.Tiếng
                  </div>
                  <div className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-green-600">
                    T.Minh
                  </div>
                </div>
              </div>

              <div className="mt-3 px-1">
                <h4 className="font-semibold text-sm text-white line-clamp-1">
                  Nhóc Trùm: Nổi Nghiệp Gia Đình
                </h4>
                <h4 className="text-xs text-gray-400 line-clamp-1 mt-1">
                  The Boss Baby: Family Business
                </h4>
              </div>
            </a>
          </div>

          {/* Hover Popup */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120%] bg-gray-900 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
              isHovered
                ? "opacity-100 -translate-y-4"
                : "opacity-0 translate-y-0 pointer-events-none"
            }`}
            style={{ minWidth: "320px" }}
          >
            {/* Trailer/Poster */}
            <div className="relative rounded-t-2xl overflow-hidden">
              <img
                src="https://placehold.co/600x400/1a1a1a/fff?text=Trailer+Video"
                alt="Trailer"
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-white text-lg mb-1">
                Nhóc Trùm: Nổi Nghiệp Gia Đình
              </h3>
              <p className="text-yellow-500 text-sm mb-4">
                The Boss Baby: Family Business
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
              <div className="flex items-center gap-3 mb-3 text-sm">
                <div className="flex items-center gap-1.5 border border-yellow-500 text-yellow-500 px-2 py-1 rounded">
                  <span className="font-semibold">IMDb</span>
                  <span>5.9</span>
                </div>
                <div className="bg-white text-black font-bold px-2 py-1 rounded">
                  T13
                </div>
                <span className="text-gray-400">2021</span>
                <span className="text-gray-400">1h 47m</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                <span>Chiếu Rạp</span>
                <span>•</span>
                <span>Gay Cấn</span>
                <span>•</span>
                <span>Gia Đình</span>
                <span>•</span>
                <span>Thiếu Nhi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
