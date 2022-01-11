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
import gameRulesSVG from "../../images/undraw_annotation_re_h774_game_rules.svg";

// 3rd party libraries
import { useFormik } from "formik";

// SASS
import "../../sass/components/_start.scss";
import AppHeader from "../app/AppHeader";

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
      <main className="container px-5 my-5">
        <AppHeader />
        <section className="game-rules my-5 px-1">
          <section className="rules row justify-content-start align-items-center">
            <section className="col-md-6 col-12 order-md-1 order-2 secondary-color">
              <h2 className="primary-color">Game Rules</h2>
              <p>Please read the rules of the game before continue.</p>
              <ol>
                <li>Select the math operation.</li>
                <li>Select the game level.</li>
                <li>Press start button to play.</li>
              </ol>
            </section>
            <section className="col-md-6 col-12 order-md-2 order-1">
              <figure>
                <img
                  src={gameRulesSVG}
                  alt="Game rules"
                  className="img-fluid"
                />
              </figure>
            </section>
          </section>
        </section>
        <section className="px-1">
          <form
            onSubmit={didAppStateFillCorrectly}
            className="form-settings secondary-color"
          >
            <fieldset>
              <legend>
                <h2 className="primary-color">Game Settings</h2>
              </legend>
              <p>Some settings to set up, and then start the game</p>
              <div className="from-row mt-3 w-100">
                <label htmlFor="operation" className="form-label fw-500">
                  Operation:
                </label>
                <div className="row">
                  <div className="col-10">
                    <select
                      id="operation"
                      value={gameOperation}
                      onChange={handelSelection}
                      name="gameOperation"
                      className="form-control secondary-color"
                    >
                      {Object.values(operations).map((value, k) => (
                        <option value={Object.keys(operations)[k]} key={k}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-1 offset-1 d-flex justify-content-center align-items-center">
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
                <label htmlFor="level" className="form-label fw-500">
                  level:
                </label>
                <div className="row">
                  <div className="col-10">
                    <select
                      id="level"
                      value={gameLevel}
                      onChange={handelSelection}
                      name="gameLevel"
                      className="form-control secondary-color"
                    >
                      {Object.values(levels).map((value, k) => (
                        <option value={Object.keys(levels)[k]} key={k}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-1 offset-1 d-flex justify-content-center align-items-center">
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
            <button className="app-btn-primary w-20 mt-3 p-3 fw-500">Start</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default StartPage;
