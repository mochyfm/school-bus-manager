import "./MapPage.css";

import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { RiMapPinAddLine } from "react-icons/ri";
import { TbMapPinOff } from "react-icons/tb";
import Map from "../../Components/MapComponents/Map";
import Loading from "../../Components/Loading";
import { LatLngLiteral, ModeOptions } from "../../Types/Types";

const MARKERS_SIZE = 50;

const MapPage = () => {

  const [mode, setMode] = useState<ModeOptions>();
  
  const handleOption = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { currentTarget } = event;
    setMode(
      currentTarget.name !== mode ? (currentTarget.name as ModeOptions) : "none"
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI",
    libraries: ["places"],
  });

  return (
    <div className="mapBlock">
      <div className="mapZone">
        {isLoaded ? <Map mode={mode} /> : <Loading />}
      </div>
      <div className="markMenu">
        <button
          className={`addMarkerButton ${mode === "add" && "selectedButton"}`}
          onClick={(e) => handleOption(e)}
          name="add"
        >
          <RiMapPinAddLine size={MARKERS_SIZE} />
        </button>
        <button
          className={`deleteMarkerButton ${
            mode === "delete" && "selectedButton"
          }`}
          onClick={(e) => handleOption(e)}
          name="delete"
        >
          <TbMapPinOff size={MARKERS_SIZE} />
        </button>
      </div>
    </div>
  );
};

export default MapPage;
