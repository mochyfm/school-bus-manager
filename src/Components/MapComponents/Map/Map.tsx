import { useMemo, useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, MarkerF, /* DirectionsRenderer */ } from "@react-google-maps/api";
import headerLogo from "./icons/school.png";
import "./Map.css";

import { BusStop, LatLngLiteral, MapOptions, MapParameters } from "../../../Types/Types";

const Map = ({ mode }: MapParameters) => {

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 28.470925650919988, lng: -16.282707833890054 }), []
  );

  const [locations, setLocations] = useState<BusStop[]>([{ latLng: center }]);

  useEffect(() => {
    
  }, [locations])

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
    }),
    []
  );
  
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const addNewMarker = (position: LatLngLiteral) => {
    if (mode === "add") {
      console.log(position);
      setLocations([...locations, { latLng: position }]);
    }
  };

  const deleteMarker = (position: LatLngLiteral) => {
    if (mode === "delete") {
      if (position.lat !== center.lat && position.lng !== center.lng) {
        setLocations(
          locations.filter(
            ({ latLng }) =>
              latLng.lat !== position.lat && latLng.lng !== position.lng
          )
        );
      }
    }
  };

  return (
    <>
      <GoogleMap
        center={center}
        mapContainerClassName="mapContainer"
        onLoad={onLoad}
        options={options}
        zoom={ZOOM}
        onClick={(e) => addNewMarker(e.latLng?.toJSON()!)}
      >
        <>
          {locations.map((element, index) => {
            return (
              <MarkerF
                icon={index === 0 ? headerLogo : ""}
                key={index}
                label={element.routeLabel ? element.routeLabel : (index === 0 ? "" : "?")}
                position={element.latLng}
                onClick={(e) => deleteMarker(e.latLng?.toJSON()!)}
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
