import OptionButton from "../../Components/OptionButton";
import "./HomePage.css";

const HomePage = () => {

  return (
    <div className="homePage">
      <div className="optionsPanel">
        <OptionButton text="Mapa" icon="Mapa" to="./map"/>
        <OptionButton text="Clientes" icon="Usuarios" to="./clients"/>
        <OptionButton text="Servicios" icon="Servicios" to="./services"/>
        <OptionButton text="Rutas" icon="Rutas" to="./routes"/>
        <OptionButton text="Guía" icon="Guía" to="./help"/>
      </div>
    </div>
  );
};

export default HomePage;
