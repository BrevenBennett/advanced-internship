import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: null | string;
  uid: null | string;
}

const initialState: UserState = {
  email: null,
  uid: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; uid: string }>) => {
      (state.email = action.payload.email), (state.uid = action.payload.uid);
    },

    signOutUser: (state) => {
      (state.email = null), (state.uid = null);
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
