import React from "react";

export default function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}: {
  progressBarRef: any;
  audioRef: any;
  timeProgress: any;
  duration: any;
}) {

  function handleProgressChange() {
    audioRef.current.currentTime = progressBarRef.current.value;
  }

  function formatTime(time: any) {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="player__progress--wrapper">
      <div className="audio__time">{formatTime(timeProgress)}</div>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue={0}
        onChange={handleProgressChange}
      />
      <div className="audio__time">{formatTime(duration)}</div>
    </div>
  );
}
