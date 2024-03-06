/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Update import
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const ResetPage = () => {
  const router = useRouter();
  const [id, setId] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setId(
      typeof window !== "undefined"
        ? window.location.search.split("=")[1].split("&")[0]
        : null
    );
    setToken(
      typeof window !== "undefined"
        ? window.location.search.split("=")[2]
        : null
    );
  }, []);

  // if (!id && !token) return null;

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    const data = { password: values.password, id, token };
    try {
      setLoading(true);
      const response = await axios.post("/api/users/reset-password", data); // Update API endpoint
      if (response.data) {
        toast.success(response.data.message);
      }
      reset();
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log("response", response);
    } catch (error:any) {
      console.log("error", error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
      console.log(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-20 lg:p-24 bg-slate-800 h-full text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-sky-500 p-8 flex flex-col space-y-4 rounded-lg "
      >
        <h1 className="text-center text-2xl">
          {loading ? "Processing" : "Reset Password"}
        </h1>
        <div>
          <label htmlFor="" className="block mb-1">
            Enter New Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="error_message text-red-600" role="alert">
              {errors.password?.message as any}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
        <button className="bg-blue-900 py-2 rounded-lg text-white hover:bg-blue-800 transition-all duration-100">
          Update
        </button>
      </form>
      <Toaster />
    </main>
  );
};

export default ResetPage;
