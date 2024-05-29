"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FavoriteButton from "./FavoriteButton";
import { movies } from "../../context/index";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setisVisible] = useState(!!visible);

  useEffect(() => {
    setisVisible(!!visible);
  }, [visible]);

  const handleClose = () => {
    setisVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!visible) {
    return null;
  }
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={movies[0]?.thumbnailUrl}
              src={movies[0]?.videoUrl}
            ></video>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movies[0]?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
              <Link href='/watch'>
                <button className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition gap-1">
                  <FaPlay className="mr-1" />
                  Play
                </button>
                </Link>
                <FavoriteButton />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{movies[0]?.duration}</p>
            <p className="text-white text-lg">Enjoy</p>
            <p className="text-white text-lg">{movies[0]?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
