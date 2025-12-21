"use client";
export default function MovieInfo({ movie }) {
  return (
    <div className="bg-[#151821] rounded-xl p-6 space-y-4">
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="tag">{movie.ageRating}</span>
        <span className="tag">{movie.quality}</span>
        <span className="tag">{movie.runtime} phút</span>
        <span className="tag">⭐ {movie.rating}</span>
        <span className="tag">{movie.views.toLocaleString()} lượt xem</span>
      </div>

      <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
        <div>Quốc gia: {movie.country}</div>
        <div>Ngôn ngữ: {movie.language}</div>
        <div>Đạo diễn: {movie.director}</div>
        <div>Khởi chiếu: {movie.releaseDate}</div>
      </div>
    </div>
  );
}
