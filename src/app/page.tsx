"use client";

import Forward from "@/components/icons/Forward";
import Pause from "@/components/icons/Pause";
import Play from "@/components/icons/Play";
import Previous from "@/components/icons/Previous";
import Repeat from "@/components/icons/Repeat";
import Shuffle from "@/components/icons/Shuffle";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Song = {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
};

const SONGDATA: Song[] = [
  {
    id: 1,
    title: "Beautiful Dream",
    artist: "Mixkit",
    src: "/audios/mixkit-beautiful-dream-493.mp3",
    cover: "/images/beautiful-dream.svg",
  },
  {
    id: 2,
    title: "Chill Bro",
    artist: "Mixkit",
    src: "/audios/mixkit-chill-bro-494.mp3",
    cover: "/images/chill-bro.svg",
  },
  {
    id: 3,
    title: "I'm Hungry",
    artist: "Mixkit",
    src: "/audios/mixkit-im-hungry-808.mp3",
    cover: "/images/im-hungry.svg",
  },
  {
    id: 4,
    title: "Latin Lovers",
    artist: "Mixkit",
    src: "/audios/mixkit-latin-lovers-39.mp3",
    cover: "/images/latin-lovers.svg",
  },
  {
    id: 5,
    title: "Lounging by Moonlight",
    artist: "Mixkit",
    src: "/audios/mixkit-lounging-by-moonlight-40.mp3",
    cover: "/images/lounging-by-moonlight.svg",
  },
  {
    id: 6,
    title: "Romantic",
    artist: "Mixkit",
    src: "/audios/mixkit-romantic-01-752.mp3",
    cover: "/images/romantic-01.svg",
  },
  {
    id: 7,
    title: "Romantic Vacation",
    artist: "Mixkit",
    src: "/audios/mixkit-romantic-vacation-89.mp3",
    cover: "/images/romantic-vacation.svg",
  },
  {
    id: 8,
    title: "Smooth Like Jazz",
    artist: "Mixkit",
    src: "/audios/mixkit-smooth-like-jazz-24.mp3",
    cover: "/images/smooth-like-jazz.svg",
  },
  {
    id: 9,
    title: "Soul Jazz",
    artist: "Mixkit",
    src: "/audios/mixkit-soul-jazz-652.mp3",
    cover: "/images/soul-jazz.svg",
  },
  {
    id: 10,
    title: "Upbeat Jazz",
    artist: "Mixkit",
    src: "/audios/mixkit-upbeat-jazz-644.mp3",
    cover: "/images/upbeat-jazz.svg",
  },
  {
    id: 11,
    title: "Winter Wind",
    artist: "Mixkit",
    src: "/audios/mixkit-winter-wind-502.mp3",
    cover: "/images/winter-wind.svg",
  },
  {
    id: 12,
    title: "You Got Jazz",
    artist: "Mixkit",
    src: "/audios/mixkit-you-got-jazz-528.mp3",
    cover: "/images/you-got-jazz.svg",
  },
];

