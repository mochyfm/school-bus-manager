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

export type Icons =
  | "Mapa"
  | "Usuarios"
  | "Servicios"
  | "Rutas"
  | "Guía"
  | "Ajustes";

// Types Declared for the DB Map

export type MapParameters = {
  mode?: ModeOptions;
  busStops?: BusStop[];
  routes?: BusRoute;
};

export type BusStop = {
  latLng: LatLngLiteral;
  totalUsers?: number;
  routeLabel?: string;
};

export type BusRoute = {
  stops: BusStop[];
  busesAmount: number;
  totalUsers?: number;
};

export type Service = {
  type: "Madrugada" | "Tarde";
  route: BusRoute;
};

// Types Declared for the DB Clients

export type ClientData = {
  id: number;
  name: string;
  studentsAssigned: Student[];
};

export type Student = {
  id: number,
  name: string;
  service: Service;
};