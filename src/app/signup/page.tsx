"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", data);
      if (response.data) {
        toast.success(response.data.message);
        toast.success("Please verfy Email!");
      }
      reset();
      setTimeout(()=>{
        router.push('/login');
      },2000)
      console.log("response", response);
    } catch (error: any) {
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
        <h1 className="text-center text-3xl">
          {loading ? "Processing" : "Please SignUp"}
        </h1>
        <div>
          <label htmlFor="" className="block mb-1">
            Enter Username
          </label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min Length is 3" },
            })}
            placeholder="Enter user name"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.username && (
            <span className="error_message text-red-600" role="alert">
              {errors.username?.message as any}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="" className="block mb-1">
            Enter Email
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email!",
              },
            })}
            placeholder="Enter user email"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email && (
            <span className="error_message text-red-600" role="alert">
              {errors.email?.message as any}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="" className="block mb-1">
            Enter Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "pasword is required",
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
        <div>
          <label htmlFor="" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password,
            })}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Confirm password"
          />
          {errors.confirmPassword?.type === "required" && (
            <span className="error_message text-red-600" role="alert">
              Confirm password is required
            </span>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <span className="error_message text-red-600" role="alert">
              Passwords must match
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <button className="bg-blue-900 py-2 rounded-lg text-white hover:bg-blue-800 transition-all duration-100">
          signup
        </button>
      </form>
      <Toaster />
    </main>
  );
};

export default SignupPage;
