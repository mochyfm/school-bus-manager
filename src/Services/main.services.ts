import axios from "axios";
import { BusStop, Client, LatLngLiteral, MapLibraries, Message, Student, StudentSubmit } from "../Types/Types";

const API_MAIN_URL = 'http://localhost:7500/tslc'

export const getAllClients = async () : Promise<Client[]> => {
    return await axios.get(`${API_MAIN_URL}/clients`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message)
      else return response.data
    }).catch((error) => {
      console.log(error);
    });
} 

export const createNewClient = async (client : Client) : Promise<void> => {
  await axios.post(`${API_MAIN_URL}/client`, {...client});
}

export const getClientById = async (client_id : number) : Promise<Client> => {
  return await axios.get(`${API_MAIN_URL}/client?id=${client_id}`)
  .then((response) => {
    if (response.data.error_message) console.log(response.data.error_message)
    else return response.data
  }).catch((error) => {
    console.log(error);
  });
} 

export const getStudentById = async (student_id : number) : Promise<Student> => {
  return await axios.get(`${API_MAIN_URL}/student?id=${student_id}`)
  .then((response) => {
    if (response.data.error_message) console.log(response.data.error_message)
    else return response.data
  }).catch((error) => {
    console.log(error);
  });
}

export const createNewStudent = async (student : StudentSubmit) : Promise<void> => {
  await axios.post(`${API_MAIN_URL}/student`, student);
}

export const deleteStudentById = async (studentId : number) : Promise<void> => {
  await axios.delete(`${API_MAIN_URL}/student?id=${studentId}`);
}

export const sendMessage = async (message : Message) : Promise<void> => {
  await axios.post(`${API_MAIN_URL}/msg`, {...message});
}

export const getAllStops = async () : Promise<BusStop[]> =>  {
    return await axios.get(`${API_MAIN_URL}/stops`)
    .then((response) => {
      if (response.data.error_message) console.log(response.data.error_message)
      else return response.data
    }).catch((error) => {
      console.log(error);
    });
}

export const sendStops = async (stopsList : BusStop[]) : Promise<void> => {
    await axios.post(`${API_MAIN_URL}/stops`, stopsList)
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });
}

export const getAddressFrom = async (position: LatLngLiteral) => {
  console.log(position);
    return await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI`
    )
    .then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((data) => {
        return data;
      })
    }).catch((error) => {
      console.log(error);
    });
};

export const mapLibraries : MapLibraries[] = ["places"];