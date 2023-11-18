import robotReducer from "/src/features/robotSlice.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        robot: robotReducer,
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
