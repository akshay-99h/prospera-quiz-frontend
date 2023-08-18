// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import SignupOptions from "./SignupOptions";
import EmailSignupForm from "./EmailSignupForm";
import VerificationPage from "./VerificationPage";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import QuizComponent from "./QuizComponent";
import ResultPage from "./ResultPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route path="/signup" component={SignupOptions} />
        <Route path="/email-signup" component={EmailSignupForm} />
        <Route path="/verification" component={VerificationPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/quiz/:quizId" component={QuizComponent} />
        <Route path="/result/:quizId" component={ResultPage} />
      </Switch>
    </Router>
  );
}

export default App;
