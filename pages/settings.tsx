import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { initFirebase } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import { updateSubscription } from "@/redux/userSlice";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function settings() {
  const app = initFirebase();
  const auth = getAuth(app);

  const user = useSelector((state: RootState) => state.user);
  const subscription = useSelector((state: RootState) => state.user.subscriptionStatus)
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : "Basic";
      dispatch(updateSubscription({subscriptionStatus: newPremiumStatus}))
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  return (
    <>
      <Sidebar />
      <div className="wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="settings__title">Settings</div>
            {!user.email ? (
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
                    Log in to your account to see your details.
                  </div>
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="btn settings__btn"
                  >
                    Login
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="settings__description--wrapper">
                  <div className="settings__subtitle">
                    Your Subscription Plan
                  </div>
                  <div className="settings__text">{subscription}</div>
                  {subscription === "Basic" && (
                    <a href="/choose-plan" className="btn settings__btn">
                      Upgrade to Premium
                    </a>
                  )}
                </div>
                <div className="settings__description--wrapper no-border">
                  <div className="settings__subtitle">Email</div>
                  <div className="settings__text">{user.email}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
