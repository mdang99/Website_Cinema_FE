"use client";
import { useState } from "react";

export default function MovieTabs({ movie }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="bg-[#151821] rounded-xl p-6">
      <div className="flex gap-6 border-b border-white/10 mb-4">
        <button onClick={() => setTab("overview")}>Giới thiệu</button>
        <button onClick={() => setTab("cast")}>Diễn viên</button>
        <button onClick={() => setTab("info")}>Thông tin</button>
      </div>

      {tab === "overview" && <p className="text-gray-300">{movie.overview}</p>}

      {tab === "cast" && (
        <ul className="list-disc ml-5 text-gray-300">
          {movie.cast.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}

      {tab === "info" && (
        <pre className="text-gray-400 text-sm">
          {JSON.stringify(movie, null, 2)}
        </pre>
      )}
    </div>
  );
}
