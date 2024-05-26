"use client";

import Forward from "@/components/icons/Forward";
import Play from "@/components/icons/Play";
import Previous from "@/components/icons/Previous";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);
  const diskStyle = active ? "animate-spin-slow" : "";
  return (
    <main className="flex min-h-screen bg-[#ddd]">
      <div className="flex flex-col text-black justify-center mx-auto p-2 relative">
        <div className="bg-black my-0 mx-4 pt-1 pr-4 pb-1 pl-36 rounded-t-2xl">
          <div className="text-white font-bold text-lg">song</div>
          <div className="text-[#777] text-sm mx-0 mt-1 mb-5">artist</div>
          <div className="bg-[#555] rounded-3xl cursor-pointer">
            <div className="h-1 rounded-3xl w-0 bg-green-600"></div>
          </div>
          <div className="text-[#777] text-base my-1">0:00 - 0:00</div>
        </div>
        <div className="max-w-36">
          <div className="absolute h-5 w-5 bg-white rounded-full top-36 left-20 z-10"></div>
          <div
            className={`absolute h-36 w-36 top-20 left-4 bg-[url('/salamin.jpg')] bg-no-repeat bg-cover bg-bottom border-2 border-white rounded-full shadow-disc transition-all ease-in-out duration-200 ${diskStyle}`}
          ></div>
        </div>
        <div className="flex flex-row justify-center items-center bg-[#333] gap-2 w-96 h-20 rounded-[18px]">
          <span>
            <Previous />
          </span>
          <span className="bg-green-700 text-white p-4 rounded-full transition-all ease-in duration-300">
            <Play />
          </span>
          <span>
            <Forward />
          </span>
        </div>
      </div>
    </main>
  );
}
