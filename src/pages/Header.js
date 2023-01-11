import { Link, useLocation } from "react-router-dom";

// style
import "../style/header.css";

const Header = () => {
  const location = useLocation().pathname;
  return (
    <header className="container">
      <div className="title">
        <img src={require("../assets/bebe-fille.gif")} alt="bébés" />
        <div className="center">
          <div>
            <h1>Les prénoms en France entre 1900 et 2021</h1>
            <p>
              Source :{" "}
              <a
                href="https://www.insee.fr/fr/statistiques/3532172"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                fichier des prénoms de l'INSEE{" "}
              </a>
            </p>
          </div>
          <div className="menu">
            <div
              className={location === "/" ? "button page-location" : "button"}
            >
              <Link to="/">Classement</Link>
            </div>
            <div
              className={
                location === "/history" ? "button page-location" : "button"
              }
            >
              <Link to="/history">Historique</Link>
            </div>
          </div>
        </div>
        <img src={require("../assets/bebe-garcon.gif")} alt="bébés" />
      </div>
    </header>
  );
};

export default Header;
