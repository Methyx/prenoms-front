import { Link, useLocation } from "react-router-dom";

// style
import "../style/header.css";

const Header = () => {
  const location = useLocation().pathname;
  return (
    <header className="container">
      <div className="title">
        <h1>Les prénoms donnés en France entre 1900 et 2021</h1>
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
        <div className="menu">
          <div className={location === "/" ? "button page-location" : "button"}>
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
    </header>
  );
};

export default Header;
