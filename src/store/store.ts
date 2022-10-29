import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "../reducers/dialogReducer";
export const store = configureStore({
    reducer: {
        dialogSlice: dialogReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch