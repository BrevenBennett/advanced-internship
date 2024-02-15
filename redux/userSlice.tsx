import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: null | string;
  uid: null | string;
  subscriptionStatus: null | string;
}

const initialState: UserState = {
  email: null,
  uid: null,
  subscriptionStatus: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string;
        uid: string;
        subscriptionStatus: string;
      }>
    ) => {
      (state.email = action.payload.email),
        (state.uid = action.payload.uid),
        (state.subscriptionStatus = action.payload.subscriptionStatus);
    },

    signOutUser: (state) => {
      (state.email = null),
        (state.uid = null),
        (state.subscriptionStatus = null);
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
