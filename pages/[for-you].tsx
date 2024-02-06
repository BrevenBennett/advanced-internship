import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { GoClock } from "react-icons/go";
import { FaRegStar, FaPlayCircle } from "react-icons/fa";

export default function ForYouPage() {
  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="for-you__wrapper">
              <h1 className="for-you__title">Selected Just For You</h1>
              <a href="" className="selected__book">
                <div className="selected__book--subtitle">
                  How Constant Innovation Creates Radically Successful
                  Businesses
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure className="book__image--wrapper">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                      alt=""
                      className="book__image"
                    />
                  </figure>
                  <div className="selected__book--description">
                    <div className="selected__book--title">
                      The Lean Startup
                    </div>
                    <div className="selected__book--author">Eric Ries</div>
                    <div className="selected__book--duration-wrapper">
                      <FaPlayCircle className="selected__book--icon" />
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <section id="recommended__books">
                <h1 className="for-you__title">Recommended For You</h1>
                <h3 className="for-you__sub-title">
                  We think you'll like these
                </h3>
                <div className="for-you__recommended--books">
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="" className="for-you__recommended--books-link">
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </section>

              <section id="suggested__books">
                <h1 className="for-you__title">Suggested Books</h1>
                <h3 className="for-you__sub-title">Browse these books</h3>
                <div className="for-you__recommended--books">
                  <a href="" className="for-you__recommended--books-link">
                    <div className="book__pill">Premium</div>
                    <figure className="book__image--wrapper">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                        alt=""
                        className="book__image"
                      />
                    </figure>
                    <div className="recommended__book--title">
                      Can't Hurt Me
                    </div>
                    <div className="recommended__book--author">
                      David Goggins
                    </div>
                    <div className="recommended__book--sub-title">
                      Master Your Mind and Defy Your Odds
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
                          4.2
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
