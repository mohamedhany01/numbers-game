import { useNavigate } from "react-router";

// Utilities functions
import { mapRoute } from "../../js/utilities/routes";

function ErrorPage({ appState, setAppState }) {
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
      <div>⚠️</div>
      <div>404</div>
      <div>Page not Found</div>
      <div>
        <button title="Back to the settings page" onClick={backHome}>
          Back Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
