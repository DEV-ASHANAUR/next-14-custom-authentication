"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmailPage = () => {
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

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/verifyemail", { id, token });
      toast.success(response?.data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.log("error", error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
      console.log(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col space-y-6 bg-slate-800 h-screen text-white">
        <button
          className="bg-blue-900 py-2 px-8 rounded-lg text-white hover:bg-blue-800 transition-all duration-100"
          onClick={verifyEmail}
        >
          {loading ? "Processing.." : "Click-Verify"}
        </button>
        <Link
          href="/login"
          className="bg-red-900 py-2 px-8 rounded-lg text-white hover:bg-red-800 transition-all duration-100"
        >
          Login
        </Link>
      </div>
      <Toaster />
    </>
  );
};

export default VerifyEmailPage;
