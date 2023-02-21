import { useEffect, useState } from "react";
import { BusRoute, BusStop } from "../../Types/Types";
import "./RouteEdition.css";
import {
  getNotRelatedStops,
  getRouteById,
  sendMessageFromRoute,
  submitRoute,
} from "../../Services/main.services";
import Loading from "../Loading/Loading";
import Map from "../Map/Map";
import StopOption from "../StopOption";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import QRMaker from "../QRMaker/QRMaker";

const RouteEdition = (props: { id: number; isLoaded: boolean }) => {
  const { id, isLoaded } = props;
  const navigate = useNavigate();

  const [routeInfo, setRouteInfo] = useState<BusRoute>();

  const [stopsNotAssigned, setStopsNotAssigned] = useState<BusStop[]>([]);
  const [stopsAssigned, setStopsAssigned] = useState<BusStop[]>([]);

  const [addMode, setAddMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageStatus, setMessageStatus] = useState<boolean>();

  const handleInput = (e: any) => {
    setMessage(e.target.value);
  };

  const renderStops = (stops: BusStop[]) => {
    return (
      <div>
        <h1 className="routeTitleNameForm">
          ID: {routeInfo?.route_id} - Lista de Paradas ruta: "{routeInfo?.label}
          "
        </h1>
        {stops && (
          <div className="listOfStops">
            {stops.map(({ lat, lng }, index) => {
              return (
                <div key={index}>
                  <span className="stopPositionOnRoute">{index + 1}º</span>
                  <StopOption position={{ lat: lat, lng: lng }} />
                </div>
              );
            })}
          </div>
        )}
        {routeInfo && (
          <QRMaker
            label={routeInfo.label}
            route_id={routeInfo?.route_id}
            stops={routeInfo?.stops}
          />
        )}
      </div>
    );
  };

  const sendMessage = () => {
    const submitMessage = async () => {
      routeInfo?.route_id && await sendMessageFromRoute(routeInfo?.route_id, message);
      Store.addNotification({
        title: "Mensaje enviado correctamente.",
        message: "El mensaje se ha enviado a todos los miembros de esta ruta.",
        type: "info",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      setMessage("");
    };

    if (message.trim() !== "") {
      console.log(message);
      routeInfo?.route_id && submitMessage();
    }

    setMessageStatus(!messageStatus);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitStopsOnRoute = async (route_id?: number, stops?: BusStop[]) => {
      route_id && stops && (await submitRoute(route_id, stops));
    };

    if (!addMode) {
      submitStopsOnRoute(routeInfo?.route_id, stopsAssigned);
      Store.addNotification({
        title: "¡Hecho!",
        message: "Se ha guardado la ruta correctamente",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      navigate("/routes");
      window.location.reload();
    }
  };

  const alternateMode = () => {
    console.log(stopsAssigned);
    setAddMode(!addMode);
  };

  const addStop = (stop: BusStop) => {
    setStopsAssigned([...stopsAssigned, stop]);
    setStopsNotAssigned(
      stopsNotAssigned.filter(({ stop_id }) => {
        return stop_id !== stop.stop_id;
      })
    );
  };

  const removeStop = (stop: BusStop) => {
    setStopsNotAssigned([...stopsNotAssigned, stop]);
    setStopsAssigned(
      stopsAssigned.filter(({ stop_id }) => {
        return stop_id !== stop.stop_id;
      })
    );
  };

  useEffect(() => {
    const fetchRoute = async (id: number) => {
      const route = await getRouteById(id);
      setRouteInfo(route);
      route.stops && setStopsAssigned(route.stops);
      fetchNonAssignedStops();
    };

    const fetchNonAssignedStops = async () => {
      const stops = await getNotRelatedStops();
      setStopsNotAssigned(stops);
    };

    if (id) {
      fetchRoute(id);
      fetchNonAssignedStops();
    }
  }, [id]);

  return (
    <div className="editForm">
      <form className="routeEditForm" onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="link msgRouteButton"
            onClick={() => routeInfo && setMessageStatus(!messageStatus)}
          >
            Enviar un mensaje a los estudiantes
          </button>
          {messageStatus && (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 20 }}
            >
              <textarea
                cols={50}
                rows={2}
                style={{
                  display: "block",
                  padding: 10,
                  fontSize: 15,
                  resize: "none",
                }}
                onChange={handleInput}
              />
              <button
                onClick={() => sendMessage()}
                type="button"
                style={{ marginLeft: 10, padding: 10, fontSize: 16 }}
              >
                Enviar mensaje
              </button>
            </div>
          )}
        </div>
        <div className="infoEditRouteMessage">
          <p>
            Nota: Si clickeas en el mapa puedes{" "}
            {addMode
              ? "añadir paradas a esta ruta"
              : "borrar paradas que estén asignadas en esta ruta."}
          </p>
          <p>
            {!addMode &&
              stopsAssigned.length === 0 &&
              "\nAhora mismo no puedes quitar paradas, ya que esta ruta no tiene ninguna parada marcada."}
          </p>
        </div>
        {stopsAssigned && routeInfo?.stops && (
          <div>{renderStops(stopsAssigned)}</div>
        )}
        <div>
          <button className={`saveRouteButton ${addMode && "disabled"}`}>
            Guardar Parada
          </button>
        </div>
      </form>
      <button onClick={alternateMode} className="routeEditButton">
        {addMode ? "Dejar de Añadir" : "Añadir Paradas"}
      </button>
      <div className="routeEditMapBlock">
        {isLoaded ? (
          <Map
            busStops={addMode ? stopsNotAssigned : stopsAssigned}
            mode="delete"
            removeStop={addMode ? addStop : removeStop}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default RouteEdition;
