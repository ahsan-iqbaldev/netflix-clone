"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 

const Page = () => { 
  const router = useRouter();
  const dispatch = useDispatch(); 
  const { user } = useSelector((state: RootState) => state.auth);

  const handleHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (user == null) {
      router.push("/authentication");
    }
  }, [router, user]); 

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is Watching
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div className="group flex-row w-44 mx-auto">
              <div
                onClick={handleHome}
                className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden"
              >
                <img src="/images/profile.jpg" alt="profile" />
              </div>
              <div className="mt-4 capitalize text-gray-400 text-2xl text-center group-hover:text-white">
                {user?.userName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
