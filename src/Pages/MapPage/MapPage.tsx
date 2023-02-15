import "./MapPage.css";

import { useEffect, useState } from "react";
import { RiMapPinAddLine } from "react-icons/ri";
import { TbMapPinOff } from "react-icons/tb";
import Map from "../../Components/Map";
import Loading from "../../Components/Loading";
import { BusStop, LatLngLiteral, ModeOptions } from "../../Types/Types";
import { FaRegSave } from "react-icons/fa";
import { getAllStops, sendStops } from "../../Services/main.services";

const MapPage = (props: { isLoaded: Boolean }) => {
  const { isLoaded } = props;

  const [originalLnght, setOriginalLnght] = useState<number>(0);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [mode, setMode] = useState<ModeOptions>("none");

  useEffect(() => {
    
    const getStops = async () => {
      const stops = await getAllStops();
      setBusStops(stops);
      stops && setOriginalLnght(stops.length);
    };

    getStops();

  }, []);

  const handleOption = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { currentTarget } = event;
    setMode(
      currentTarget.name !== mode ? (currentTarget.name as ModeOptions) : "none"
    );
  };

  const appendStop = (position: LatLngLiteral) => {
    setBusStops([...busStops, position]);
  };

  const removeStop = (position: LatLngLiteral) => {
    console.log(position);
    setBusStops(
      busStops.filter(
        (element) =>
          element.lat !== position.lat &&
          element.lng !== position.lng &&
          position.lat !== 28.471000822173202 &&
          position.lng !== -16.282717711548084
      )
    );
  };

  const handleSave = () => {
    if (originalLnght !== busStops.length) {
      alert("Lista Actualizada");

      const submitList = async (busStops: BusStop[]) => {
        try {
          await sendStops(busStops);
        } catch (err) {
          console.log(err);
        }
      };

      submitList(busStops);
    }
  };

  return (
    <div className="mapBlock">
      <div className="mapZone">
        {isLoaded ? (
          <Map
            mode={mode}
            busStops={busStops}
            appendStop={appendStop}
            removeStop={removeStop}
          />
        ) : (
          <Loading />
        )}
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
          <button
            onClick={handleSave}
            className={`saveButton ${
              originalLnght === busStops.length && "disabled"
            }`}
          >
            <FaRegSave className="saveIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
