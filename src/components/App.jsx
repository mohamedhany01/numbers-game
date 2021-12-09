import { BrowserRouter, Routes, Route } from "react-router-dom";

// React hooks
import { useState } from "react";

// Pages
import StartPage from "./pages/StartPage";
import PlayPage from "./pages/PlayPage";
import WinPage from "./pages/WinPage";
import LosePage from "./pages/LosePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [appState, setAppState] = useState({
    gameOperation: "none",
    gameLevel: "none",
    gameQuestionsNumber: 0,
    questionNumbersToSolve: 0,
    num1: "",
    num2: "",
    tries: 0,
    countdownTime: 0,
    solution: "",
  });

  return (
    <BrowserRouter>
      {/* App routes */}
      <Routes>
        <Route
          path="/"
          element={<StartPage appState={appState} setAppState={setAppState} />}
        />
        <Route
          path="/play"
          element={<PlayPage appState={appState} setAppState={setAppState} />}
        />
        <Route
          path="/win"
          element={<WinPage appState={appState} setAppState={setAppState} />}
        />
        <Route
          path="/lose"
          element={<LosePage appState={appState} setAppState={setAppState} />}
        />
        <Route
          path="/*"
          element={<ErrorPage appState={appState} setAppState={setAppState} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
