// Hooks
import { useNavigate } from "react-router";

// Utilities functions
import { mapRoute } from "../../js/utilities/routes";
import { noAccessAllowed } from "../../js/utilities/interaction";

function WinPage({ appState, setAppState }) {
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
  return (
    <div>
      <p>Congratulations, you won.</p>
      <div>
        <button title="Back to the settings page" onClick={backHome}>
          Back Home
        </button>
      </div>
    </div>
  );
}

export default WinPage;
