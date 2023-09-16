import React from "react";
import Quiz from "./pages/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Report from "./pages/Report";
import StartPage from "./pages/StartPage";
import Questions from "./pages/Questions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer style={{ zIndex: 99999 }} />
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />}></Route>
          <Route
            path="/quiz/:quizId/question/:questionId"
            element={<Questions />}
          ></Route>
          <Route path="/quiz/:quizId/report" element={<Report />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
