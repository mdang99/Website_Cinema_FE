"use client";
export default function EpisodeList({ movie }) {
  if (movie.status === "coming_soon") {
    return (
      <div className="bg-[#151821] rounded-xl p-6 text-yellow-400">
        Phim sắp chiếu
      </div>
    );
  }

  return (
    <div className="bg-[#151821] rounded-xl p-6">
      <h3 className="font-semibold mb-4">Danh sách tập</h3>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {[1].map((ep) => (
          <button key={ep} className="ep-btn">
            Full Movie
          </button>
        ))}
      </div>
    </div>
  );
}
