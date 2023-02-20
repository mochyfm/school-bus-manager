import { useEffect, useState } from "react";
import { LatLngLiteral, StopCardProperties } from "../../../Types/Types";
import { getAddressFrom } from "../../../Services/main.services";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import "./StopCard.css";
import { GiBusStop } from "react-icons/gi";

const StopCard = (props: StopCardProperties) => {
  const { latLng, label, stopNumber , noArrows = false} = props;
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
      {!noArrows && <HiOutlineArrowSmDown className="arrowStopIcon" />}
      <div className="stopCardBody">
          <GiBusStop className="stopIcon" />
        <div>
          <div className="stopCardInfo">
            <span className="stopCardInfoTitle">Dirección:</span>{" "}
            {direction}
          </div>
          <div className="stopCardInfo">
            <span className="stopCardInfoTitle"> Parada Número: </span>
            {stopNumber}{" - "}
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopCard;
