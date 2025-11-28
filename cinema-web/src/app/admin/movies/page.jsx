// src/app/admin/movies/page.jsx
"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/common/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import { getAdminMovies } from "@/services/movieApi";

export default function AdminMoviesPage() {
  const { accessToken, user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdminMovies(accessToken);
        setMovies(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMovies(false);
      }
    }
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  return (
    <RequireAuth>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Admin – Quản lý phim</h1>
        {loadingMovies ? (
          <p>Đang tải...</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/10">
                <th className="border border-white/10 px-2 py-1 text-left">ID</th>
                <th className="border border-white/10 px-2 py-1 text-left">Tiêu đề</th>
                <th className="border border-white/10 px-2 py-1 text-left">Năm</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id} className="hover:bg-white/5">
                  <td className="border border-white/10 px-2 py-1">{m.id}</td>
                  <td className="border border-white/10 px-2 py-1">{m.title}</td>
                  <td className="border border-white/10 px-2 py-1">{m.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </RequireAuth>
  );
}
