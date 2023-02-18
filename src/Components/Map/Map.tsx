import { useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  MarkerF /* DirectionsRenderer */,
} from "@react-google-maps/api";
import headerLogo from "./icons/school.png";
import "./Map.css";

import "react-confirm-alert/src/react-confirm-alert.css";

import {
  BusStop,
  LatLngLiteral,
  MapMouseEvent,
  MapOptions,
  MapParameters,
} from "../../Types/Types";

const Map = ({
  busStops,
  appendStop,
  removeStop,
  mode,
  mapTopLefMenu = true,
  streetViewOption = true,
  customCenter,
}: MapParameters) => {

  const schoolLocation = useMemo<BusStop>(
    () => ({
      stop_id: 0,
      lat: 28.471000822173202,
      lng: -16.282717711548084,
    }),
    []
  );

  const centerCords = useMemo<LatLngLiteral>(
    () => (customCenter ? customCenter : { lat: schoolLocation.lat, lng: schoolLocation.lng }),
    [customCenter, schoolLocation]
  );

  const handleAdd = (e: MapMouseEvent) => {
    const position = e.latLng?.toJSON();
    if (mode === "add") {
      position && appendStop && appendStop(position);
    }
  };

  const handleRemove = (e: MapMouseEvent) => {
    const position = e.latLng?.toJSON();
    if (mode === "delete") {
      console.log(position);
      position && removeStop && removeStop(position);
    }
  };

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
        onClick={handleAdd}
      >
        <>
          <MarkerF
            icon={headerLogo}
            key={0}
            label={""}
            position={schoolLocation}
            onDblClick={() => console.log("Salesianos La Cuesta")}
          />
          {busStops &&
            busStops.map(({ stop_id, lat, lng, label }, index) => {
              return (
                <MarkerF
                  key={index + 1}
                  label={!label ? (stop_id === 0) ? "" : stop_id ? stop_id.toString() : "?" : label}
                  position={{ lat, lng }}
                  onClick={handleRemove}  
                  onDblClick={() => console.log('Hola')}
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
