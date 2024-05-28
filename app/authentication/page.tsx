"use client";

import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/Slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter()
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [variant, setVarient] = useState("login");

  const togglevariant = () => {
    setVarient((currVarient) =>
      currVarient === "login" ? "register" : "login"
    );
  };

  const register = () => {
    const payload = {
      email,
      name,
      password,
    };

    dispatch(
      registerUser({
        payload,
        onSuccess: () => {
          toast.success("Register Sucessfully")
          setVarient("login");
          setemail("");
          setName("");
          setpassword("");
        },
      })
    );

    console.log(payload, "payload");
  };

  const login = () => {
    const payload = {
      email,
      password,
    };

    dispatch(
      loginUser({
        payload,
        onSuccess: () => {
          toast.success("Login Sucessfully")
          router.push("/profile");
        },
      })
    );

    console.log(payload, "payload");
  };

  useEffect(() => {
    if (user != null) {
      return redirect("/");
    }
  }, []);

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
                  id="name"
                  onChange={(val: any) => setName(val.target.value)}
                  value={name}
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
            <button
              disabled={loading}
              onClick={variant == "login" ? login : register}
              className="bg-red-600  py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant == "login" ? "Login" : "Sign Up"}
              {loading && "...."}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-6">
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
