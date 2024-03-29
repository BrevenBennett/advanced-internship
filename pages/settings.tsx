import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Skeleton from "@/components/Skeleton";
import { initFirebase } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";
import { updateSubscription } from "@/redux/userSlice";
import { getPremiumStatus } from "@/stripe/getPremiumStatus";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const app = initFirebase();
  const auth = getAuth(app);

  const email = useSelector((state: RootState) => state.user.email);
  const subscription = useSelector(
    (state: RootState) => state.user.subscriptionStatus
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const checkPremium = async () => {
        const newPremiumStatus = auth.currentUser
          ? await getPremiumStatus(app)
          : "Basic";
        dispatch(updateSubscription({ subscriptionStatus: newPremiumStatus }));
      };
      checkPremium();
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [app, auth.currentUser?.uid]);

  return (
    <>
      <Sidebar />
      <div className="wrapper settings__wrapper">
        <SearchBar />
        <div className="container">
          <div className="row">
            <div className="settings__title">Settings</div>
            {email ? (
              isLoading ? (
                <>
                  <div className="settings__description--wrapper">
                    <Skeleton width="183px" height="20px" />
                    <Skeleton width="100px" height="20px" />
                  </div>
                  <div className="settings__description--wrapper no-border">
                    <Skeleton width="100px" height="20px" />
                    <Skeleton width="183px" height="20px" />
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
                      <Link href="/choose-plan" className="btn settings__btn">
                        Upgrade to Premium
                      </Link>
                    )}
                  </div>
                  <div className="settings__description--wrapper no-border">
                    <div className="settings__subtitle">Email</div>
                    <div className="settings__text">{email}</div>
                  </div>
                </>
              )
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
