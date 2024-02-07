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

export default function Book() {
  const id = useParams();
  const [bookData, setBookData] = useState([]);

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
              {bookData.map((book) => (
                <>
                  <div className="id__book">
                    <div className="id-book__title">The Lean Startup</div>
                    <div className="id-book__author">Eric Ries</div>
                    <div className="id-book__subtitle">
                      How Constant Innovation Creates Radically Successful
                      Businesses
                    </div>
                    <div className="id-book__wrapper">
                      <div className="id-book__description-wrapper">
                        <div className="details__wrapper">
                          <FaRegStar className="detail__icon" />
                          <div className="detail rating">4.6</div>
                          <div className=" detail total__rating">
                            (981 ratings)
                          </div>
                        </div>
                        <div className="details__wrapper">
                          <FaRegClock className="detail__icon" />
                          <div className="detail">3:23</div>
                        </div>
                        <div className="details__wrapper">
                          <HiOutlineMicrophone className="detail__icon" />
                          <div className="detail">Audio & Text</div>
                        </div>
                        <div className="details__wrapper">
                          <HiOutlineLightBulb className="detail__icon" />
                          <div className="detail">11 Key Ideas</div>
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
                      <div className="bookmark__text">
                        Add title to My Library
                      </div>
                    </div>
                    <div className="id__book--secondary-title">
                      What's it about?
                    </div>
                    <div className="id__book--tags-wrapper">
                      <div className="id__book--tag">Productivity</div>
                      <div className="id__book--tag">Personal Development</div>
                    </div>
                    <div className="id__book--para">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Excepturi molestias numquam placeat autem delectus minima
                      ullam, similique explicabo consequuntur veritatis
                      perspiciatis sed ex alias, necessitatibus enim minus
                      voluptatem expedita unde repellat aperiam natus. Possimus
                      accusamus laborum laudantium perferendis repellat. Esse
                      id, quam voluptates doloremque eveniet vitae repudiandae
                      itaque est magni reprehenderit, voluptatibus quo. Impedit
                      cupiditate eaque dolorem cumque at corrupti voluptatem
                      libero! Labore distinctio in non modi praesentium
                      provident, sit eaque adipisci ipsa laboriosam! Quaerat
                      aspernatur laudantium dolorem sit quasi?
                    </div>
                    <div className="id__book--secondary-title">
                      About the author
                    </div>
                    <div className="id__book--para">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Asperiores explicabo quae esse perferendis accusantium
                      error sit velit aperiam alias, cum aliquid fuga, ipsa
                      molestiae inventore odio voluptate eligendi in modi quam.
                      Provident facilis explicabo nesciunt praesentium expedita
                      omnis hic et. Error fuga reiciendis illo, unde, laudantium
                      consequatur numquam accusamus adipisci vitae possimus
                      delectus placeat! Voluptatibus unde qui modi provident
                      incidunt consequuntur vitae excepturi, quis veniam soluta
                      hic? Atque labore minus quia aut nihil, veritatis nulla
                      maiores, blanditiis, modi laborum optio!
                    </div>
                  </div>

                  <figure className="id-book__image--wrapper">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/summar…=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                      alt=""
                      className="book__image"
                    />
                  </figure>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
