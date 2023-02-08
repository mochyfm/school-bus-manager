import { BusRoute, BusStop, ClientData, Service, Student } from "../Types/Types";

const busStopExample: BusStop = {
  latLng: {lat: 28.47169779741369, lng: -16.283069932107065}, 
  routeLabel: 'M', 
  totalUsers: 10
};

const busRouteExample: BusRoute = {
  stops: [busStopExample],
  busesAmount: 0,
};

const serviceExample: Service = {
  type: "Madrugada",
  route: busRouteExample,
};

const student1 : Student = {
    id: 1,
    name: 'Jose Luis Benitze',
    service: serviceExample
}

const student2 : Student = {
    id: 2,
    name: 'Marcos Luis Benitze',
    service: serviceExample,
}

export const example: ClientData = {
  id: 1,
  name: "Jose Benítez",
  studentsAssigned: [student1, student2],
};

export const example2: ClientData = {
  id: 2,
  name: "Marcos Benítez",
  studentsAssigned: [student1, student2],
};

export const example3: ClientData = {
  id: 3,
  name: "María Benítez",
  studentsAssigned: [student1, student2],
};