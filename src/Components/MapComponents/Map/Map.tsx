import { useMemo, useCallback, useRef, useState } from "react";
import { GoogleMap, MarkerF, /* DirectionsRenderer */ } from "@react-google-maps/api";
import headerLogo from "./icons/school.png";
import "./Map.css";

import { LatLngLiteral, MapOptions, MapParameters } from "../../../Types/Types";

const Map = ({ mode, positions = [] }: MapParameters) => {

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 28.470925650919988, lng: -16.282707833890054 }), []
  );

  const [locations, setLocations] = useState<LatLngLiteral[]>([center, ...positions]);

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
      setLocations([...locations, position]);
    }
  };

  const deleteMarker = (position: LatLngLiteral) => {
    console.log(position);
    if (mode === "delete") {
      if (position.lat !== center.lat && position.lng !== center.lng) {
        setLocations(
          locations.filter(
            (element) =>
              element.lat !== position.lat && element.lng !== position.lng
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
                label={index === 0 ? "" : index.toString()}
                position={element}
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
