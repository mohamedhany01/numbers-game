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
import { mapRoute } from "../../js/utilities/routes";
import { noAccessAllowed } from "../../js/utilities/interaction";

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
    return <div>{noAccessAllowed()}</div>;
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
          <div className="col-12 col-sm-6">
            <section>
              <header>
                <h1>Let's play</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
                  minima placeat vel autem ut doloremque.
                </p>
              </header>
              <main>
                <form onSubmit={handelAnswerOnSubmit}>
                  <section className="info">
                    <div>Game level: {gameLevel}</div>
                    <div>You have: {tries} tries</div>
                    <div>
                      To win you have to solve {questionNumbersToSolve}/
                      {gameQuestionsNumber}
                    </div>
                    <div>You have {updateTimer(countdownTime)} left</div>
                  </section>
                  <div>{`${num1} ${gameOperation} ${num2}`}</div>
                  <input
                    type="text"
                    name="solution"
                    value={solution}
                    onChange={(e) =>
                      setAppState({ ...appState, solution: e.target.value })
                    }
                  />
                  <button className="btn">Submit</button>
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
