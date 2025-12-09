"use client"

import { useEffect, useState } from "react";
import  "./page.module.css";
import MovieCardsClip from "@/components/home/SoonMovies";
import MoviesCateLayout from "@/components/home/MoviesCateLayout";

export default function HomePage() {
  
  // useEffect(() => {
  //   async function fetchMovies() {
  //     try {
  //       const data = await getVipMovies(accessToken); 
  //       setMovies(data || []);
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setLoadingMovies(false);
  //     }
  //   }
  //   fetchMovies();
  // }, [accessToken]);

  return (
    <>
      {/* {loadingMovies ? (
        <p>Đang tải danh sách phim...</p>
      ) : (
       <section>
        <h2>Danh sách phim VIP</h2>
         </section>
      )} */}
      <section className="hero-banner">
      
      </section>
      <section>
        <MoviesCateLayout catId="Phim sắp chiếu" />
        <MovieCardsClip />
      </section>
  </>
  );
}
