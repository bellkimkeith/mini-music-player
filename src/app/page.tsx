"use client";

import Forward from "@/components/icons/Forward";
import Pause from "@/components/icons/Pause";
import Play from "@/components/icons/Play";
import Previous from "@/components/icons/Previous";
import { useCallback, useEffect, useMemo, useState } from "react";

const SONGDATA = [
  {
    id: 1,
    title: "Salamin, Salamin",
    artist: "BINI",
    src: "/audios/salamin.mp3",
    cover: "/images/salamin.jpg",
  },
  {
    id: 2,
    title: "Pantropiko",
    artist: "BINI",
    src: "/audios/pantropiko.mp3",
    cover: "/images/pantropiko.jpeg",
  },
];

type Song = {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

export default function Home() {
  const [active, setActive] = useState(false);
  const [song, setSong] = useState<Song>(SONGDATA[0]);
  const [audio, setAudio] = useState<string>("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [cover, setCover] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const discStyle = active ? "animate-spin-slow" : "";

  let currentSong = useMemo(() => new Audio(), []);

  const loadSong = useCallback(() => {
    currentSong.src = audio;
    setAudio(song.src);
    setTitle(song.title);
    setArtist(song.artist);
    setCover("bg-[url('" + song.cover + "')]");
  }, [song, audio, currentSong]);

  useEffect(() => {
    loadSong();
  }, [loadSong]);

  useEffect(() => {
    loadSong();
  }, [song, loadSong]);

  const timeUpdate = () => {};
  const prev = () => {};
  const next = () => {};
  const toggle = () => {
    if (active) {
      currentSong.pause();
    } else {
      currentSong.play();
    }

    setActive(!active);
  };
  const seek = () => {};
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const updateProgress = () => {
    if (currentSong.duration) {
      setPosition(
        (
          "w-[" +
          (currentSong.currentTime / currentSong.duration) * 100
        ).toString() + "%]"
      );
      const duration = formatTime(currentSong.duration);
      const currentTime = formatTime(currentSong.currentTime);

      setTime(`${currentTime} - ${duration}`);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#ddd]">
      <div className="flex flex-col text-black justify-center mx-auto p-2 relative">
        <div className="bg-black my-0 mx-4 pt-1 pr-4 pb-1 pl-36 rounded-t-2xl">
          <div className="text-white font-bold text-lg">{title}</div>
          <div className="text-[#777] text-sm mx-0 mt-1 mb-5">{artist}</div>
          <div className="bg-[#555] rounded-3xl cursor-pointer">
            <div className={`h-1 rounded-3xl bg-green-600 w-0`}></div>
          </div>
          <div className="text-[#777] text-base my-1">0:00 - 0:00</div>
        </div>
        <div className="max-w-36">
          <div className="absolute h-5 w-5 bg-white rounded-full top-[44%] left-20 z-10"></div>
          <div
            className={
              `absolute h-36 w-36 top-[36%] left-4 bg-[url('/images/salamin.jpg')] bg-no-repeat bg-cover bg-bottom border-2 border-white rounded-full shadow-disc transition-all ease-in-out duration-200 ${discStyle} ` +
              cover
            }
          ></div>
        </div>
        <div className="flex flex-row justify-center items-center bg-[#333] gap-2 w-96 h-20 rounded-[18px]">
          <span className="text-[#888] transition-all ease-in duration-300 hover:text-white">
            <Previous />
          </span>
          <span
            onClick={() => {
              toggle();
              setActive(!active);
            }}
            className="bg-green-700 text-white p-4 rounded-full transition-all ease-in duration-300 hover:bg-green-800"
          >
            {active ? <Pause /> : <Play />}
          </span>
          <span className="text-[#888] transition-all ease-in duration-300 hover:text-white">
            <Forward />
          </span>
        </div>
      </div>
    </main>
  );
}
