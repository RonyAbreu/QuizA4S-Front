import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/erroPage/ErrorPage.jsx";
import Home from "./routes/home/Home.jsx";
import Login from "./routes/user/Login.jsx";
import Register from "./routes/user/Register.jsx";
import ChooseTheme from "./routes/chooseTheme/ChooseTheme.jsx";
import Quiz from "./routes/quiz/Quiz.jsx";
import { AuthenticationProvider } from "./context/AutenticationContext.jsx";
import CreateQuiz from "./routes/createQuiz/CreateQuiz.jsx";
import Profile from "./routes/profile/Profile.jsx";
import MyQuiz from "./routes/quiz/MyQuiz.jsx";

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
        element: <ChooseTheme />,
      },
      {
        path: "/theme/quiz/:id",
        element: <Quiz />,
      },
      {
        path: "/create/quiz",
        element: <CreateQuiz />
      },
      {
        path: "/create/quiz/:id",
        element: <CreateQuiz />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/myquiz",
        element: <MyQuiz />
      },
      {
        path: "/myquiz/quiz/:id",
        element: <Quiz />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <RouterProvider router={router} />
    </AuthenticationProvider>
  </React.StrictMode>
);
