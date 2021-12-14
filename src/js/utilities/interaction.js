const mapToEmoji = (level) => {
  if (level === "easy") {
    return "🐓";
  } else if (level === "middle") {
    return "😐";
  } else if (level === "hard") {
    return "😨";
  } else if (level === "insane") {
    return "🤯";
  }
};

const mapToOperation = (operation) => {
  if (operation === "+") {
    return "➕";
  } else if (operation === "-") {
    return "➖";
  } else if (operation === "*") {
    return "✖️";
  } else if (operation === "/") {
    return "➗";
  }
};

export { mapToEmoji, mapToOperation };
