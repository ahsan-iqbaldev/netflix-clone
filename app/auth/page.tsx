"use client";

import React, { useState } from "react";
import Input from "../components/Input";

const Page = () => {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const [variant, setVarient] = useState("login");

  const togglevariant = () => {
    setVarient((currVarient) =>
      currVarient === "login" ? "register" : "login"
    );
  };
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant == "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  id="username"
                  onChange={(val: any) => setusername(val.target.value)}
                  value={username}
                  label="Username"
                  type="text"
                />
              )}
              <Input
                id="email"
                onChange={(val: any) => setemail(val.target.value)}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(val: any) => setpassword(val.target.value)}
                value={password}
                label="Password"
                type="password"
              />
            </div>
            <button className="bg-red-600  py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant == "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? (
                <>
                  First time using Netflix?
                  <span
                    onClick={togglevariant}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    Create an account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?
                  <span
                    onClick={togglevariant}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
