const routesManager = {
  index: "/",
  start: "/start",
  play: "/play",
  win: "/win",
  lose: "/lose",
  error: "/error",
};

const mapRoute = (page) => {
  return routesManager[page];
};

export { mapRoute };
