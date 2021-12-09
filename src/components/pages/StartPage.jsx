import { useNavigate } from "react-router";

// Utilities functions
import {
  initializeTwoNumbers,
  setQuestionsNumber,
} from "../../js/utilities/randomGen";
import { initializeTimer } from "../../js/utilities/timer";
import { setTries } from "../../js/utilities/constraints";
import { mapRoute } from "../../js/utilities/routes";
import { mapToEmoji, mapToOperation } from "../../js/utilities/interaction";

function StartPage({ appState, setAppState }) {
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
          <div className="col-12 col-sm-6">
            <section>
              <header>
                <h1>Welcome player! Are you ready?</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
                  minima placeat vel autem ut doloremque.
                </p>
              </header>
              <main>
                <form onSubmit={didAppStateFillCorrectly}>
                  <fieldset>
                    <legend>Game Settings</legend>
                    <p>Some settings to set up, and then start the game</p>
                    <label htmlFor="operation">Operation: </label>
                    <select
                      id="operation"
                      value={gameOperation}
                      onChange={handelSelection}
                      name="gameOperation"
                    >
                      {Object.values(operations).map((value, k) => (
                        <option value={Object.keys(operations)[k]} key={k}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <span className="selected-operation">
                      {gameOperation !== "none"
                        ? mapToOperation(gameOperation)
                        : ""}
                    </span>
                    <label htmlFor="level">level: </label>
                    <select
                      id="level"
                      value={gameLevel}
                      onChange={handelSelection}
                      name="gameLevel"
                    >
                      {Object.values(levels).map((value, k) => (
                        <option value={Object.keys(levels)[k]} key={k}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <span className="selected-level">
                      {gameLevel !== "none" ? mapToEmoji(gameLevel) : ""}
                    </span>
                  </fieldset>
                  <button className="btn">Start</button>
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
