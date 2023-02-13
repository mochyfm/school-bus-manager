import "./MapPage.css";

import { useState } from "react";
import { RiMapPinAddLine } from "react-icons/ri";
import { TbMapPinOff } from "react-icons/tb";
import Map from "../../Components/Map";
import Loading from "../../Components/Loading";
import { BusStop, ModeOptions } from "../../Types/Types";
import { FaRegSave } from "react-icons/fa";

const MapPage = (props: { isLoaded: Boolean }) => {
  
  const { isLoaded } = props;
  
  const [busStops, setBusStops] = useState<BusStop[]>([]);

  const [mode, setMode] = useState<ModeOptions>('none');

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
        <div className="addDeleteSection">
          <button
            className={`addMarkerButton ${mode === "add" && "selectedButton"}`}
            onClick={(e) => handleOption(e)}
            name="add"
          >
            <RiMapPinAddLine className="addIcon" />
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
        <div>
          <button className={`saveButton ${((mode !== 'none') && busStops) && 'disabled'}`}>
            <FaRegSave className="saveIcon"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
