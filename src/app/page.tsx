"use client";

import Forward from "@/components/icons/Forward";
import Pause from "@/components/icons/Pause";
import Play from "@/components/icons/Play";
import Previous from "@/components/icons/Previous";
import { useAudio } from "@/hooks/useAudio";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SONGDATA = [
  {
    id: 1,
    title: "Salamin, Salamin",
    artist: "BINI",
    src: "/audios/salamin.mp3",
    cover: "/images/salamin.webp",
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
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [cover, setCover] = useState<string>("");
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>("0:00 - 0:00");
  const discStyle = active ? "animate-spin-slow" : "";
  // const { audio } = useAudio();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const playPrevNext = useCallback(
    (songNumber: number) => {
      if (audio) {
        const song = SONGDATA[songNumber];
        audio.src = song.src;
        setTitle(song.title);
        setArtist(song.artist);
        setCover(song.cover);
        audio.play();
        setActive(true);
      }
    },
    [audio]
  );

  const prev = () => {
    let songNumber = SONGDATA.findIndex((item) => item.id === song.id);
    songNumber = (songNumber + 1) % SONGDATA.length;
    songNumber = (songNumber - 1 + SONGDATA.length) % SONGDATA.length;
    playPrevNext(songNumber);
  };
  const next = useCallback(() => {
    let songNumber = SONGDATA.findIndex((item) => item.id === song.id);
    songNumber = (songNumber + 1) % SONGDATA.length;
    playPrevNext(songNumber);
  }, [playPrevNext, song]);

  const updateProgress = useCallback(() => {
    if (audio && audio.duration) {
      setPosition(
        ((audio.currentTime / audio.duration) * 100).toFixed(0) + "%"
      );
      const duration = formatTime(audio.duration);
      const currentTime = formatTime(audio.currentTime);

      setTime(`${currentTime} - ${duration}`);
    }
  }, [audio]);

  const loadSong = useCallback(() => {
    if (audio) {
      setTitle(song.title);
      setArtist(song.artist);
      setCover(song.cover);
      audio.src = song.src;
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", next);
    }
  }, [song, audio, next, updateProgress]);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    loadSong();
  }, [loadSong]);

  const toggle = () => {
    if (audio) {
      if (active) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    setActive(!active);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // todo: Seek functionality refactor next and prev

  return (
    <main className="flex min-h-screen bg-[#222831]">
      <div className="flex flex-col text-black justify-center mx-auto p-2 relative">
        <div className="bg-black my-0 mx-4 pt-1 pr-4 pb-1 pl-36 rounded-t-2xl">
          <div className="text-white font-bold text-lg">{title}</div>
          <div className="text-[#777] text-sm mx-0 mt-1 mb-5">{artist}</div>
          <div className={`bg-[#555] rounded-3xl`}>
            <div
              style={{ width: position }}
              className={`fill-bar h-1 rounded-3xl bg-green-600 w-[0%]`}
            ></div>
          </div>
          <div className="text-[#777] text-base my-1">{time}</div>
        </div>
        <div className="max-w-36">
          <div className="absolute h-5 w-5 bg-white rounded-full top-[44%] left-20 z-10"></div>
          <Image
            src={cover}
            alt="Song cover"
            width={145}
            height={145}
            quality={100}
            priority={true}
            className={`absolute h-36 w-36 top-[36%] left-4 border-2 border-white rounded-full transition-all ease-in-out duration-200 bg-cover ${discStyle}`}
          />
        </div>
        <div className="flex flex-row justify-center items-center bg-[#111] gap-2 w-96 h-20 rounded-[18px]">
          <span
            onClick={prev}
            className="text-[#888] transition-all ease-in duration-300 hover:text-white cursor-pointer"
          >
            <Previous />
          </span>
          <span
            onClick={() => {
              toggle();
              setActive(!active);
            }}
            className="bg-green-700 text-white p-4 rounded-full transition-all ease-in duration-300 hover:bg-green-600 cursor-pointer"
          >
            {active ? <Pause /> : <Play />}
          </span>
          <span
            onClick={next}
            className="text-[#888] transition-all ease-in duration-300 hover:text-white cursor-pointer"
          >
            <Forward />
          </span>
        </div>
      </div>
    </main>
  );
}
