// Images
import headerImg from "../../images/header-img.png";

const AppHeader = () => {
  return (
    <section className="game-header px-1">
      <header className="row justify-content-start align-items-center">
        <figure className="m-0">
          <img
            src={headerImg}
            width={50}
            alt="App logo"
            className="img-fluid me-2"
          />
          <figcaption className="game-name d-inline primary-color">
            The Numbers Game
          </figcaption>
        </figure>
      </header>
    </section>
  );
};

export default AppHeader;
