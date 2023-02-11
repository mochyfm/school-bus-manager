// Types created for the Map insider //

export type ModeOptions = "delete" | "add" | "none";
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type MouseEvent = google.maps.MapMouseEvent;

export type ButtonProps = {
  text: string;
  to?: string;
  icon?: Icons;
  style?: React.CSSProperties;
};

export type MapLibraries = "drawing" | "geometry" | "localContext" | "places" | "visualization"

export type Icons =
  | "Mapa"
  | "Usuarios"
  | "Servicios"
  | "Rutas"
  | "Guía"
  | "Ajustes";

/**
 * TYPES PREPARED FOR THE MAP COMPONENT
 */

/* This type is made for the Map component, it has all its 
  attributes optional, since its made for modifying the existing options */
export type MapParameters = {
  mode?: ModeOptions; // For changing the mode between Add and Remove (For the markers)
  busStops?: BusStop[]; // For showing the Bus stops (in case there are not asigned stops)
  routes?: BusRoute;  // For showing the routes and their correspondent BusStop[]
  customCenter?: LatLngLiteral; // For selecting a custom center for the map
  mapTopLefMenu?: boolean;  // For removing the geographic relief and satelite menu (on the top left) 
  streetViewOption?: boolean; // For the Street View on the right
};

/**
 * TYPES PREPARED FOR THE ROUTESPANEL COMPONENT
 */

export type SetMapCenterHook = React.Dispatch<React.SetStateAction<LatLngLiteral>>

/**
 * TYPES PREPARED FOR THE DATA BASE
 */

export type BusStop = {
  id: number,
  direction?: string;
  latLng: LatLngLiteral;
  totalUsers?: number;
  routeLabel?: string;
};

export type BusRoute = {
  id: number;
  stops: BusStop[];
  totalUsers?: number;
};

export type Client = {
  id: number;
  name: string;
  studentsAssigned: Student[];
};

export type Student = {
  id: number,
  name: string;
};