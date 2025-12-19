import Link from "next/link";

export default function Search({ results = [], onSelect }) {
  if (!results.length) return null;

  return (
    <ul className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-md z-50">
      {results.slice(0, 6).map((movie) => (
        <li
          key={movie.id}
          className="flex gap-3 p-3 hover:bg-zinc-800 cursor-pointer"
          onClick={onSelect}
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-10 h-14 object-cover rounded"
          />
          <div>
            <p className="text-sm font-medium">{movie.title}</p>
            <p className="text-xs text-zinc-400">{movie.releaseDate}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
