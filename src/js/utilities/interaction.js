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

const noAccessAllowed = () => {
    return "⛔ No access is allowed.";
}

export { mapToEmoji, mapToOperation, noAccessAllowed };
