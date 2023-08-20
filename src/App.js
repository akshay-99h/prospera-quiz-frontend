import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import SignupOptions from "./components/SignupOptions";
import EmailSignupForm from "./components/EmailSignupForm";
import VerificationPage from "./components/VerificationPage";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import QuizComponent from "./components/QuizComponent";
import ResultPage from "./components/ResultPage";
import ErrorNotFound from "./components/ErrorNotFound";
import Callback from "./components/Callback.js";
import Quiz from "./components/Quiz.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupOptions />} />
        <Route path="/email-signup" element={<EmailSignupForm />} />
        <Route path="/verification/:userId" element={<VerificationPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/quiz" element={<QuizComponent />} />{" "}
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="/api/auth/google/callback"
          element={<Callback provider="google" />}
        />
        <Route
          path="/api/auth/discord/callback"
          element={<Callback provider="discord" />}
        />
        <Route
          path="/api/auth/github/callback"
          element={<Callback provider="github" />}
        />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
