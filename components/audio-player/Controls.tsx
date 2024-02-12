import React, { useEffect, useRef, useState, useCallback } from "react";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
}: {
  audioRef: any;
  progressBarRef: any;
  duration: any;
  setTimeProgress: any;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef: any = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  function togglePlayPause() {
    setIsPlaying((prev) => !prev);
  }

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  return (
    <div className="player__controls">
      <button className="skip" onClick={skipBackward}>
        <TbRewindBackward10 />
      </button>

      <button className="toggle" onClick={togglePlayPause}>
        {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
      </button>

      <button className="skip" onClick={skipForward}>
        <TbRewindForward10 />
      </button>
    </div>
  );
}
