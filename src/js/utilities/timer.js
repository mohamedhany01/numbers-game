const secondsInMinute = 60;

const timeConstraints = {
  easy: 3,
  middle: 2,
  hard: 1,
  insane: 0.5,
};

const initializeTimer = (level) => {
  if (level === "easy") {
    return parseInt(timeConstraints[level] * secondsInMinute);
  } else if (level === "middle") {
    return parseInt(timeConstraints[level] * secondsInMinute);
  } else if (level === "hard") {
    return parseInt(timeConstraints[level] * secondsInMinute);
  } else if (level === "insane") {
    return parseInt(timeConstraints[level] * secondsInMinute);
  }
};

const updateTimer = (seconds) => {
  const { floor } = Math;
  const newMinutes = floor(seconds / secondsInMinute);
  let newSeconds = seconds % 60;
  newSeconds = newSeconds < 10 ? `0${newSeconds}` : newSeconds;

  return `${newMinutes}:${newSeconds}`;
};

export { initializeTimer, updateTimer };
