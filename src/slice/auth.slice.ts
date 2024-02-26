import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthUser, IAuth } from "../utils/types";

const initialState: IAuth = {
  user: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    deleteAuth: () => initialState,
  },
});

export const { saveAuth, deleteAuth } = authUserSlice.actions;
export default authUserSlice.reducer;
