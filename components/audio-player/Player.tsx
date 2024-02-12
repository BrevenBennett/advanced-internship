import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaCirclePlay } from "react-icons/fa6";

export default function Player({ id }: { id: string }) {
  const [bookData, setBookData] = useState<any>({});

  async function fetchBookData() {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setBookData(data);
    } catch (error) {
      console.error("Oh no!", error);
    }
  }

  useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <>
      <div className="player__wrapper">
        <div className="book__info--wrapper">
          <figure className="player-book__img--mask">
            <img src={bookData.imageLink} className="book__image"></img>
          </figure>
          <div className="player-book__details">
            <div className="player-book__title">{bookData.title}</div>
            <div className="player-book__author">{bookData.author}</div>
          </div>
        </div>
        <div className="player__controls">
          <TbRewindBackward10 />
          <FaCirclePlay />
          <TbRewindForward10 />
        </div>
        <div className="player__progress--wrapper">
            <div className="audio__time"></div>
            <input className="audio__bar" type="text" />
            <div className="audio__time"></div>
        </div>
      </div>
    </>
  );
}
