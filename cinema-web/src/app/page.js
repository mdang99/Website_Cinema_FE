// src/app/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import RequireAuth from "@/components/common/RequireAuth";
import { getVipMovies } from "@/services/movieApi";
import MovieCard from "@/components/movie/MovieCard";

export default function HomePage() {
  const { accessToken, logout } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);

   useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVipMovies(accessToken);
        setMovies(data || []);
      } catch (e) {
        if (e.status === 401) {
          logout();
          router.replace("/login");
        }
      }
    }
    fetchData();
  }, [accessToken]);
  
  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getVipMovies(accessToken);
        setMovies(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMovies(false);
      }
    }
    fetchMovies();
  }, [accessToken]);

  return (
    <RequireAuth>
      <section>
        <h2 className="mb-4 text-xl font-bold">Phim VIP</h2>
        {loadingMovies ? (
          <p>Đang tải danh sách phim...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </section>
    </RequireAuth>
  );
}
