import { Link } from "react-router-dom";
import headerLogo from "./assets/headerLogo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerBody">
      <img src={headerLogo} className="headerIcon" alt="Logo Salesianos" />
      <div className="buttonPanel">
        <Link to="./home" className="headerButton link">
          Inicio
        </Link>
        <Link to="./" className="headerButton link">
          Mapa
        </Link>
        <Link to="./" className="headerButton link">
          Usuarios
        </Link>
        <Link to="./" className="headerButton link">
          Guía
        </Link>
        <Link to="./" className="headerButton link">
          Servicios
        </Link>
        <Link to="./" className="headerButton link">
          Ajustes
        </Link>
      </div>
    </div>
  );
};

export default Header;
