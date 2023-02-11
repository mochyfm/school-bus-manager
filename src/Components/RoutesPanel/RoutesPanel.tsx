import { BusRoute } from "../../Types/Types";
import { useEffect, useState } from "react";
import RouteCard from "../Cards/RouteCard";
import "./RoutesPanel.css";

const RoutesPanel = ({
  routesList,
  showDelete,
  onDelete,
  showRoute,
}: {
  routesList: BusRoute[];
  onDelete: Function;
  showRoute: Function;
  showDelete: boolean;
}) => {
  const [listOfRoutes, setListOfRoutes] = useState<BusRoute[]>([]);

  useEffect(() => {
    routesList && setListOfRoutes(routesList);
  }, [routesList]);

  return (
    <div className="routesPanelBlock">
      <div className="routesPanelList">
        {listOfRoutes &&
          listOfRoutes.map((element) => {
            console.log(element);
            return (
              <RouteCard
                key={element.id}
                routeInfo={element}
                onDeleteClick={onDelete}
                showRoute={showRoute}
                showDelete={showDelete}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RoutesPanel;
