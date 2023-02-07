import React from "react";
import { Service } from "../../../Types/Types";
import RouteCard from "../RouteCard";

const ServiceCard = (props: Service) => {
  const { route, type } = props;

  return (
    <div>
      <>
        <h5>Ruta de {type}</h5>
        <RouteCard
          busesAmount={route.busesAmount}
          stops={route.stops}
          totalUsers={route.totalUsers}
        />
      </>
    </div>
  );
};

export default ServiceCard;
