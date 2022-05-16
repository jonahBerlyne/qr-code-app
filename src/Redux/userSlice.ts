import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Store";

const initialState: any = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  }
});

export const selectUser = ((state: RootState) => state.user.user);

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;