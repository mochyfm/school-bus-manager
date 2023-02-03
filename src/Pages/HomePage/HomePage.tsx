import OptionButton from "../../Components/OptionButton";
import "./HomePage.css";

const HomePage = () => {

  return (
    <>
      <div className="optionsPanel">
        <OptionButton text="Mapa" icon="Mapa"/>
        <OptionButton text="Usuarios" icon="Usuarios"/>
        <OptionButton text="Servicios" icon="Servicios"/>
        <OptionButton text="Rutas" icon="Rutas" />
        <OptionButton text="Guía" icon="Guía"/>
        <OptionButton text="Ajustes" icon="Ajustes"/>
      </div>
    </>
  );
};

export default HomePage;
