import React from "react";
import { auth } from "../../firebase";
import { closePasswordModal, openLoginModal } from "../../redux/modalSlice";
import { RootState } from "../../redux/store";
import { Modal } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modal.passwordModalOpen
  );
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleResetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(`A Password Reset Link has been sent to ${email}`);
        dispatch(closePasswordModal());
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleCloseModal() {
    dispatch(closePasswordModal());
    setError("");
    setEmail("");
  }

  function toggleModal() {
    dispatch(closePasswordModal());
    dispatch(openLoginModal());
    setError("");
  }

  return (
    <>
      <Modal className="modal" open={isOpen} onClose={handleCloseModal}>
        <div className="modal__wrapper modal__wrapper--signup modal__wrapper--password">
          <IoMdClose onClick={handleCloseModal} className="modal__close" />

          <h3 className="modal__title">Reset your Password</h3>

          {error && (
            <h5 className="modal__error modal__error--password">
              Need Valid Email
            </h5>
          )}

          <input
            className="modal__input email__input"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleResetPassword}
            className="modal__button login__button"
          >
            Send Reset Password Link
          </button>

          <button
            onClick={toggleModal}
            className="modal__link modal__link--account"
          >
            Go to Login
          </button>
        </div>
      </Modal>
    </>
  );
}
