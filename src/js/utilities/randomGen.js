const qNumbers = {
  easy: 10,
  middle: 20,
  hard: 30,
  insane: 40,
};
const setQuestionsNumber = (level) => {
  if (level === "easy") {
    return qNumbers[level];
  } else if (level === "middle") {
    return qNumbers[level];
  } else if (level === "hard") {
    return qNumbers[level];
  } else if (level === "insane") {
    return qNumbers[level];
  }
};

const initializeTwoNumbers = (level) => {
  if (level === "easy") {
    let num1, num2;
    num1 = Math.random() * (10 - 1) + 1;
    num2 = Math.random() * (10 - 1) + 1;

    return [Math.round(num1), Math.round(num2)];
  } else if (level === "middle") {
    let num1, num2;
    num1 = Math.random() * (50 - 11) + 11;
    num2 = Math.random() * (50 - 11) + 11;

    return [Math.round(num1), Math.round(num2)];
  } else if (level === "hard") {
    let num1, num2;
    num1 = Math.random() * (100 - 51) + 51;
    num2 = Math.random() * (100 - 51) + 51;

    return [Math.round(num1), Math.round(num2)];
  } else if (level === "insane") {
    let num1, num2;
    num1 = Math.random() * (1000 - 101) + 101;
    num2 = Math.random() * (1000 - 101) + 101;

    return [Math.round(num1), Math.round(num2)];
  }
};

export { initializeTwoNumbers, setQuestionsNumber };
