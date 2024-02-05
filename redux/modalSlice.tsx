import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  loginModalOpen: boolean;
  signupModalOpen: boolean;
  passwordModalOpen: boolean;
}

const initialState: ModalState = {
  loginModalOpen: false,
  signupModalOpen: false,
  passwordModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
    openPasswordModal: (state) => {
      state.passwordModalOpen = true;
    },
    closePasswordModal: (state) => {
      state.passwordModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openSignupModal, closeSignupModal, openPasswordModal, closePasswordModal } = modalSlice.actions

export default modalSlice.reducer