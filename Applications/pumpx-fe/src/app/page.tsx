"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const handleAddUser = async () => {
    await axios.post("https://api-pumpx.up.railway.app/users", {
      name: "John Doe",
      email: "2r6tR@example.com",
    });

    getUser();
  };

  const getUser = async () => {
    const res = await fetch("https://api-pumpx.up.railway.app/users");
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add user
        </button>

        {data.map((user: { name: string; email: string }) => (
          <div key={user.name} className="px-4 border">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-lg font-bold">{user.email}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
