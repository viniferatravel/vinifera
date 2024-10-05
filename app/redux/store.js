import { configureStore } from "@reduxjs/toolkit";
import selectedChecksSlice from "@/app/redux/slices/selectedChecksSlice"

export const store = configureStore({
  reducer: {
    checks:selectedChecksSlice,
  },
});