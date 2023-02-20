import { useEffect, useState } from "react";
import { LatLngLiteral } from "../Types/Types";
import { getAddressFrom } from "../Services/main.services";

const StopOption = (props: { position: LatLngLiteral }) => {
  const { position } = props;

  const [stopDirection, setStopDirection] = useState<string>();

  const getAddress = async (position: LatLngLiteral) => {
    const addressFromStop = await getAddressFrom(position);
    addressFromStop && setStopDirection(addressFromStop);
  };

  useEffect(() => {
    position && getAddress(position);
  }, [position]);

  return <span>{stopDirection}</span>;
};

export default StopOption;
