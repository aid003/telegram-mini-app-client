import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
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
    rehydrate: (state, action: PayloadAction<UserState | null>) => {
      return action.payload || state;
    },
  },
});

export const { authStart, authSuccess, authFailure, rehydrate } =
  userSlice.actions;
export default userSlice.reducer;
