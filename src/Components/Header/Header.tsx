import { Link, useLocation } from "react-router-dom";
import headerLogo from "./assets/headerLogo.png";
import developerLogo from "./assets/developerLogo.png";

import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="headerBody">
      <Link to="./" className="leftIcon link">
        <img src={headerLogo} className="headerIcon" alt="Logo Salesianos" />
        <span className="headerIconText">Volver al inicio</span>
      </Link>
      <div className="buttonPanel">
        <Link
          to="./map"
          className={`headerButton link ${
            pathname === "/map" ? "current" : ""
          }`}
        >
          Mapa
        </Link>
        <Link
          to="./clients"
          className={`headerButton link ${
            pathname === "/clients" ? "current" : ""
          }`}
        >
          Clientes
        </Link>
        <Link
          to="./routes"
          className={`headerButton link ${
            pathname === "/routes" ? "current" : ""
          }`}
        >
          Rutas
        </Link>
      </div>
      <div className="developerBlock">
        <span>Powered By</span>
        <img
          className="developerLogo"
          src={developerLogo}
          alt="Logo Oceanida S.L"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Header;
