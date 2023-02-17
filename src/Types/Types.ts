// Types created for the Map insider //

export type ModeOptions = "delete" | "add" | "none";
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type MapMouseEvent = google.maps.MapMouseEvent;

export type ButtonProps = {
  text: string;
  to?: string;
  icon?: Icons;
  style?: React.CSSProperties;
};

export type MapLibraries =
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization";

export type Icons =
  | "Mapa"
  | "Usuarios"
  | "Servicios"
  | "Rutas"
  | "Guía"
  | "Ajustes";

export type ClientCardType = {
  client_id?: number;
  client_name: string;
  students?: Student[];
  editButton?: boolean;
  createStudentsButton?: boolean;
};

/**
 * TYPES PREPARED FOR THE MAP COMPONENT
 */

/* This type is made for the Map component, it has all its 
  attributes optional, since its made for modifying the existing options */
export type MapParameters = {
  mode?: ModeOptions; // For changing the mode between Add and Remove (For the markers)
  busStops?: BusStop[]; // For showing the Bus stops (in case there are not asigned stops)
  appendStop?: Function;
  removeStop?: any;
  routes?: BusRoute; // For showing the routes and their correspondent BusStop[]
  mainMarker?: LatLngLiteral; // For selecting a custom center for the map
  mapTopLefMenu?: boolean; // For removing the geographic relief and satelite menu (on the top left)
  streetViewOption?: boolean; // For the Street View on the right
  updatedStops?: number;
  setUpdatedStops?: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * TYPES PREPARED FOR THE ROUTESPANEL COMPONENT
 */

export type SetMapCenterHook = React.Dispatch<
  React.SetStateAction<LatLngLiteral>
>;

/**
 * TYPES PREPARED FOR THE DATA BASE
 */

export type BusStop = {
  stop_id?: number;
  direction?: string;
  label?: string;
  lat: number;
  lng: number;
};

export type BusRoute = {
  id: number;
  stops: BusStop[];
  totalUsers?: number;
  routeLabel?: string;
};

export type Message = {
  message_id?: number;
  message?: string;
  message_type: MessageType;
  student_id: number;
  client_id: number;
};

export type MessageOption = {
  value: string;
  label: string;
};

export type MessageType = "serious" | "warning" | "confirm" | "info" | "custom";

export type PredefinedMessage = {
  value: string;
  type: string;
  label: string;
};

export type Client = {
  client_id: number;
  client_name: string;
  students?: Student[];
};

export type Student = {
  student_id: number;
  student_name: string;
  client_id?: number;
  messages?: Message[];
  route?: BusRoute;
};
