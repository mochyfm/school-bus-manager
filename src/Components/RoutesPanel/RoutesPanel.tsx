import "./RoutesPanel.css";
import RouteCard from "../Cards/RouteCard/RouteCard";
import { RoutePanelOptions } from "../../Types/Types";

const RoutesPanel = (props: RoutePanelOptions) => {
  const { routes, deleteMode, deleteFunction } = props;

  return (
    <div className="routesPanel">
      {routes &&
        routes.map(({ route_id, label, stops, route_type }, index) => {
          return (
            <RouteCard
              key={index}
              route_id={route_id}
              route_type={route_type}
              stops={stops}
              label={label}
              enableDelete={deleteMode}
              onDelete={deleteFunction}
            />
          );
        })}
    </div>
  );
};

export default RoutesPanel;
