import companyLogo from "./assets/companyLogo.png";
import './Footer.css'

const Footer = () => {
  return (
    <>
      <footer className="footerBlock">
        <span>Powered By</span>
        <img
          className="companyLogo"
          src={companyLogo}
          alt="Oceanida S.L Logo"
        />
      </footer>
    </>
  );
};

export default Footer;
