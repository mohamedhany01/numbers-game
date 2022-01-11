// Hooks
import { useEffect } from "react";
import { useNavigate } from "react-router";

// Utilities functions
import {
  isSolutionCorrect,
  isValidSolution,
} from "../../js/utilities/validateSolution";
import { initializeTwoNumbers } from "../../js/utilities/randomGen";
import { initializeTimer, updateTimer } from "../../js/utilities/timer";
import { mapRoute } from "../../js/utilities/routesManager";

// SASS
import "../../sass/components/_play.scss";

// Companents
import NoAccessAllowed from "../NoAccessAllowed";
import AppHeader from "../app/AppHeader";

function PlayPage({ appState, setAppState }) {
  // State destruction
  const {
    gameLevel,
    gameOperation,
    gameQuestionsNumber,
    questionNumbersToSolve,
    tries,
    num1,
    num2,
    countdownTime,
    solution,
  } = appState;

  // Protect the route
  if (gameLevel === "none" || gameOperation === "none") {
    return <NoAccessAllowed />;
  }

  let navigator = useNavigate();

  // Start the timer when the page is loaded
  useEffect(() => {
    const idInterval = setInterval(() => {
      setAppState((prevState) => ({
        ...prevState,
        countdownTime: prevState.countdownTime - 1,
      }));
    }, 1000);

    return () => {
      // Clear interval when the component unmount
      clearInterval(idInterval);
    };
  }, []);

  const handelAnswerOnSubmit = (e) => {
    // Stop submission
    e.preventDefault();
  };

  const handelSolution = () => {
    // Only move to the next question in case of the solution is valid and correct
    // Else decrease the tries
    if (
      isValidSolution(solution) &&
      isSolutionCorrect(num1, num2, gameOperation, solution)
    ) {
      const [newN1, newN2] = initializeTwoNumbers(gameLevel);
      const resetTime = initializeTimer(gameLevel);
      setAppState((prevState) => {
        return {
          ...prevState,
          num1: newN1,
          num2: newN2,
          countdownTime: resetTime,
          solution: "",
          questionNumbersToSolve: prevState.questionNumbersToSolve + 1,
        };
      });
    } else {
      setAppState((prevState) => {
        return {
          ...prevState,
          tries: prevState.tries - 1,
        };
      });
    }
  };

  const resetField = () => {
    setAppState({ ...appState, solution: "" });
  };

  // losing's constraints
  if (tries <= 0 || countdownTime <= 0) {
    navigator(mapRoute("lose"));
  }

  // win's constraints
  if (
    questionNumbersToSolve === gameQuestionsNumber &&
    tries > 0 &&
    countdownTime > 0
  ) {
    navigator(mapRoute("win"));
  }

  return (
    <main className="container px-5 my-5 overflow-hidden">
      <AppHeader />
      <section className="app-question px-1 my-5">
        <div className="row">
          <section className="question bg-box-shadow position-relative col-12 col-md-6 rounded my-4 my-md-0 py-4">
            <form onSubmit={handelAnswerOnSubmit}>
              <header className="position-absolute top-0 start-50 translate-middle app-bg-primary p-4 rounded-circle text-white app-border-secondary">
                <div className="time-circle">{updateTimer(countdownTime)}</div>
              </header>
              <div className="question-statement col-12 mt-4">
                <h2 className="h5">
                  Question #{questionNumbersToSolve}/{gameQuestionsNumber}
                </h2>
              </div>
              <div className="col-12 text-center mt-4">
                <span className="number1 fw-500 fs-big">{num1}</span>
                <span className="operation fw-500 fs-big">{gameOperation}</span>
                <span className="number2 fw-500 fs-big">{num2}</span>
              </div>
              <div className="question-answer col-12 px-5 my-5">
                <div className="input-group">
                  <input
                    autoFocus
                    inputMode="numeric"
                    type="text"
                    name="solution"
                    value={solution}
                    className="form-control form-control app-primary-color"
                    placeholder="Your Answer"
                    onChange={(e) =>
                      setAppState({ ...appState, solution: e.target.value })
                    }
                  />
                  <span className="input-group-text app-bg-primary text-white fw-500">
                    Tries: {tries}
                  </span>
                </div>
              </div>
              <section className="col-12">
                <div className="row g-0">
                  <div className="col-6 text-center">
                    <button
                      className="app-btn-primary w-50"
                      onClick={handelSolution}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="col-6 text-center">
                    <button
                      className="app-btn-secondary w-50"
                      onClick={resetField}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </section>
            </form>
          </section>
          <section className="more-info bg-box-shadow col-12 col-md-3 offset-md-3 rounded py-4">
            <h2 className="h5">Level info</h2>
            <div className="d-grid gap-3">
              <p className="p-1 m-0 bg-light border-bottom text-capitalize">
                Game level: <span className="ms-3 d-block">{gameLevel}</span>
              </p>
              <p className="p-1 m-0 bg-light border-bottom">
                Available Tries: <span className="ms-3 d-block">{tries}</span>
              </p>
              <p className="p-1 m-0 bg-light border-bottom">
                Questions Numbers:{" "}
                <span className="ms-3 d-block">{gameQuestionsNumber}</span>
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default PlayPage;
