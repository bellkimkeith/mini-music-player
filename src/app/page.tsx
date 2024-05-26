"use client";

import Forward from "@/components/icons/Forward";
import Play from "@/components/icons/Play";
import Previous from "@/components/icons/Previous";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);
  const diskStyle = !active
    ? "h-6 w-6 rounded-full border border-black max-w-36"
    : "h-6 w-6 rounded-full border border-black max-w-36 animate-spin-slow";
  return (
    <main className="flex min-h-screen bg-[#ddd]">
      <div className="flex flex-col text-black justify-center mx-auto p-2">
        <div className="bg-black my-0 mx-4 pt-3 pr-3 pb-1 pl-36 rounded-t-2xl">
          <div className="text-white font-bold text-lg">song</div>
          <div className="text-[#777] text-sm mx-0 mt-1 mb-5">artist</div>
          <div className="bg-[#555] rounded-3xl cursor-pointer">
            <div className="h-1 rounded-3xl w-0 bg-green-600"></div>
          </div>
          <div className="text-[#777] text-base my-1">0:00 - 0:00</div>
        </div>
        <div className={diskStyle}>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="flex flex-row">
          <span>
            <Previous />
          </span>
          <span>
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
