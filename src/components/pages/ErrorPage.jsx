import { useNavigate } from "react-router";

// Utilities functions
import { mapRoute } from "../../js/utilities/routesManager";

function ErrorPage({ appState, setAppState }) {
  let navigator = useNavigate();

  // Reset to default and back to index page
  const backHome = () => {
    navigator(mapRoute("index"));
  };

  return (
    <div className="container text-center">
      <div className="row my-3">
        <h1>🤔</h1>
        <h1 className="text-warning">404 | Page Not Found</h1>
      </div>
      <div className="row">
        <div className="btns">
          <button
            className="btn btn-primary"
            title="Back to the settings page"
            onClick={backHome}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
