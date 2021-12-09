const BASE = 3;
let baseIncremented = BASE;
const tries = {
  easy: BASE,
  middle: baseIncremented++,
  hard: baseIncremented++,
  insane: baseIncremented++,
};

const setTries = (level) => {
  if (level === "easy") {
    return tries[level];
  } else if (level === "middle") {
    return tries[level];
  } else if (level === "hard") {
    return tries[level];
  } else if (level === "insane") {
    return tries[level];
  }
};

export { setTries };
