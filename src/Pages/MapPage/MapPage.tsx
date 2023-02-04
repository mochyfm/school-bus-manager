import "./MapPage.css";

import { useLoadScript } from '@react-google-maps/api'
import { RiMapPinAddFill } from 'react-icons/ri';
import { TbMap2 } from 'react-icons/tb';
import Map from "../../Components/MapComponents/Map";
import Loading from "../../Components/Loading";

const MARKERS_SIZE = 70;

const MapPage = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI",
    libraries: ["places"],
  });

  return (
    <div className="mapBlock">
      <div className="mapZone">
        {isLoaded ? <Map /> : <Loading />}
      </div>
      <div className="markMenu">
        <button className="addMarkerButton">
        <RiMapPinAddFill size={MARKERS_SIZE} />
        </button>
        <button className="markerListButton">
          <span className="markerListText">Lista de Paradas</span>
          <TbMap2 size={MARKERS_SIZE}/>
        </button>
      </div>
    </div>
  );
};

export default MapPage;
