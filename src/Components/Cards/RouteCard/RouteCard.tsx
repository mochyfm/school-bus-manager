import React from "react";
import { RouteCardProperties } from "../../../Types/Types";
import "./RouteCard.css";
import StopCard from "../StopCard/StopCard";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaSchool } from "react-icons/fa";

const RouteCard = (props: RouteCardProperties) => {
  const { route_id, route_type, label, stops } = props;
  console.log([{ ...props }]);

  return (
    <div className="routeCardBody">
      <h1>
        Ruta: {label}{" "}
        {route_type === "one_way_trip"
          ? " ( De Casa al Colegio )"
          : " ( Del Colegio a Casa )"}
      </h1>
      <div className="routeCardStopsBody">
        <div>
          {stops &&
            stops.map(({ lat, lng, stop_id }, index) => {
              return (
                <StopCard
                  key={index}
                  latLng={{ lat: lat, lng: lng }}
                  label={label}
                  stop_id={stop_id}
                  stopNumber={index + 1}
                />
              );
            })}
          <HiOutlineArrowSmDown className="routeIcon" />
        </div>
        {route_type === "one_way_trip" ? (
          <FaSchool className="routeIcon" />
        ) : (
          <MdOutlineHomeWork className="routeIcon" />
        )}
      </div>
    </div>
  );
};

export default RouteCard;
