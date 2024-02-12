import React from "react";

export default function DisplayBook({
  bookData,
  audioRef,
  setDuration,
  progressBarRef,
}: {
  bookData: any;
  audioRef: any;
  setDuration: any;
  progressBarRef: any;
}) {
  function onLoadedMetaData() {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <div className="book__info--wrapper">
      <figure className="player-book__img--mask">
        <img src={bookData.imageLink} className="book__image"></img>
      </figure>
      <div className="player-book__details">
        <audio
          src={bookData.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetaData}
        />
        <div className="player-book__title">{bookData.title}</div>
        <div className="player-book__author">{bookData.author}</div>
      </div>
    </div>
  );
}
