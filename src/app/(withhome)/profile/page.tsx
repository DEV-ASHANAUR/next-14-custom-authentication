"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      console.log("hello");
      try {
        setLoading(true);
        const res = await axios.get("api/users/me");
        console.log("res", res);
        setUser(res?.data?.data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  if (loading) {
    return (
      <h1 className="flex justify-center items-center h-screen">loading..</h1>
    );
  }
  return (
    <div className="lg:container mx-auto px-2">
      <h1 className="text-center pt-20 text-3xl capitalize">
        Welcome {user?.username}
      </h1>
      <h1 className="text-center py-4 text-3xl">{user?.email}</h1>
    </div>
  );
}
