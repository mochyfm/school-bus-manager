import { Link, useLocation } from "react-router-dom";
import headerLogo from "./assets/headerLogo.png";
import developerLogo from "./assets/developerLogo.png";

import "./Header.css";

const Header = () => {

  const { pathname } = useLocation();

  return (
    <div className="headerBody">
      <img src={headerLogo} className="headerIcon" alt="Logo Salesianos" />
      <div className="buttonPanel">
        <Link to="./" className={`headerButton link`}>
          Inicio
        </Link>
        <Link to='./map' className={`headerButton link ${pathname === '/map' ? 'current' : ''}`}>
          Mapa
        </Link>
        <Link to='./clients' className={`headerButton link ${pathname === '/clients' ? 'current' : ''}`}>
          Clientes
        </Link>
        <Link to='./services' className={`headerButton link ${pathname === '/services' ? 'current' : ''}`}>
          Servicios
        </Link>
        <Link to="./routes" className={`headerButton link ${pathname === '/routes' ? 'current' : ''}`}>
          Rutas
        </Link>
        <Link to="./help" className={`headerButton link ${pathname === '/help' ? 'current' : ''}`}>
          Guía
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
      <div>
        
      </div>
    </div>
  );
};

export default Header;
