import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { BusRouteParams, BusStop, LatLngLiteral } from "../../Types/Types";
import StopOption from "../StopOption";
import { getAddressFrom } from "../../Services/main.services";

const QRMaker = (props: BusRouteParams) => {
  const { label, route_id, stops } = props;
  const [addresses, setAddresses] = useState<String[]>();

  useEffect(() => {
    const fetchAddresses = async () => {
      const addresses =
        stops &&
        (await Promise.all(
          stops.map(({ lat, lng }) => getAddressFrom({ lat: lat, lng: lng }))
        ));
      setAddresses(addresses);
    };

    stops && fetchAddresses();
  }, [stops]);

  return (
    <>
      <QRCode
        id={`${route_id}${label}`}
        value={`Ruta ${props.label} (Id: ${route_id}) 
            - Número de paradas: ${stops ? stops.length : 0}
            - Lista de paradas: \n
    ${addresses?.map((element, index) => {
        return ((index+ 1) + ' - ' + element + '\n');
    })}`}
        size={200}
        bgColor={"#FFF"}
        fgColor={"#000"}
        level={"H"}
        includeMargin={true}
      />
    </>
  );
};

export default QRMaker;
