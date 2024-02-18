import React from "react";
import Skeleton from "../Skeleton";

export default function DisplayBook({
  bookData,
  audioRef,
  setDuration,
  progressBarRef,
  isLoading,
}: {
  bookData: any;
  audioRef: any;
  setDuration: any;
  progressBarRef: any;
  isLoading: any;
}) {
  function onLoadedMetaData() {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  }

  return (
    <>
      {isLoading ? (
        <div className="book__info--wrapper">
          <figure className="player-book__img--mask">
            <Skeleton width="100%" height="100%" />
          </figure>
          <div className="player-book__details">
            <Skeleton width="100px" height="10px" />
            <br />
            <Skeleton width="60px" height="10px" />
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
