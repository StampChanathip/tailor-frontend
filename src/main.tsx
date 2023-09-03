import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResumePage from "./Pages/ResumePage.tsx";
import HomePage from "./Pages/HomePage.tsx";
import LoginPage from "./Pages/SignInPage.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
  },
  {
    path: "/signIn",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
