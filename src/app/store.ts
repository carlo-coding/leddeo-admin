import { configureStore } from "@reduxjs/toolkit";
import { authSlice, faqSlice, userSlice } from "../features";
import thunk from "redux-thunk";
import { modalSlice } from "../components";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    modal: modalSlice,
    faq: faqSlice,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
