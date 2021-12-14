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
import NoAccessAllowed from "../NoAccessAllowed";

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
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 m-auto">
            <section className="mt-3">
              <header>
                <h1>Let's Do It</h1>
              </header>
              <main>
                <form onSubmit={handelAnswerOnSubmit}>
                  <section className="info p-2 position-relative border border-2 rounded text-center">
                    <div className="mt-3">
                      Game level:{" "}
                      <span className="fs-medium fw-00 text-capitalize">
                        {gameLevel}
                      </span>
                    </div>
                    <div className="tries my-3">
                      You have:{" "}
                      <span className="fs-medium fw-00">{tries} tries</span>
                    </div>
                    <div className="mb-3">
                      You have solved {questionNumbersToSolve}/
                      <span className="fs-medium fw-00">
                        {gameQuestionsNumber}
                      </span>
                    </div>
                    <div className="time-panel fs-medium p-2 text-center border border-2 rounded fw-500">
                      {updateTimer(countdownTime)}
                    </div>
                  </section>
                  <div className="question mt-3 p-2 d-flex justify-content-evenly align-items-center">
                    <span className="number1 fw-500 fs-big">{num1}</span>{" "}
                    <span className="operation fw-500 fs-big">
                      {gameOperation}
                    </span>{" "}
                    <span className="number2 fw-500 fs-big">{num2}</span>
                  </div>
                  <input
                    type="text"
                    name="solution"
                    value={solution}
                    className="form-control my-3"
                    placeholder="Your Answer"
                    onChange={(e) =>
                      setAppState({ ...appState, solution: e.target.value })
                    }
                  />
                  <button className="btn btn-primary w-100">Submit</button>
                </form>
              </main>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayPage;
