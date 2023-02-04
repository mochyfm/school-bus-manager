export type ModeOptions = 'delete' | 'add' | 'none'

export type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
// type MouseEvent = google.maps.MapMouseEvent

export type MapParameters = {
    mode?: ModeOptions
    positions?: LatLngLiteral[]
}