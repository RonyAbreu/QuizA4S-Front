import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import ChooseTheme from "./routes/ChooseTheme.jsx";
import Quiz from "./routes/Quiz.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/theme",
        element: <ChooseTheme />
      },
      {
        path: "/theme/quiz/:id",
        element: <Quiz />
      },


      {
        path: "/user",
        element: <Home />
      },
      {
        path: "/user/theme",
        element: <ChooseTheme />
      },
      {
        path: "/user/theme/quiz/:id",
        element: <Quiz />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
