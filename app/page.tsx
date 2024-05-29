"use client";

import Billboard from "./components/Billboard";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import { movies } from "../context/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user == null) {
      return redirect("/authentication");
    }
  }, []);
  return (
    <>
    {}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={movies} title="Netflix Special" />
      </div>
    </>
  );
}
