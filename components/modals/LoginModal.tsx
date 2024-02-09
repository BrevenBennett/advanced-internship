import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { RootState } from "../../redux/store";
import {
  closeLoginModal,
  openPasswordModal,
  openSignupModal,
} from "../../redux/modalSlice";

import { FcGoogle } from "react-icons/fc";
import { IoPerson } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginModal() {
  const isOpen = useSelector((state: RootState) => state.modal.loginModalOpen);
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleLogIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/for-you");
    } catch (error) {
      console.error("Login Error:", error);
      setError(true);
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/for-you");
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  }

  async function handleGuestLogIn() {
    await signInWithEmailAndPassword(auth, "guest1616@gmail.com", "654321");
    if (router.pathname === "/") {
      router.push("/for-you");
    }
    dispatch(closeLoginModal())
  }

  function handleCloseModal() {
    dispatch(closeLoginModal());
    setError(false);
  }

  function toggleToPasswordModal() {
    dispatch(closeLoginModal());
    dispatch(openPasswordModal());
    setError(false);
  }

  function toggleToSignUpModal() {
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
    setError(false);
  }

  return (
    <>
      <Modal className="modal" open={isOpen} onClose={handleCloseModal}>
        <div className="modal__wrapper">
          <IoMdClose onClick={handleCloseModal} className="modal__close" />

          <h3 className="modal__title">Login to Summarist</h3>

          <button
            onClick={handleGuestLogIn}
            className="modal__button guest__button"
          >
            <IoPerson className="modal__button--icon" /> Login as Guest
          </button>

          <div className="break__wrapper">
            <div className="line"></div>
            <div className="or">or</div>
            <div className="line"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="modal__button google__button"
          >
            <FcGoogle className="modal__button--icon google" /> Login with
            Google
          </button>

          <div className="break__wrapper">
            <div className="line"></div>
            <div className="or">or</div>
            <div className="line"></div>
          </div>

          {error && <h5 className="modal__error">Invalid User Credentials</h5>}

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

          <button onClick={handleLogIn} className="modal__button login__button">
            Login
          </button>

          <button
            onClick={toggleToPasswordModal}
            className="modal__link modal__link--password"
          >
            Forgot your password?
          </button>
          <button
            onClick={toggleToSignUpModal}
            className="modal__link modal__link--account"
          >
            Don't have an account?
          </button>
        </div>
      </Modal>
    </>
  );
}
