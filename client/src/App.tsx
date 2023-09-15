import React from "react";
import Quiz from "./pages/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StartPage } from "./styles/pages";
import Questions from "./components/Questions";
import Report from "./pages/Report";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />}></Route>
          <Route
            path="/quiz/:quizId/question/:questionId"
            element={<Questions />}
          ></Route>
          <Route
            path="/quiz/:quizId/report/:reportId"
            element={<Report />}
          ></Route>
        </Routes>
      </Router>
      <Quiz />
    </div>
  );
}

export default App;
