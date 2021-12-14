import { useNavigate } from "react-router";

// Utilities functions
import {
  initializeTwoNumbers,
  setQuestionsNumber,
} from "../../js/utilities/randomGen";
import { initializeTimer } from "../../js/utilities/timer";
import { setTries } from "../../js/utilities/constraints";
import { mapRoute } from "../../js/utilities/routesManager";
import { mapToEmoji, mapToOperation } from "../../js/utilities/interaction";

// Images
import headerImg from "../../images/header-img.png";

// 3rd party libraries
import { useFormik } from "formik";

// SASS
import "../../sass/components/_start.scss";

// Formik state

function StartPage({ appState, setAppState }) {
  const formik = useFormik({
    initialValues: {
      gameLevel: "",
      gameOperation: "",
    },
  });

  // State destruction
  const { gameLevel, gameOperation } = appState;

  const navigator = useNavigate();

  const operations = {
      none: "-- Select Operation --",
      "+": "+",
      "-": "-",
      "*": "*",
      "/": "/",
    },
    levels = {
      none: "-- Select Level --",
      easy: "Easy",
      middle: "Middle",
      hard: "Hard",
      insane: "Insane",
    };

  // Handel selection and set state
  const handelSelection = (e) => {
    // DOM destruction and rename
    const { name: state, value: level } = e.target;

    if (state === "gameLevel" && level !== "none") {
      const questionsNumber = setQuestionsNumber(level);
      const [n1, n2] = initializeTwoNumbers(level);
      const time = initializeTimer(level);
      const triesCount = setTries(level);

      setAppState({
        ...appState,
        [state]: level,
        gameQuestionsNumber: questionsNumber,
        num1: n1,
        num2: n2,
        countdownTime: time,
        tries: triesCount,
      });
    } else if (state === "gameOperation" && level !== "none") {
      setAppState({
        ...appState,
        [state]: level,
      });
    } else {
      setAppState({
        ...appState,
        [state]: level,
      });
    }
  };

  const didAppStateFillCorrectly = (e) => {
    e.preventDefault();

    // Move to the pay page only if both level and operation are filled correctly
    if (gameOperation !== "none" && gameLevel !== "none") {
      navigator(mapRoute("play"));
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <section>
              <header>
                <h1 className="fw-700 text-center my-4">
                  Welcome Player{" "}
                  <div className="h2 mt-2 sub-header">Are You Ready?</div>
                </h1>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <img src={headerImg} width={100} alt="logo" />
                  <div className="game-name ms-4 h3 fw-500">
                    The Numbers Game
                  </div>
                </div>
                <div className="rules">
                  <p>Please read the rules of the game before continue.</p>
                  <ul>
                    <li>Select the math operation you want.</li>
                    <li>Select the level of the game.</li>
                    <li>Press start button to play.</li>
                  </ul>
                </div>
              </header>
              <main>
                <form onSubmit={didAppStateFillCorrectly} className="form-settings">
                  <fieldset>
                    <legend>Game Settings</legend>
                    <p>Some settings to set up, and then start the game</p>
                    <div className="from-row mt-3 w-100">
                      <label htmlFor="operation" className="form-label">
                        Operation:
                      </label>
                      <div className="row">
                        <div className="col-11">
                          <select
                            id="operation"
                            value={gameOperation}
                            onChange={handelSelection}
                            name="gameOperation"
                            className="form-control"
                          >
                            {Object.values(operations).map((value, k) => (
                              <option
                                value={Object.keys(operations)[k]}
                                key={k}
                              >
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-1 d-flex justify-content-center align-items-center">
                          <span
                            className={`selected-operation fs-big ${
                              gameOperation !== "none" ? "active" : ""
                            }`}
                          >
                            {gameOperation !== "none"
                              ? mapToOperation(gameOperation)
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="from-row mt-3 w-100">
                      <label htmlFor="level" className="form-label">
                        level:
                      </label>
                      <div className="row">
                        <div className="col-11">
                          <select
                            id="level"
                            value={gameLevel}
                            onChange={handelSelection}
                            name="gameLevel"
                            className="form-control"
                          >
                            {Object.values(levels).map((value, k) => (
                              <option value={Object.keys(levels)[k]} key={k}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-1 d-flex justify-content-center align-items-center">
                          <span
                            className={`selected-level fs-big ${
                              gameLevel !== "none" ? "active" : ""
                            }`}
                          >
                            {gameLevel !== "none" ? mapToEmoji(gameLevel) : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <button className="btn btn-primary mt-3 w-100">Start</button>
                </form>
              </main>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartPage;
