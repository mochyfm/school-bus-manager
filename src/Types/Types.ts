
// Types created for the Map insider //                        

export type ModeOptions = 'delete' | 'add' | 'none'
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
export type MouseEvent = google.maps.MapMouseEvent

export type MapParameters = {
    mode?: ModeOptions
    positions?: BusRoute
}

// Types Created for the Entire App //

export type BusRoute = LatLngLiteral[] 

export type BusStop = {
    id: number,
    name: string,
    latLng: LatLngLiteral,
    totalUsers: number, 
}

export type Service = {
    name: string,
    route: BusRoute,
    amountOfStops: number,
}

export type UserData = {
    id: number,
    studentsAssigned: Student[] | Student,
    services: Service[]
}

export type Student = {
    name: string,
    assignedRoute: BusRoute,
    lastStopTaken?: LatLngLiteral,
}

// Types for the Displaying Card for the Clients

export type ClientCardProperties = {
    title: string,
    subtitle?: string,
    name: string,
    surname?: string,
}