export default function Home() {
  const [active, setActive] = useState(false);
  const [song, setSong] = useState<Song>(SONGDATA[0]);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [cover, setCover] = useState<string>("");
  const [position, setPosition] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>("00:00 - 00:00");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const shuffleRef = useRef(false);
  const repeatRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setDragging = (val: boolean) => {
    isDraggingRef.current = val;
    setIsDragging(val);
  };

  const playPrevNext = useCallback(
    (songNumber: number) => {
      if (audio) {
        const nextSong = SONGDATA[songNumber];
        currentIndexRef.current = songNumber;
        audio.src = nextSong.src;
        audio.load();
        setPosition("0%");
        setTime("00:00 - 00:00");
        setSong(nextSong);
        setTitle(nextSong.title);
        setArtist(nextSong.artist);
        setCover(nextSong.cover);
        audio.play().catch(console.error);
        setActive(true);
      }
    },
    [audio]
  );

  const prev = () => {
    const songNumber = (currentIndexRef.current - 1 + SONGDATA.length) % SONGDATA.length;
    playPrevNext(songNumber);
  };
  const next = useCallback(() => {
    let songNumber: number;
    if (shuffleRef.current) {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * SONGDATA.length);
      } while (randomIndex === currentIndexRef.current && SONGDATA.length > 1);
      songNumber = randomIndex;
    } else {
      songNumber = (currentIndexRef.current + 1) % SONGDATA.length;
    }
    playPrevNext(songNumber);
  }, [playPrevNext]);

  const updateProgress = useCallback(() => {
    if (audio && audio.duration && !isDraggingRef.current) {
      setPosition(
        ((audio.currentTime / audio.duration) * 100).toFixed(0) + "%"
      );
      setTime(`${formatTime(audio.currentTime)} - ${formatTime(audio.duration)}`);
    }
  }, [audio]);

  const handleEnded = useCallback(() => {
    if (repeatRef.current && audio) {
      audio.currentTime = 0;
      setPosition("0%");
      audio.play().catch(console.error);
    } else {
      next();
    }
  }, [audio, next]);

  const loadSong = useCallback(() => {
    if (audio) {
      audio.src = SONGDATA[0].src;
      setTitle(SONGDATA[0].title);
      setArtist(SONGDATA[0].artist);
      setCover(SONGDATA[0].cover);
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);
    }
  }, [audio, handleEnded, updateProgress]);

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

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const seek = useCallback((clientX: number) => {
    if (audio && progressRef.current && audio.duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      audio.currentTime = pct * audio.duration;
      setPosition((pct * 100).toFixed(0) + "%");
      setTime(`${formatTime(pct * audio.duration)} - ${formatTime(audio.duration)}`);
    }
  }, [audio]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    seek(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragging(true);
    seek(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => seek(e.clientX);
    const onMouseUp = () => setDragging(false);
    const onTouchMove = (e: TouchEvent) => seek(e.touches[0].clientX);
    const onTouchEnd = () => setDragging(false);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, seek]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0805]">

      {/* Ambient amber orbs */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-900/25 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-900/20 blur-[120px]" />
        <div
          className={`absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/15 blur-[80px] transition-opacity duration-700 ${
            active ? "opacity-100 animate-pulse-glow" : "opacity-30"
          }`}
        />
      </div>

      {/* Card wrapper — relative so vinyl can peek out */}
      <div className="relative z-10 w-[380px] animate-fade-in">

        {/* Vinyl record — floats behind and below the card */}
        <div className="absolute bottom-[-24px] right-[-18px] z-0 animate-float-vinyl opacity-75">
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="48" cy="48" r="47" fill="#150f08" stroke="rgba(201,169,110,0.18)" strokeWidth="1" />
            <circle cx="48" cy="48" r="41" fill="none" stroke="rgba(201,169,110,0.07)" strokeWidth="1" />
            <circle cx="48" cy="48" r="34" fill="none" stroke="rgba(201,169,110,0.07)" strokeWidth="1" />
            <circle cx="48" cy="48" r="27" fill="none" stroke="rgba(201,169,110,0.07)" strokeWidth="1" />
            <circle cx="48" cy="48" r="20" fill="none" stroke="rgba(201,169,110,0.07)" strokeWidth="1" />
            <circle cx="48" cy="48" r="13" fill="#c9a96e" opacity="0.88" />
            <circle cx="48" cy="48" r="4" fill="#0a0805" />
            <ellipse cx="44" cy="43" rx="4.5" ry="2.5" fill="white" opacity="0.14" transform="rotate(-20 44 43)" />
          </svg>
        </div>

        {/* Main card */}
        <div className="jazz-card relative z-10 rounded-3xl overflow-hidden">

          {/* Album art — full-width squircle */}
          <div className="p-4 pb-0">
            {cover ? (
              <Image
                key={`cover-${song.id}`}
                src={cover}
                alt={`${title} cover`}
                width={380}
                height={380}
                className="album-squircle w-full object-cover animate-fade-in"
              />
            ) : (
              <div className="album-squircle flex items-center justify-center">
                <svg className="h-20 w-20 text-white/10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                </svg>
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="px-6 pb-7 pt-4">

            {/* Track counter */}
            <p
              className="font-mono-time text-[10px] uppercase tracking-widest mb-1"
              style={{ color: "rgba(201,169,110,0.55)" }}
            >
              {song.id} / {SONGDATA.length}
            </p>

            {/* Title + waveform */}
            <div className="flex items-center gap-2.5 mb-0.5">
              <h1
                key={`title-${song.id}`}
                className="font-serif-title text-[1.35rem] font-semibold leading-snug truncate animate-fade-in"
                style={{ color: "var(--jazz-cream)" }}
              >
                {title ?? song.title}
              </h1>
              {active && (
                <div className="flex items-end gap-[3px] shrink-0 h-[14px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="waveform-bar" />
                  ))}
                </div>
              )}
            </div>

            {/* Artist */}
            <p
              key={`artist-${song.id}`}
              className="font-mono-time text-sm mb-5 animate-fade-in"
              style={{ color: "var(--jazz-muted)" }}
            >
              {artist ?? song.artist}
            </p>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="progress-track-wrapper">
                <div
                  ref={progressRef}
                  className={`progress-track ${isDragging ? "is-seeking" : ""}`}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div className="progress-fill" style={{ width: position ?? "0%" }} />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono-time text-[10px]" style={{ color: "var(--jazz-muted)" }}>
                  {time?.split(" - ")[0] ?? "00:00"}
                </span>
                <span className="font-mono-time text-[10px]" style={{ color: "var(--jazz-muted)" }}>
                  {time?.split(" - ")[1] ?? "00:00"}
                </span>
              </div>
            </div>

            {/* Controls — grid keeps play row perfectly centered */}
            <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center">
              {/* Left: shuffle */}
              <div className="flex justify-start pl-1">
                <span
                  onClick={() => setShuffle(!shuffle)}
                  className={`shuffle-btn ${shuffle ? "is-active" : ""}`}
                  role="button"
                  aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"}
                >
                  <Shuffle />
                </span>
              </div>

              {/* Center: prev / play / next */}
              <div className="flex items-center gap-5">
                <span onClick={prev} className="control-btn" role="button" aria-label="Previous track">
                  <Previous />
                </span>

                <div className="relative">
                  {active && <span className="pulse-ring" aria-hidden="true" />}
                  <span
                    onClick={toggle}
                    className="play-btn"
                    role="button"
                    aria-label={active ? "Pause" : "Play"}
                  >
                    {active ? <Pause /> : <Play />}
                  </span>
                </div>

                <span onClick={next} className="control-btn" role="button" aria-label="Next track">
                  <Forward />
                </span>
              </div>

              {/* Right: repeat */}
              <div className="flex justify-end pr-1">
                <span
                  onClick={() => setRepeat(!repeat)}
                  className={`shuffle-btn ${repeat ? "is-active" : ""}`}
                  role="button"
                  aria-label={repeat ? "Disable repeat" : "Enable repeat"}
                >
                  <Repeat />
                </span>
              </div>
            </div>

            {/* Song indicator lines */}
            <div className="flex items-center justify-center gap-1.5">
              {SONGDATA.map((s) => (
                <div
                  key={s.id}
                  className={`song-indicator-line ${s.id === song.id ? "active" : ""}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
