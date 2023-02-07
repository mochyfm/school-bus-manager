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
    name: 'Jose Luis Benitze',
    service: serviceExample
}

const student2 : Student = {
    name: 'Marcos Luis Benitze',
    service: serviceExample,
}

export const example: ClientData = {
  name: "Jose Benítez",
  studentsAssigned: [student1, student2],
  service: serviceExample,
};