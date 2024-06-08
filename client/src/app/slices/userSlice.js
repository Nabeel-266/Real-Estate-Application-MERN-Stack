import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
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
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    // resetUser(state) {
    //   state.currentUser = null;
    //   state.pending = false;
    //   state.failed = false;
    // },
    // updateUserProfileImg(state, action) {
    //   if (state.currentUser) {
    //     state.currentUser.profileImg = action.payload;
    //   }
    // },
  },
});

export const {
  setLoading,
  setError,
  setUser,
  //   resetUser,
  //   updateUserProfileImg,
} = userSlice.actions;

export default userSlice.reducer;
