import Player from "@/components/audio-player/Player";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { initFirebase } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import { updateSubscription } from "@/redux/userSlice";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function getServerSideProps(context: any) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

export default function PlayerId({ id }: { id: string }) {
  const app = initFirebase();
  const auth = getAuth(app);

  const user = useSelector((state: RootState) => state.user);
  const loggedIn = user.email;
  const dispatch = useDispatch();

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

  return (
    <>
      <Sidebar />
      <Player id={id} />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            {loggedIn ? (
              <>
                <div className="player__summary--inner-container">
                  <div className="id-book__title id-player__title">
                    {bookData.title}
                  </div>
                  <div className="id__book--para space">{bookData.summary}</div>
                </div>
              </>
            ) : (
              <>
                <div className="settings__login--wrapper">
                  <figure className="settings__img--wrapper">
                    <img
                      src="/assets/settings.png"
                      alt=""
                      className="settings__img"
                    />
                  </figure>
                  <div className="settings__login--text">
                    Log in to your account to read and listen to the book
                  </div>
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="btn settings__btn"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
