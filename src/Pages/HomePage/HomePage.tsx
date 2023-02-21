import OptionButton from "../../Components/OptionButton";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="title">
        <h1>Transportes Salesianos LC</h1>
      </div>
      <div className="optionsPanel">
        <OptionButton text="Mapa" icon="Mapa" to="./map" />
        <OptionButton text="Clientes" icon="Usuarios" to="./clients" />
        <OptionButton text="Rutas" icon="Rutas" to="./routes" />
      </div>
    </div>
  );
};

export default HomePage;
