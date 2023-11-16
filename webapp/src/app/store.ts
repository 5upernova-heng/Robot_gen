import viewReducer from '/src/features/viewSlice.ts'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        view: viewReducer
    }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
