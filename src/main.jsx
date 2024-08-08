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
import { AuthenticationProvider } from "./context/AuthenticationContext.jsx";
import CreateQuiz from "./routes/createQuiz/CreateQuiz.jsx";
import Profile from "./routes/profile/Profile.jsx";
import MyQuestion from "./routes/myquestion/MyQuestion.jsx";
import PrivateRoute from "./components/privateRoute/PrivateRoute.jsx";
import CreateQuestion from "./routes/createQuiz/CreateQuestions.jsx"
import SelectTheme from "./routes/createQuiz/SelectTheme.jsx";

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
            <Route path="/create/quiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute>}/>
            <Route path="/create/quiz/theme" element={<PrivateRoute><SelectTheme /></PrivateRoute>}/>
            <Route path="/create/quiz/:id/question" element={<PrivateRoute><CreateQuestion /></PrivateRoute>}/>
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
            <Route path="/profile/theme/:id/question" element={<PrivateRoute><MyQuestion /></PrivateRoute>}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  </React.StrictMode>
);
