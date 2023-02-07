import axios from "axios";
import { LatLngLiteral } from "../Types/Types";

export const getAddressFrom = async (position: LatLngLiteral)  => {
    return await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI`
    )
    .then((response) => {
      if (response.data.error_message) {
        console.log(response.data.error_message);
      } else {
        return response.data.results[0].formatted_address;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
