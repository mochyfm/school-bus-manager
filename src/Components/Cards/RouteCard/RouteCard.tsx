import { TbFocus2 } from "react-icons/tb";
import { BusRoute } from "../../../Types/Types";
import "./RouteCard.css";

import { MdOutlineRemoveCircle } from "react-icons/md";

const RouteCard = ({
  routeInfo,
  onDeleteClick,
  showRoute,
  showDelete = true,
}: {
  routeInfo: BusRoute;
  onDeleteClick: Function;
  showRoute?: Function;
  showDelete?: boolean;
}) => {


  return (
    <div className="routeCard">
      <div className="routeInfoBlock">
        <div className="routeInteractionPanel">
          {!showDelete && (
            <TbFocus2
              className="focusRouteButton"
              onClick={() => showRoute && showRoute(routeInfo.stops)}
            />
          )}
          {showDelete && (
            <MdOutlineRemoveCircle
              className="routeRemoveButton"
              onClick={() => onDeleteClick(routeInfo.id)}
            />
          )}
        </div>
        <div>
          <div className="routeInfo">
            <span>Etiqueta empleada:</span>
            {routeInfo.stops && routeInfo.routeLabel}
          </div>
          <div className="routeInfo">
            <span>Número de Paradas:</  span> {routeInfo.stops.length}
          </div>
        </div>
        <div className="stopsList">
          <div className="listButton">Lista de Paradas</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default RouteCard;
