import MovieCard from "@/components/movie/MovieCard";
import moviesListData from "../../../mockup-Data/moviesListData.json";
import { searchMovies } from "../../../utils/searchMovies";
import Pagination from "@/components/pagination/Pagination";

export default async function SearchPage({ searchParams }) {
  // ✅ PHẢI await
  const { q = "" } = await searchParams;

  const keyword = q.trim();

  const results = keyword ? searchMovies(moviesListData.movies, keyword) : [];

  return (
    <div className="container mx-auto px-4 py-8 mt-[100px]">
      <h1 className="text-2xl font-semibold mb-4">Kết quả tìm kiếm</h1>

      {keyword && (
        <p className="mb-6 text-zinc-400">
          Từ khóa: <span className="text-red-500">{keyword}</span>
        </p>
      )}

      {!keyword && (
        <p className="text-zinc-400">Vui lòng nhập từ khóa để tìm kiếm.</p>
      )}

      {keyword && results.length === 0 && (
        <p className="text-zinc-400">Không tìm thấy phim phù hợp.</p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <Pagination totalItems={results.length} itemsPerPage={12} />
    </div>
  );
}
