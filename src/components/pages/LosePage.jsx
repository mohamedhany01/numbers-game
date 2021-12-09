import { useNavigate } from "react-router";
import {
  initializeTwoNumbers,
  setQuestionsNumber,
} from "../../js/utilities/randomGen";

// Utilities functions
import { initializeTimer } from "../../js/utilities/timer";
import { setTries } from "../../js/utilities/constraints";
import { mapRoute } from "../../js/utilities/routes";
import { noAccessAllowed } from "../../js/utilities/interaction";

function LosePage({ appState, setAppState }) {
  // State destruction
  const { gameLevel, gameOperation } = appState;

  // Protect the route
  if (gameLevel === "none" || gameOperation === "none") {
    return <div>{noAccessAllowed()}</div>;
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
    <div>
      <p>You lost</p>
      <div>
        <button
          title="Try again with the same level"
          onClick={doChallengeAgain}
        >
          Try Again
        </button>
        <button title="Back to the settings page" onClick={backHome}>
          Back Home
        </button>
      </div>
    </div>
  );
}

export default LosePage;
