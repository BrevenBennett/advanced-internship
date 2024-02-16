import React from "react";
import { Modal } from "@mui/material";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal, openLoginModal } from "../../redux/modalSlice";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { setUser } from "../../redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state: RootState) => state.modal.signupModalOpen);
  const subscriptionStatus = useSelector((state: RootState) => state.user.subscriptionStatus)
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (router.pathname === "/") {
        router.push("/for-you");
      }
      dispatch(closeSignupModal());
    } catch (error) {
      console.error("Sign Up Error:", error);
      setError(true);
    }
  }

  async function handleGoogleSignUp() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log(token)
      const user = result.user;
      if (router.pathname === "/") {
        router.push("/for-you");
      }
      dispatch(closeSignupModal());
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      const userEmail = currentUser.email ?? "";
      dispatch(
        setUser({
          email: userEmail,
          uid: currentUser.uid,
          subscriptionStatus: "Basic",
        })
      );
    });

    return unsubscribe;
  }, []);

  function handleCloseModal() {
    dispatch(closeSignupModal());
    setError(false);
  }

  function toggleModal() {
    dispatch(closeSignupModal());
    dispatch(openLoginModal());
    setError(false);
  }

  return (
    <>
      <Modal className="modal" open={isOpen} onClose={handleCloseModal}>
        <div className="modal__wrapper modal__wrapper--signup">
          <IoMdClose onClick={handleCloseModal} className="modal__close" />

          <h3 className="modal__title">Sign up to Summarist</h3>

          <button
            onClick={handleGoogleSignUp}
            className="modal__button google__button"
          >
            <FcGoogle className="modal__button--icon google" /> Sign up with
            Google
          </button>

          <div className="break__wrapper">
            <div className="line"></div>
            <div className="or">or</div>
            <div className="line"></div>
          </div>

          {error && (
            <h5 className="modal__error modal__error--login">
              Invalid User Credentials
            </h5>
          )}

          <input
            className="modal__input email__input"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="modal__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            className="modal__button login__button"
          >
            Sign Up
          </button>

          <button
            onClick={toggleModal}
            className="modal__link modal__link--account"
          >
            Already have an account?
          </button>
        </div>
      </Modal>
    </>
  );
}
