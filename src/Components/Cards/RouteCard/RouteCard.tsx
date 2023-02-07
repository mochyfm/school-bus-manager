import { useState } from 'react'

import { getAddressFrom } from "../../../Services/Services";
import { BusRoute, LatLngLiteral } from "../../../Types/Types";

const RouteCard = (props : BusRoute) => {
  const { busesAmount, stops, totalUsers } = props;

  return (
    <div>
      <div>{busesAmount}</div>
      <></>
    </div>
  );
};

export default RouteCard;
