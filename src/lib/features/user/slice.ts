import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  _persisted: false,
  id: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
      state.loading = false;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { authStart, authSuccess, authFailure } = userSlice.actions;
export default userSlice.reducer;
