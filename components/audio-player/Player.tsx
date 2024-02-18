import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DisplayBook from "./DisplayBook";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

export default function Player({ id }: { id: string }) {
  const [bookData, setBookData] = useState<any>({});
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef();
  const progressBarRef = useRef();

  async function fetchBookData() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setBookData(data);
    } catch (error) {
      console.error("Oh no!", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <>
      <div className="player__wrapper">
        <DisplayBook {...{ bookData, audioRef, setDuration, progressBarRef, isLoading }} />
        <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress }} />
        <ProgressBar {...{ audioRef, progressBarRef, timeProgress, duration}} />
      </div>
    </>
  );
}
