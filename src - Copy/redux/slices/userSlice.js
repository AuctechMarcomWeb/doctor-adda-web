import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: null,
  userProfileData: null, // New state for storing user profile data
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      console.log("user data from redux", state.userData);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
      state.userProfileData = null; // Clear profile data on logout
    },
    updateUserProfile(state, action) {
      state.userProfileData = action.payload;
      console.log("user profile data updated in redux", state.userProfileData);
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
