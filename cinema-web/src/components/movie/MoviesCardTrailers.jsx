import MovieCard from "./MovieCard";

function MovieCardDemo() {
  const movies = [
    {
      slug: "nhoc-trum-noi-nghiep-gia-dinh",
      title: "Nhóc Trùm: Nổi Nghiệp Gia Đình",
      originalTitle: "The Boss Baby: Family Business",
      poster: "https://placehold.co/300x400/e1e1e1/333?text=Boss+Baby",
      trailer: "https://placehold.co/600x400/1a1a1a/fff?text=Trailer",
      badges: ["P.Đề", "L.Tiếng", "T.Minh"],
      imdb: "5.9",
      rating: "T13",
      year: "2021",
      duration: "1h 47m",
      genres: ["Chiếu Rạp", "Gay Cấn", "Gia Đình", "Thiếu Nhi"],
    },
    {
      slug: "zui-du-chua",
      title: "Zui Dữ Chưa?",
      originalTitle: "Oh. What. Fun.",
      poster: "https://placehold.co/300x400/d4d4d4/333?text=Oh+What+Fun",
      trailer: "https://placehold.co/600x400/1a1a1a/fff?text=Trailer",
      badges: ["P.Đề"],
      imdb: "6.2",
      rating: "T16",
      year: "2024",
      duration: "2h 05m",
      genres: ["Hành Động", "Hài Hước", "Phiêu Lưu"],
    },
  ];

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-2xl font-bold mb-6">Phim Đề Xuất</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {movies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCardDemo;
