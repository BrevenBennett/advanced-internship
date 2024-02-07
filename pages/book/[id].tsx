import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaRegClock } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { HiOutlineLightBulb } from "react-icons/hi";
import { SlBookOpen } from "react-icons/sl";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { useParams } from "next/navigation";

export function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

export default function Book({ id }: { id: string }) {
  const [bookData, setBookData] = useState<any>([]);

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
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="id__wrapper">
              <div className="id__book">
                <div className="id-book__title">{bookData.subscriptionRequired ? bookData.title + " (Premium)" : bookData.title}</div>
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
                    <div className="details__wrapper">
                      <FaRegClock className="detail__icon" />
                      <div className="detail">3:23</div>
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
                  <div className="button__items--wrapper">
                    <button className="id-book__btn">
                      <SlBookOpen className="id-book__btn--icon" /> Read
                    </button>
                  </div>
                  <div className="button__items--wrapper">
                    <button className="id-book__btn">
                      <HiOutlineMicrophone className="id-book__btn--icon" />{" "}
                      Listen
                    </button>
                  </div>
                </div>
                <div className="id__book--bookmark">
                  <CiBookmark className="bookmark--icon" />
                  <div className="bookmark__text">Add title to My Library</div>
                </div>
                <div className="id__book--secondary-title">
                  What's it about?
                </div>
                {bookData.tags && (
                  <div className="id__book--tags-wrapper">
                    <div className="id__book--tag">{bookData.tags[0]}</div>
                    <div className="id__book--tag">{bookData.tags[1]}</div>
                  </div>
                )}
                <div className="id__book--para">{bookData.bookDescription}</div>
                <div className="id__book--secondary-title">
                  About the author
                </div>
                <div className="id__book--para">
                  {bookData.authorDescription}
                </div>
              </div>

              <figure className="id-book__image--wrapper">
                <img src={bookData.imageLink} alt="" className="book__image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
