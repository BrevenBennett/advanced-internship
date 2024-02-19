import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { GoClock } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Skeleton from "./Skeleton";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<FormDataEntryValue | null>("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [audioDurations, setAudioDurations] = useState<{
    [key: string]: number;
  }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchTerm(formData.get("search"));
    e.target.reset();
    e.target.focus();
  };

  function menuOpen() {
    document.body.classList.add("menu--open");
  }

  function menuClose() {
    document.body.classList.remove("menu--open");
  }

  useEffect(() => {
    const search = async () => {
      let results = [];
      if (debouncedSearchTerm) {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedSearchTerm}`
        );
        results = data || [];
      }

      setResults(results);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    search();
  }, [debouncedSearchTerm]);

  const formatTime = (duration: number) => {
    if (duration && !isNaN(duration)) {
      const minutes = Math.floor(duration / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onLoadedMetaData = (id: any) => {
    const seconds = audioRefs.current[id]?.duration || 0;
    setAudioDurations((prevDurations) => ({ ...prevDurations, [id]: seconds }));
  };

  const fetchAudioDurations = async () => {
    try {
      const durations: { [key: string]: number } = {};

      for (const book of results) {
        if (book.audioLink) {
          const audio = new Audio(book.audioLink);
          await new Promise<void>((resolve, reject) => {
            audio.addEventListener("loadedmetadata", () => {
              durations[book.id] = audio.duration;
              resolve();
            });
            audio.addEventListener("error", reject);
            audio.load();
          });
        }
      }

      setAudioDurations(durations);
    } catch (error) {
      console.error("Couldn't find audio durations:", error);
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      fetchAudioDurations();
    }
  }, [results]);

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="searchbar__wrapper">
        <input
          onChange={handleChange}
          className="search__input"
          name="search"
          placeholder="Search for books"
        />
        <button
          onClick={() => setIsSearching(false)}
          className="search__icon"
          type="submit"
        >
          {searchTerm && isSearching ? <IoCloseSharp /> : <IoIosSearch />}
        </button>
        {searchTerm && isSearching && (
          <div className="search__books--wrapper">
            {results.length > 0 ? (
              isLoading ? (
                <>
                  <Skeleton
                    className="search__book--link"
                    width="100%"
                    height="120px"
                  />
                  <br />
                  <Skeleton
                    className="search__book--link"
                    width="100%"
                    height="120px"
                  />
                  <br />
                  <Skeleton
                    className="search__book--link"
                    width="100%"
                    height="120px"
                  />
                  <br />
                  <Skeleton
                    className="search__book--link"
                    width="100%"
                    height="120px"
                  />
                  <br />
                  <Skeleton
                    className="search__book--link"
                    width="100%"
                    height="120px"
                  />
                </>
              ) : (
                results.map((result: any) => (
                  <Link
                    key={result.id}
                    href={`/book/${result.id}`}
                    className="search__book--link"
                  >
                    {audioRefs && (
                      <audio
                        src={result?.audioLink}
                        ref={(audioRef) =>
                          (audioRefs.current[result.id] = audioRef)
                        }
                        onLoadedMetadata={() => onLoadedMetaData(result.id)}
                      />
                    )}
                    <figure className="search-book__image--wrapper">
                      <img
                        src={result.imageLink}
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div>
                      <div className="search__book--title">{result.title}</div>
                      <div className="search__book--author">
                        {result.author}
                      </div>
                      <div className="recommended__books--details">
                        <GoClock className="recommended__books--details-icon" />
                        <div className="recommended__books--details-text">
                          {formatTime(audioDurations[result.id] || 0)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )
            ) : (
              <div>No Books Found</div>
            )}
          </div>
        )}
      </form>
      <button onClick={menuOpen} className="btn__menu">
        <RxHamburgerMenu className="burger__menu---icon" />
      </button>

      <Sidebar className="menu__backdrop" onClick={menuClose}>
        <button onClick={menuClose} className="btn__menu--close">
          <FaTimes className="burger__menu--icon" />
        </button>
      </Sidebar>
    </div>
  );
}
