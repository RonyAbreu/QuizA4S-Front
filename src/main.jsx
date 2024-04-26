import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ErrorPage from "./routes/erroPage/ErrorPage.jsx";
import Home from "./routes/home/Home.jsx";
import Login from "./routes/user/Login.jsx";
import Register from "./routes/user/Register.jsx";
import ChooseTheme from "./routes/chooseTheme/ChooseTheme.jsx";
import Quiz from "./routes/quiz/Quiz.jsx";
import { AuthenticationProvider } from "./context/AutenticationContext.jsx";
import CreateQuiz from "./routes/createQuiz/CreateQuiz.jsx";
import Profile from "./routes/profile/Profile.jsx";
import MyQuestion from "./routes/myquestion/MyQuestion.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route index path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/theme" element={<ChooseTheme />}/>
            <Route path="/theme/quiz/:id" element={<Quiz />}/>
            <Route path="/create/quiz" element={<CreateQuiz />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/profile/theme/:id/question" element={<MyQuestion />}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  </React.StrictMode>
);
