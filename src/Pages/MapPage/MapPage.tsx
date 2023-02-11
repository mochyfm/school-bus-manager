import "./MapPage.css";

import { useState } from "react";
import { RiMapPinAddLine } from "react-icons/ri";
import { TbMapPinOff } from "react-icons/tb";
import Map from "../../Components/MapComponents/Map";
import Loading from "../../Components/Loading";
import { BusStop, ModeOptions } from "../../Types/Types";

const MapPage = (props : { isLoaded : Boolean }) => {

  const { isLoaded } = props;
  const [mode, setMode] = useState<ModeOptions>();
  
  const handleOption = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { currentTarget } = event;
    setMode(
      currentTarget.name !== mode ? (currentTarget.name as ModeOptions) : "none"
    );
  };

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
          <RiMapPinAddLine className="addIcon"/>
        </button>
        <button
          className={`deleteMarkerButton ${
            mode === "delete" && "selectedButton"
          }`}
          onClick={(e) => handleOption(e)}
          name="delete"
        >
          <TbMapPinOff className="deleteIcon" />
        </button>
      </div>
    </div>
  );
};

export default MapPage;
