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

type RouteType = 'one_way_trip' | 'return_trip'

export type ClientCardType = {
  client_id?: number;
  client_name: string;
  students?: Student[];
  editButton?: boolean;
  deleteButton ?: boolean;
  createStudentsButton?: boolean;
  enableDeleteStudents?: boolean;
  deleteStudentFunction ?: Function;
  deleteClientFunction ?: Function;
};

export type RoutePanelOptions = {
  routes?: BusRoute[];
}

export type RouteCardProperties = {
  route_id: number,
  route_type: RouteType,
  stops ?: BusStop[],
  label : string,
}

export type StopCardProperties = {
  stop_id?: number;
  label?: string;
  latLng: LatLngLiteral;
  stopNumber: number;
}

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
  customCenter ?: LatLngLiteral;
  setUpdatedStops?: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * TYPES PREPARED FOR THE ROUTESPANEL COMPONENT
 */

export type SetMapCenterHook = React.Dispatch<
  React.SetStateAction<LatLngLiteral>
>;

/**
 * TYPES PREPARED FOR THE DATABASE
 */

export type BusStop = {
  stop_id?: number;
  label?: string;
  lat: number;
  lng: number;
};

export type BusRoute = {
  route_id: number;
  stops: BusStop[];
  label: string;
  route_type: 'one_way_trip' | 'return_trip';
};

export type Message = {
  message_id?: number;
  message?: string;
  message_type: MessageType;
  student_id: number;
  client_id: number;
  sended_at?: string;
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
  route?: BusRoute | BusRoute[];
};

export type StudentSubmit = {
  client_id: number;
  student_name: string;
}

export type StudentCard = {
  student_id: number;
  student_name: string;
  client_id?: number;
  messages?: Message[];
  route?: BusRoute;
  deleteEnabled?: boolean;
  deleteFunction ?: Function;
};

