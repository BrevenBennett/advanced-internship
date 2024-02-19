import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRegStar,
  FaRegClock,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SlBookOpen } from "react-icons/sl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { openLoginModal } from "@/redux/modalSlice";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import { updateSubscription } from "@/redux/userSlice";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";

export function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

export default function Book({ id }: { id: string }) {
  const app = initFirebase();
  const auth = getAuth(app);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const subscriptionStatus = useSelector(
    (state: RootState) => state.user.subscriptionStatus
  );
  const loggedIn = user.email;

  const [bookData, setBookData] = useState<any>({});
  const [libraryText, setLibraryText] = useState("Add title to My Library");
  const [clicked, setClicked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [audioDurations, setAudioDurations] = useState<{
    [key: string]: number;
  }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  async function fetchBookData() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setBookData(data);
    } catch (error) {
      console.error("Oh no!", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const checkPremium = async () => {
    const newPremiumStatus = auth.currentUser
      ? await getPremiumStatus(app)
      : "Basic";
    dispatch(updateSubscription({ subscriptionStatus: newPremiumStatus }));
  };

  useEffect(() => {
    checkPremium();
    fetchBookData();
  }, [app, auth.currentUser?.uid]);

  function addTitleToLibrary() {
    if (!loggedIn) {
      dispatch(openLoginModal());
    } else if (libraryText === "Add title to My Library") {
      setLibraryText("Saved in My Library");
      setClicked(false);
    } else {
      setLibraryText("Add title to My Library");
      setClicked(true);
    }
  }

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

      for (const book of bookData) {
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
    if (bookData.length > 0) {
      fetchAudioDurations();
    }
  }, [bookData]);

  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            {isLoading ? (
              <div className="id__wrapper">
                <div className="id__book">
                  <Skeleton width="300px" height="40px" />
                  <br />
                  <br />
                  <Skeleton width="100px" height="20px" />
                  <br />
                  <br />
                  <Skeleton width="80%" height="40px" />
                  <br />
                  <br />
                  <Skeleton width="90%" height="60px" />
                  <br />
                  <br />
                  <Skeleton width="60%" height="60px" />
                  <br />
                  <br />
                  <Skeleton width="40%" height="50px" />
                  <br />
                  <br />
                  <Skeleton width="65%" height="80px" />
                  <br />
                  <br />
                  <Skeleton width="100%" height="200px" />
                  <br />
                  <br />
                  <Skeleton width="100%" height="200px" />
                </div>

                <figure className="id-book__image--wrapper">
                  <Skeleton width="100%" height="100%" />
                </figure>
              </div>
            ) : (
              <div className="id__wrapper">
                <div className="id__book">
                  <div className="id-book__title">
                    {bookData.subscriptionRequired &&
                    subscriptionStatus === "Basic"
                      ? bookData.title + " (Premium)"
                      : bookData.title}
                  </div>
                  <div className="id-book__author">{bookData.author}</div>
                  <div className="id-book__subtitle">{bookData.subTitle}</div>
                  <div className="id-book__wrapper">
                    <div className="id-book__description-wrapper">
                      <div className="details__wrapper">
                        <FaRegStar className="detail__icon" />
                        <div className="detail rating">
                          {bookData.averageRating}
                        </div>
                        <div className=" detail total__rating">
                          ({bookData.totalRating} ratings)
                        </div>
                      </div>
                      {audioRefs && (
                        <audio
                          src={bookData?.audioLink}
                          ref={(audioRef) =>
                            (audioRefs.current[bookData.id] = audioRef)
                          }
                          onLoadedMetadata={() => onLoadedMetaData(bookData.id)}
                        />
                      )}
                      <div className="details__wrapper">
                        <FaRegClock className="detail__icon" />
                        <div className="detail">{formatTime(audioDurations[bookData.id] || 0)}</div>
                      </div>
                      <div className="details__wrapper">
                        <HiOutlineMicrophone className="detail__icon" />
                        <div className="detail">{bookData.type}</div>
                      </div>
                      <div className="details__wrapper">
                        <HiOutlineLightBulb className="detail__icon" />
                        <div className="detail">
                          {bookData.keyIdeas} Key Ideas
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button__wrapper">
                    {loggedIn ? (
                      bookData.subscriptionRequired ? (
                        subscriptionStatus === "Basic" ? (
                          <>
                            <Link href="/choose-plan">
                              <div className="button__items--wrapper">
                                <button className="id-book__btn">
                                  <SlBookOpen className="id-book__btn--icon" />{" "}
                                  Read
                                </button>
                              </div>
                            </Link>
                            <Link href="/choose-plan">
                              <div className="button__items--wrapper">
                                <button className="id-book__btn">
                                  <HiOutlineLightBulb className="id-book__btn--icon" />{" "}
                                  Listen
                                </button>
                              </div>
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link href={`/player/${id}`}>
                              <div className="button__items--wrapper">
                                <button className="id-book__btn">
                                  <SlBookOpen className="id-book__btn--icon" />{" "}
                                  Read
                                </button>
                              </div>
                            </Link>
                            <Link href={`/player/${id}`}>
                              <div className="button__items--wrapper">
                                <button className="id-book__btn">
                                  <HiOutlineMicrophone className="id-book__btn--icon" />{" "}
                                  Listen
                                </button>
                              </div>
                            </Link>
                          </>
                        )
                      ) : (
                        <>
                          <Link href={`/player/${id}`}>
                            <div className="button__items--wrapper">
                              <button className="id-book__btn">
                                <SlBookOpen className="id-book__btn--icon" />{" "}
                                Read
                              </button>
                            </div>
                          </Link>
                          <Link href={`/player/${id}`}>
                            <div className="button__items--wrapper">
                              <button className="id-book__btn">
                                <HiOutlineLightBulb className="id-book__btn--icon" />{" "}
                                Listen
                              </button>
                            </div>
                          </Link>
                        </>
                      )
                    ) : (
                      <>
                        <div className="button__items--wrapper">
                          <button
                            onClick={() => dispatch(openLoginModal())}
                            className="id-book__btn"
                          >
                            <SlBookOpen className="id-book__btn--icon" /> Read
                          </button>
                        </div>
                        <div className="button__items--wrapper">
                          <button
                            onClick={() => dispatch(openLoginModal())}
                            className="id-book__btn"
                          >
                            <HiOutlineMicrophone className="id-book__btn--icon" />{" "}
                            Listen
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    onClick={addTitleToLibrary}
                    className="id__book--bookmark"
                  >
                    {clicked ? (
                      <FaRegBookmark className="bookmark--icon" />
                    ) : (
                      <FaBookmark className="bookmark--icon" />
                    )}
                    <div className="bookmark__text">{libraryText}</div>
                  </div>
                  <div className="id__book--secondary-title">
                    What's it about?
                  </div>
                  <div className="id__book--tags-wrapper">
                    {bookData.tags?.map((tag: string, _: any) => (
                      <div key={_} className="id__book--tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="id__book--para">
                    {bookData.bookDescription}
                  </div>
                  <div className="id__book--secondary-title">
                    About the author
                  </div>
                  <div className="id__book--para">
                    {bookData.authorDescription}
                  </div>
                </div>

                <figure className="id-book__image--wrapper">
                  <img
                    src={bookData.imageLink}
                    alt=""
                    className="book__image"
                  />
                </figure>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
