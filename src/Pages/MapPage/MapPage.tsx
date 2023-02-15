import "./MapPage.css";

import { Store } from "react-notifications-component";

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

  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [mode, setMode] = useState<ModeOptions>("none");

  useEffect(() => {
    const getStops = async () => {
      const stops = await getAllStops();
      setBusStops(stops);
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

  const currentMode = () => {
    switch (mode) {
      case "add":
        return "añadir";
      case "delete":
        return "borrar";
    }
  };

  const handleSave = () => {
    if (mode === "none") {
      const submitList = async (busStops: BusStop[]) => {
        try {
          await sendStops(busStops);
        } catch (err) {
          console.log(err);
        }
      };

      submitList(busStops);
      Store.addNotification({
        title: "¡Hecho!",
        message: "Las Rutas han sido actualizadas correctamente",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 0,
          onScreen: true,
        },
      });
      setTimeout(() => window.location.reload(), 1000);
    } else {
      Store.addNotification({
        title: `AVISO: Menú de ${currentMode()} seleccionado.`,
        message:
          "Debe desmarcar el menu actual para poder guardar.",
        type: "default",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
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
            className={`saveButton ${mode !== "none" && "disabled"}`}
          >
            <FaRegSave className="saveIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
