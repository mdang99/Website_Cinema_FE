// components/MovieCardsClip.jsx

export default function MovieCardsClip() {
  const placeholder = "https://placehold.co/600x400";

  const cards = [1, 2, 3, 4, 5];

  // Clip-path cắt bên phải (index lẻ)
  const clipPathRight =
    "polygon(94.239% 100%, 5.761% 100%, 5.761% 100%, 4.826% 99.95%, 3.94% 99.803%, 3.113% 99.569%, 2.358% 99.256%, 1.687% 98.87%, 1.111% 98.421%, .643% 97.915%, .294% 97.362%, .075% 96.768%, 0 96.142%, 0 3.858%, 0 3.858%, .087% 3.185%, .338% 2.552%, .737% 1.968%, 1.269% 1.442%, 1.92% .984%, 2.672% .602%, 3.512% .306%, 4.423% .105%, 5.391% .008%, 6.4% .024%, 94.879% 6.625%, 94.879% 6.625%, 95.731% 6.732%, 96.532% 6.919%, 97.272% 7.178%, 97.942% 7.503%, 98.533% 7.887%, 99.038% 8.323%, 99.445% 8.805%, 99.747% 9.326%, 99.935% 9.88%, 100% 10.459%, 100% 96.142%, 100% 96.142%, 99.925% 96.768%, 99.706% 97.362%, 99.357% 97.915%, 98.889% 98.421%, 98.313% 98.87%, 97.642% 99.256%, 96.887% 99.569%, 96.06% 99.803%, 95.174% 99.95%, 94.239% 100%)";

  // Clip-path cắt bên trái (index chẵn - mirror của clipPathRight)
  const clipPathLeft =
    "polygon(5.761% 100%, 94.239% 100%, 94.239% 100%, 95.174% 99.95%, 96.06% 99.803%, 96.887% 99.569%, 97.642% 99.256%, 98.313% 98.87%, 98.889% 98.421%, 99.357% 97.915%, 99.706% 97.362%, 99.925% 96.768%, 100% 96.142%, 100% 3.858%, 100% 3.858%, 99.913% 3.185%, 99.662% 2.552%, 99.263% 1.968%, 98.731% 1.442%, 98.08% .984%, 97.328% .602%, 96.488% .306%, 95.577% .105%, 94.609% .008%, 93.6% .024%, 5.121% 6.625%, 5.121% 6.625%, 4.269% 6.732%, 3.468% 6.919%, 2.728% 7.178%, 2.058% 7.503%, 1.467% 7.887%, .962% 8.323%, .555% 8.805%, .253% 9.326%, .065% 9.88%, 0% 10.459%, 0% 96.142%, 0% 96.142%, .075% 96.768%, .294% 97.362%, .643% 97.915%, 1.111% 98.421%, 1.687% 98.87%, 2.358% 99.256%, 3.113% 99.569%, 3.94% 99.803%, 4.826% 99.95%, 5.761% 100%)";

  return (
    <div className="flex gap-4 p-4 bg-gray-900 max-h-screen w-full">
      {cards.map((index) => (
        <div key={index} className="flex-shrink-0 relative w-[280px]">
          <div
            className="relative shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group"
            style={{ clipPath: index % 2 === 0 ? clipPathLeft : clipPathRight }}
          >
            {/* Image */}
            <div
              className="w-full h-[400px] bg-center bg-cover"
              style={{
                backgroundImage: `url(${placeholder})`,
              }}
            />

            {/* Hover mask */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Pin / badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-0.5 text-xs text-white z-10">
              <div className="bg-red-600 px-1 rounded">P.Đề</div>
              <div className="bg-blue-600 px-1 rounded">L.Tiếng</div>
              <div className="bg-green-600 px-1 rounded">T.Minh</div>
            </div>

            {/* Info */}
            <div className="absolute bottom-2 left-2 text-white">
              {/* Index with rotation */}
              <div
                className="font-bold text-yellow-500 text-lg inline-block"
                style={{ transform: "rotate(-90deg)" }}
              >
                {index}
              </div>
              <h4 className="font-semibold text-sm mt-1">
                Thành Phố Động Vật: Phi Vụ Động Trời
              </h4>
              <div className="text-gray-300 text-xs">Zootopia</div>
              <div className="flex gap-2 mt-1 text-[10px] text-white">
                <div className="bg-gray-700 px-1 rounded">T13</div>
                <div className="bg-gray-700 px-1 rounded">2016</div>
                <div className="bg-gray-700 px-1 rounded">1h 49m</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
