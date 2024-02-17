import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AudioPlayerState {
  duration: string;
}

const initialState: AudioPlayerState = {
  duration: "",
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    setGlobalDuration(state, action: PayloadAction<string>) {
      state.duration = action.payload;
    },
  },
});

export const { setGlobalDuration } = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;