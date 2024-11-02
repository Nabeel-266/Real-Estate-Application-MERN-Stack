import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticUser: null,
  unAuthenticUser: null,
  pending: false,
  failed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.pending = action.payload;
    },
    setError(state, action) {
      state.failed = action.payload;
    },
    setAuthUser(state, action) {
      state.authenticUser = action.payload;
    },
    setUnAuthUser(state, action) {
      state.unAuthenticUser = action.payload;
    },
  },
});

export const { setLoading, setError, setAuthUser, setUnAuthUser } =
  userSlice.actions;

export default userSlice.reducer;
