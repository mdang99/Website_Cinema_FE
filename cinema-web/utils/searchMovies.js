export function searchMovies(movies = [], keyword = "") {
  if (!keyword.trim()) return [];

  const q = keyword.toLowerCase();

  return movies.filter((movie) => {
    return (
      movie.title?.toLowerCase().includes(q) ||
      movie.originalTitle?.toLowerCase().includes(q) ||
      movie.cast?.some((actor) =>
        actor.toLowerCase().includes(q)
      )
    );
  });
}
