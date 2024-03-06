"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";

const Navbar = ({ token }: any) => {
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className=" lg:container mx-auto flex justify-between items-center px-3 rounded">

      <Link href="/home">Brand Logo</Link>
      <ul className="flex space-x-5 items-center py-4">
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        {token?.value ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-800 hover:bg-red-900 px-3 py-2 rounded"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              className="bg-blue-800 hover:blue-red-900 px-3 py-2 rounded"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
