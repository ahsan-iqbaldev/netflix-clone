"use client";

import React, { useState } from "react";
import { movies } from "../../context/index";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import InfoModal from "./InfoModal";
import Link from "next/link";

const Billboard = () => {
  const [isOpen, setisOpen] = useState(false);
  const onClose = () => {
    setisOpen(!isOpen);
  };
  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={movies[0]?.thumbnailUrl}
        src={movies[0]?.videoUrl}
        autoPlay
        muted
        loop
        className="w-100 h-[56.25vw] object-cover brightness-[60%]"
      ></video>
      <div className="absolute top[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movies[0]?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {movies[0]?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <Link href='/watch'>
          <button className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition gap-1">
            <FaPlay className="mr-1" />
            Play
          </button>
          </Link>
          <button
            onClick={() => setisOpen(true)}
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition gap-1"
          >
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
      <InfoModal visible={isOpen} onClose={onClose} />
    </div>
  );
};

export default Billboard;
