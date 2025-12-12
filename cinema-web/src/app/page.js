"use client"
import homeData from "../../mockup-Data/homeData.json";
import { useEffect, useState } from "react";
import  "./page.module.css";
import MovieCardsClip from "@/components/home/SoonMovies";
import MoviesCateLayout from "@/components/home/MoviesCateLayout";
import HeroBannerLayout from "@/components/home/HeroBannerLayout";

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
        <HeroBannerLayout movies={homeData.comingSoon || []} />
      </section>
       <section className="movies-USA w-full">
        <MoviesCateLayout 
          catId="Phim Mỹ" 
          movies={homeData.moviesByCountry.usa || []}
        />
      </section>
       <section className="movies-Korea w-full">
        <MoviesCateLayout 
          catId="Phim Hàn" 
          movies={homeData.moviesByCountry.korea || []}
        />
      </section>
      <section className="movies-China w-full">
        <MoviesCateLayout 
          catId="Phim TQ" 
          movies={homeData.moviesByCountry.china || []}
        />
      </section>
      <section>

      <MoviesCateLayout 
          catId="Phim Mới" 
          movies={homeData.comingSoon || []}
        />
        <MovieCardsClip />
      </section>
  </>
  );
}
