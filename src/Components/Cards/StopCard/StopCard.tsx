import { useEffect, useState } from "react";
import { LatLngLiteral, StopCardProperties } from "../../../Types/Types";
import { getAddressFrom } from "../../../Services/main.services";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import "./StopCard.css";
import { GiBusStop } from "react-icons/gi";

const StopCard = (props: StopCardProperties) => {
  const { latLng, label, stopNumber } = props;
  const [direction, setDirection] = useState<String>();

  useEffect(() => {
    const fetchDirection = async (coordinates: LatLngLiteral) => {
      const currentDirection = await getAddressFrom(coordinates);
      currentDirection && setDirection(currentDirection);
    };

    latLng && fetchDirection(latLng);
  }, [latLng]);

  return (
    <div>
      <HiOutlineArrowSmDown className="stopIcon" />
      <div className="stopCardBody">
        <GiBusStop className="stopIcon" />
        <div>
          <div className="stopCardInfo">
            <span className="stopCardInfoTitle">Dirección:</span> {direction?.substring(0, 65)}
          </div>
          <div className="stopCardInfo">
            <span className="stopCardInfoTitle"> Parada Número: </span>
            {stopNumber}
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopCard;
