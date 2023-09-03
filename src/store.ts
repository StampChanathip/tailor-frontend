import { configureStore } from "@reduxjs/toolkit";
import alertBoxReducer from "./Redux/alertBoxSlice";
import loadingScreenReducer from "./Redux/loadingScreenSlice";

export const store = configureStore({
  reducer: {
    alertBox: alertBoxReducer,
    loadingScreen: loadingScreenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
