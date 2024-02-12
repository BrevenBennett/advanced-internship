import Player from "@/components/audio-player/Player";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

export default function PlayerId({ id }: { id: string }) {
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
      <Sidebar />
      <Player id={id} />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="player__summary--inner-container">
              <div className="id-book__title id-player__title">
                {bookData.title}
              </div>
              <div className="id__book--para space">{bookData.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
