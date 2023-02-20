import axios from "axios";
import {
  BusRoute,
  BusStop,
  Client,
  LatLngLiteral,
  MapLibraries,
  Message,
  Student,
  StudentSubmit,
} from "../Types/Types";

const API_MAIN_URL = "http://localhost:7500/tslc";

export const getAllClients = async (): Promise<Client[]> => {
  return await axios
    .get(`${API_MAIN_URL}/clients`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewClient = async (client: Client): Promise<void> => {
  await axios.post(`${API_MAIN_URL}/client`, { ...client });
};

export const editExistingClient = async (client: Client): Promise<void> => {
  await axios.put(
    `${API_MAIN_URL}/client?id=${client.client_id}&newName=${client.client_name}`
  );
};

export const deleteClientById = async (client_id: number): Promise<void> => {
  await axios.delete(`${API_MAIN_URL}/client?id=${client_id}`);
};

export const getClientById = async (client_id: number): Promise<Client> => {
  return await axios
    .get(`${API_MAIN_URL}/client?id=${client_id}`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStudentById = async (student_id: number): Promise<Student> => {
  return await axios
    .get(`${API_MAIN_URL}/student?id=${student_id}`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNewStudent = async (
  student: StudentSubmit
): Promise<void> => {
  await axios.post(`${API_MAIN_URL}/student`, student);
};

export const deleteStudentById = async (studentId: number): Promise<void> => {
  await axios.delete(`${API_MAIN_URL}/student?id=${studentId}`);
};

export const sendMessage = async (message: Message): Promise<void> => {
  await axios.post(`${API_MAIN_URL}/msg`, { ...message });
};

export const getAllRoutes = async (): Promise<BusRoute[]> => {
  return await axios
    .get(`${API_MAIN_URL}/routes`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteRouteById = async (id: number): Promise<void> => {
  return await axios.delete(`${API_MAIN_URL}/route?id=${id}`);
};

export const getAllStops = async (): Promise<BusStop[]> => {
  return await axios
    .get(`${API_MAIN_URL}/stops`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const sendStops = async (stopsList: BusStop[]): Promise<void> => {
  await axios
    .post(`${API_MAIN_URL}/stops`, stopsList)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAddressFrom = async (position: LatLngLiteral) => {
  return await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI`
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.error_message) console.log(response.data.error_message);
      else return response.data.results[1].formatted_address;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const mapLibraries: MapLibraries[] = ["places"];
