// Redux/Slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
      AsyncStorage.setItem('user', JSON.stringify(state));
    },
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('user');
    },
    loadUser: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
