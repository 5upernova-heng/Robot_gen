import robotReducer from "/src/features/robotSlice.ts";
import viewReducer from '/src/features/viewSlice.ts'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        robot: robotReducer,
        view: viewReducer
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
