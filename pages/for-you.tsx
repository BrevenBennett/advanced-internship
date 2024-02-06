import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import { FaRegStar, FaPlayCircle } from "react-icons/fa";
import axios from "axios";

export default function ForYouPage() {
  const [selectedBook, setSelectedBook] = useState<any[]>([]);
  const [recommendedBook, setRecommendedBook] = useState<any[]>([]);
  const [suggestedBook, setSuggestedBook] = useState<any[]>([]);

  async function fetchSelectedBook() {
    try {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setSelectedBook(data);
    } catch (error) {
      console.error("Couldn't load", error);
    }
  }

  async function fetchRecommendedBook() {
    try {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
      );
      setRecommendedBook(data);
    } catch (error) {
      console.error("Couldn't load", error);
    }
  }

  async function fetchSuggestedBook() {
    try {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
      );
      setSuggestedBook(data);
    } catch (error) {
      console.error("Couldn't load", error);
    }
  }

  useEffect(() => {
    fetchSelectedBook();
    fetchRecommendedBook();
    fetchSuggestedBook();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="for-you__wrapper">
              <h1 className="for-you__title">Selected Just For You</h1>
              {selectedBook.map((book) => (
                <a key={book.id} href={`/book/${book.id}`} className="selected__book">
                  <div className="selected__book--subtitle">
                    {book.subTitle}
                  </div>
                  <div className="selected__book--line"></div>
                  <div className="selected__book--content">
                    <figure className="book__image--wrapper">
                      <img
                        src={book.imageLink}
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="selected__book--description">
                      <div className="selected__book--title">{book.title}</div>
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
              ))}

              <section id="recommended__books">
                <h1 className="for-you__title">Recommended For You</h1>
                <h3 className="for-you__sub-title">
                  We think you'll like these
                </h3>
                <div className="for-you__recommended--books">
                  {recommendedBook.map((book) => (
                    <a
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="for-you__recommended--books-link"
                    >
                      {book.subscriptionRequired && (
                        <div className="book__pill">Premium</div>
                      )}
                      <figure className="book__image--wrapper">
                        <img
                          src={book.imageLink}
                          alt=""
                          className="book__image"
                        />
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
                            4:52
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
                  {suggestedBook.map((book) => (
                    <a key={book.id} href={`/book/${book.id}`} className="for-you__recommended--books-link">
                      {book.subscriptionRequired && <div className="book__pill">Premium</div>}
                      <figure className="book__image--wrapper">
                        <img
                          src={book.imageLink}
                          alt=""
                          className="book__image"
                        />
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
                            4:52
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
