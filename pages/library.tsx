import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";

export default function Library() {
//   const [savedBook, setSavedBook] = useState<any[]>([]);


  return (
    <>
    <Sidebar />
      {/* <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
            <div className="row">
            <section id="recommended__books">
                <h1 className="for-you__title">Recommended For You</h1>
                <h3 className="for-you__sub-title">
                  We think you'll like these
                </h3>
                <div className="for-you__recommended--books">
                  {savedBook.map((book) => (
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
            </div>
        </div>
      </div> */}
    </>
  );
}
