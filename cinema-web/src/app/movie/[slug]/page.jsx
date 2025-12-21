import MovieBanner from "@/components/movie/MovieBanner";
import moviesListData from "../../../../mockup-Data/moviesListData.json";
import MovieInfo from "@/components/movie/MovieInfo";
import MovieTabs from "@/components/movie/MovieTabs";
import EpisodeList from "@/components/movie/EpisodeList";
import CastList from "@/components/movie/CastList";

export default async function MovieDetailPage({ params }) {
  const { slug } = await params;

  const movie = moviesListData.movies.find((m) => m.slug === slug);

  if (!movie) {
    return <div className="text-white p-10">Phim không tồn tại</div>;
  }

  return (
    <div className="bg-[#0f1117] text-white">
      <MovieBanner movie={movie} />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-9 space-y-6">
          <MovieInfo movie={movie} />
          <MovieTabs movie={movie} />
          <EpisodeList movie={movie} />
          {/* <CommentSection movieId={movie.id} /> */}
        </div>

        {/* RIGHT */}
        <aside className="lg:col-span-3">
          <CastList cast={movie.cast} />
        </aside>
      </div>
    </div>
  );
}
