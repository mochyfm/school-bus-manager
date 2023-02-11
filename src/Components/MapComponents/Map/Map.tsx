import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  MarkerF /* DirectionsRenderer */,
} from "@react-google-maps/api";
import headerLogo from "./icons/school.png";
import "./Map.css";

import {
  BusStop,
  LatLngLiteral,
  MapOptions,
  MapParameters,
} from "../../../Types/Types";

const Map = ({
  busStops,
  mode,
  customCenter,
  mapTopLefMenu = true,
  streetViewOption = true,
}: MapParameters) => {
  const schoolLocation = useMemo<BusStop>(
    () => ({
      id: 0,
      latLng: { lat: 28.471000822173202, lng: -16.282717711548084 },
    }),
    []
  );

  const centerCords = useMemo<LatLngLiteral>(
    () => (customCenter ? customCenter : schoolLocation.latLng),
    [customCenter, schoolLocation]
  );

  const [locations, setLocations] = useState<BusStop[]>([schoolLocation]);

  useEffect(() => {
    const appendLocations = (busStops: BusStop[]) => {
      setLocations([...locations, ...busStops]);
    };

    busStops && appendLocations(busStops);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busStops]);

  // const [locationsArray, setLocationsArray] = useState<Array<LatLngLiteral>>(locations)

  const MIN_ZOOM_VALUE = 15;
  const MAX_ZOOM_VALUE = 18;
  const ZOOM = 18;

  const mapRef = useRef<GoogleMap>();

  const options = useMemo<MapOptions>(
    () => ({
      disabledDefaultUI: true,
      disableDoubleClickZoom: true,
      clickableIcons: false,
      fullscreenControl: false,
      maxZoom: MAX_ZOOM_VALUE,
      minZoom: MIN_ZOOM_VALUE,
      rotateControl: false,
      mapTypeControl: mapTopLefMenu,
      streetViewControl: streetViewOption,
    }),
    [mapTopLefMenu, streetViewOption]
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <>
      <GoogleMap
        center={centerCords}
        mapContainerClassName="mapContainer"
        onLoad={onLoad}
        options={options}
        zoom={ZOOM}
        onClick={(e) => mode === 'add' && console.log('AÑADOOO:',e.latLng?.toJSON())}
      >
        <>
          {locations.map(({ id, latLng, routeLabel }, index) => {
            return (
              <MarkerF
                icon={id === 0 ? headerLogo : ""}
                key={index}
                label={
                  routeLabel && id !== 0 ? routeLabel : index === 0 ? "" : "?"
                }
                position={latLng}
                onClick={(e) => mode === 'delete' && console.log('BORROOO:', e.latLng?.toJSON())}
                onDblClick={() =>
                  console.log(
                    "SOY EL MARCADOR DE { lat:",
                    latLng.lat,
                    "lng:",
                    latLng.lng
                  )
                }
              />
            );
          })}
          {}
        </>
      </GoogleMap>
    </>
  );
};

export default Map;
