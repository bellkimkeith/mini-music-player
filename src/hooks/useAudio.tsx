"use client";

import { useRef } from "react";

export const useAudio = () => {
  const audio = useRef(new Audio());

  return { audio };
};
