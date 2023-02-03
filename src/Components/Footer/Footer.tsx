import developerLogo from "./assets/developerLogo.png";
import companyLogo from "./assets/Salesianos La Cuesta.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footerBlock">
      <div className="companyBlock">
        <img
          className="companyLogo"
          src={companyLogo}
          alt="Logo Salesianos La Cuesta"
        />
      </div>
      <div className="developerBlock">
        <span>Powered By</span>
        <img
          className="developerLogo"
          src={developerLogo}
          alt="Logo Oceanida S.L"
        />
      </div>
    </footer>
  );
};

export default Footer;
