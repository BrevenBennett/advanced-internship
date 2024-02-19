import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { GoClock } from "react-icons/go";
import { FaRegStar, FaPlayCircle } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { updateSubscription } from "@/redux/userSlice";
import Skeleton from "@/components/Skeleton";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function ForYouPage() {
  const app = initFirebase();
  const auth = getAuth(app);

  const [selectedBook, setSelectedBook] = useState<Book[]>([]);
  const [recommendedBook, setRecommendedBook] = useState<Book[]>([]);
  const [suggestedBook, setSuggestedBook] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioDurations, setAudioDurations] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(
    (state: RootState) => state.user.subscriptionStatus
  );

  const checkPremium = async () => {
    const newPremiumStatus = auth.currentUser
      ? await getPremiumStatus(app)
      : "Basic";
    dispatch(updateSubscription({ subscriptionStatus: newPremiumStatus }));
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        setIsLoading(true);
        const [selectedResponse, recommendedResponse, suggestedResponse] =
          await Promise.all([
            axios.get(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
            ),
            axios.get(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
            ),
            axios.get(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
            ),
          ]);

        setSelectedBook(selectedResponse.data);
        setRecommendedBook(recommendedResponse.data);
        setSuggestedBook(suggestedResponse.data);
      } catch (error) {
        console.error("Couldn't load books", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }

    checkPremium();
    fetchBooks();
  }, [app, auth.currentUser?.uid]);

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
  
      for (const book of selectedBook) {
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
    if (selectedBook.length > 0) {
      fetchAudioDurations();
    }
  }, [selectedBook]);

  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="for-you__wrapper">
              <h1 className="for-you__title">Selected Just For You</h1>
              {isLoading ? (
                <Skeleton width="100%" height="190px" borderRadius="10px" />
              ) : (
                selectedBook.map((book: any) => (
                  <a
                    key={book.id}
                    href={`/book/${book.id}`}
                    className="selected__book"
                  >
                    <div className="selected__book--subtitle">
                      {book.subTitle}
                    </div>
                    <div className="selected__book--line"></div>
                    <div className="selected__book--content">
                      <figure className="book__image--wrapper book__image--selected">
                        {isLoading ? (
                          <Skeleton
                            width="90%"
                            height="100%"
                            borderRadius={5}
                          />
                        ) : (
                          <img
                            src={book.imageLink}
                            alt=""
                            className="book__image"
                          />
                        )}
                      </figure>
                      <div className="selected__book--description">
                        <div className="selected__book--title">
                          {book.title}
                        </div>
                        <div className="selected__book--author">
                          {book.author}
                        </div>
                        <div className="selected__book--duration-wrapper">
                          <FaPlayCircle className="selected__book--icon" />
                          <div className="selected__book--duration">
                            3 mins 23 secs
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              )}

              <section id="recommended__books">
                <h1 className="for-you__title">Recommended For You</h1>
                <h3 className="for-you__sub-title">
                  We think you'll like these
                </h3>
                <div className="for-you__recommended--books">
                  {isLoading
                    ? new Array(8).fill(0).map((_, index) => (
                        <div key={index}>
                          <figure className="book__image--wrapper">
                            <Skeleton
                              width="100%"
                              height="100%"
                              borderRadius={5}
                            />
                          </figure>
                          <div className="recommended__book--title">
                            <Skeleton width="100%" height="28px" />
                          </div>
                          <div className="recommended__book--author">
                            <Skeleton width="50%" height="12px" />
                          </div>
                          <div className="recommended__book--sub-title">
                            <Skeleton width="90%" height="16px" />
                          </div>
                          <div className="recommended__books--details-wrapper">
                            <Skeleton width="85%" height="16px" />
                          </div>
                        </div>
                      ))
                    : recommendedBook.map((book) => (
                        <a
                          key={book.id}
                          href={`/book/${book.id}`}
                          className="for-you__recommended--books-link"
                        >
                          {audioRefs && (
                            <audio
                              src={book?.audioLink}
                              ref={(audioRef) =>
                                (audioRefs.current[book.id] = audioRef)
                              }
                              onLoadedMetadata={() => onLoadedMetaData(book.id)}
                            />
                          )}
                          {subscriptionStatus === "Basic" &&
                            book.subscriptionRequired && (
                              <div className="book__pill">Premium</div>
                            )}
                          <figure className="book__image--wrapper">
                            {isLoading ? (
                              <Skeleton
                                width="90%"
                                height="100%"
                                borderRadius={5}
                              />
                            ) : (
                              <img
                                src={book.imageLink}
                                alt=""
                                className="book__image"
                              />
                            )}
                          </figure>
                          <div className="recommended__book--title">
                            {book.title}
                          </div>
                          <div className="recommended__book--author">
                            {book.author}
                          </div>
                          <div className="recommended__book--sub-title">
                            {book.subTitle}
                          </div>
                          <div className="recommended__books--details-wrapper">
                            <div className="recommended__books--details">
                              <GoClock className="recommended__books--details-icon" />
                              <div className="recommended__books--details-text">
                                {formatTime(audioDurations[book.id] || 0)}
                              </div>
                            </div>
                            <div className="recommended__books--details">
                              <FaRegStar className="recommended__books--details-icon" />
                              <div className="recommended__books--details-text">
                                {book.averageRating}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                </div>
              </section>

              <section id="suggested__books">
                <h1 className="for-you__title">Suggested Books</h1>
                <h3 className="for-you__sub-title">Browse these books</h3>
                <div className="for-you__recommended--books">
                  {isLoading
                    ? new Array(7).fill(0).map((_, index) => (
                        <div key={index}>
                          <figure className="book__image--wrapper">
                            <Skeleton
                              width="100%"
                              height="100%"
                              borderRadius={5}
                            />
                          </figure>
                          <div className="recommended__book--title">
                            <Skeleton width="100%" height="28px" />
                          </div>
                          <div className="recommended__book--author">
                            <Skeleton width="50%" height="12px" />
                          </div>
                          <div className="recommended__book--sub-title">
                            <Skeleton width="90%" height="16px" />
                          </div>
                          <div className="recommended__books--details-wrapper">
                            <Skeleton width="85%" height="16px" />
                          </div>
                        </div>
                      ))
                    : suggestedBook.map((book) => (
                        <a
                          key={book.id}
                          href={`/book/${book.id}`}
                          className="for-you__recommended--books-link"
                        >
                          {audioRefs && (
                            <audio
                              src={book?.audioLink}
                              ref={(audioRef) =>
                                (audioRefs.current[book.id] = audioRef)
                              }
                              onLoadedMetadata={() => onLoadedMetaData(book.id)}
                            />
                          )}
                          {subscriptionStatus === "Basic" &&
                            book.subscriptionRequired && (
                              <div className="book__pill">Premium</div>
                            )}
                          <figure className="book__image--wrapper">
                            {isLoading ? (
                              <Skeleton
                                width="90%"
                                height="100%"
                                borderRadius={5}
                              />
                            ) : (
                              <img
                                src={book.imageLink}
                                alt=""
                                className="book__image"
                              />
                            )}
                          </figure>
                          <div className="recommended__book--title">
                            {book.title}
                          </div>
                          <div className="recommended__book--author">
                            {book.author}
                          </div>
                          <div className="recommended__book--sub-title">
                            {book.subTitle}
                          </div>
                          <div className="recommended__books--details-wrapper">
                            <div className="recommended__books--details">
                              <GoClock />
                              <div className="recommended__books--details-text">
                              {formatTime(audioDurations[book.id] || 0)}
                              </div>
                            </div>
                            <div className="recommended__books--details">
                              <FaRegStar />
                              <div className="recommended__books--details-text">
                                {book.averageRating}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
