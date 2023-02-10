import Loading from "../../Components/Loading";
import Map from "../../Components/MapComponents/Map";
import "./RoutesPages.css";

const RoutesPage = (props: { isLoaded: Boolean }) => {
  
  const { isLoaded } = props;

  return (
    <div className="routesContainer">
      <div className="routesBlock">

      </div>
      <div className="mapBlock">{isLoaded ? <Map mapTopLefMenu={false} streetViewOption={false}/> : <Loading />}</div>
    </div>
  );
};

export default RoutesPage;
