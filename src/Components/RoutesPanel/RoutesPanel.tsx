import React from "react";
import "./RoutesPanel.css";
import { RoutePanelOptions } from "../../Types/Types";
import RouteCard from "../Cards/RouteCard/RouteCard";

const RoutesPanel = (props: RoutePanelOptions) => {
  const { routes } = props;

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
            />
          );
        })}
    </div>
  );
};

export default RoutesPanel;
