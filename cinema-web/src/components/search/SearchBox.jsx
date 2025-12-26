"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SearchSuggestion from "./Search";
import { searchMovies } from "../../../utils/searchMovies";

export default function SearchBox({ movies }) {
  const [keyword, setKeyword] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const router = useRouter();

  const results = useMemo(() => {
    return searchMovies(movies, keyword);
  }, [keyword, movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
    setShowSuggest(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setShowSuggest(true);
          }}
          placeholder="Tìm phim, diễn viên..."
          className="w-full px-4 py-2 rounded-full bg-zinc-800 text-white outline-none"
        />
      </form>

      {showSuggest && keyword && (
        <SearchSuggestion
          results={results}
          onSelect={() => setShowSuggest(false)}
        />
      )}
    </div>
  );
}
