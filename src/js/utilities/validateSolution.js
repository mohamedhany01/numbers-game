const isValidSolution = (solution) => {
  const cleanSolution = solution.trim();

  return (
    cleanSolution.split("").length > 0 &&
    !Number.parseFloat(Number.isNaN(cleanSolution))
  );
};

const isSolutionCorrect = (number1, number2, operation, solution) => {
  const cleanSolution = Number.parseFloat(solution.trim());

  if (operation === "+") {
    return number1 + number2 === cleanSolution;
  } else if (operation === "-") {
    return number1 - number2 === cleanSolution;
  } else if (operation === "*") {
    return number1 * number2 === cleanSolution;
  } else if (operation === "/") {
    const floatRepresentation = number1 / number2;
    return (
      Number.parseFloat(floatRepresentation.toFixed(1)) === cleanSolution ||
      Number.parseFloat(floatRepresentation.toFixed(2)) === cleanSolution ||
      Number.parseFloat(floatRepresentation.toFixed(3)) === cleanSolution
    );
  }
};

export { isSolutionCorrect, isValidSolution };
