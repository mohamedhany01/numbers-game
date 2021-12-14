// Hooks
import { useNavigate } from "react-router";

// Utilities functions
import { initializeTimer } from "../../js/utilities/timer";
import { setTries } from "../../js/utilities/constraints";
import { mapRoute } from "../../js/utilities/routesManager";
import {
  initializeTwoNumbers,
  setQuestionsNumber,
} from "../../js/utilities/randomGen";

import NoAccessAllowed from "../NoAccessAllowed";

function LosePage({ appState, setAppState }) {
  // State destruction
  const { gameLevel, gameOperation } = appState;

  // Protect the route
  if (gameLevel === "none" || gameOperation === "none") {
    return <NoAccessAllowed />
  }

  let navigator = useNavigate();

  // Reset to default and back to index page
  const backHome = () => {
    setAppState({
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
    navigator(mapRoute("index"));
  };

  // Reset and back to the same challenge again
  const doChallengeAgain = () => {
    const level = gameLevel;
    const questionsNumber = setQuestionsNumber(level);
    const [n1, n2] = initializeTwoNumbers(level);
    const time = initializeTimer(level);
    const triesCount = setTries(level);

    setAppState({
      ...appState,
      gameQuestionsNumber: questionsNumber,
      questionNumbersToSolve: 0,
      num1: n1,
      num2: n2,
      countdownTime: time,
      tries: triesCount,
      solution: ""
    });

    navigator(mapRoute("play"));
  };
  return (
    <div className="container text-center">
      <div className="row my-3">
        <h1 className="text-danger">Unfortunately, you lost.</h1>
      </div>
      <div className="row">
        <div className="btns">
          <button
            className="btn btn-primary me-4"
            title="Back to the settings page"
            onClick={backHome}
          >
            Back Home
          </button>
          <button
            className="btn btn-success ms-4"
            title="Play again with the same level"
            onClick={doChallengeAgain}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default LosePage;
