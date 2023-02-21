import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import InnerLayout from "./Layouts/InnerLayout";
import MapPage from "./Pages/MapPage";
import ClientsPage from "./Pages/ClientsPage";
import ClientForm from "./Pages/ClientForm";
import MessageForm from "./Pages/MessageForm/MessageForm";
import RoutesPage from "./Pages/RoutesPage";
import RouteForm from "./Pages/RouteForm";
import { useLoadScript } from "@react-google-maps/api";
import { mapLibraries } from "./Services/main.services";
import StudentPage from "./Pages/StudentPage/StudentPage";
import StudentForm from "./Pages/StudentForm/StudentForm";
import MissingPage from "./Pages/MissingPage/MissingPage";
import GlobalMessage from "./Pages/GlobalMessage/GlobalMessage";
import AssignRoute from "./Pages/AssignRoute/AssignRoute";

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDDv8vYP-lVOCw68b4SEqTGsJb7u0iQCFI",
    libraries: mapLibraries,
  });

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<InnerLayout />}>
          <Route path="/map" element={<MapPage isLoaded={isLoaded}/>} />
          <Route path="/map/:id" element={<MapPage isLoaded={isLoaded}/>} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/newClient" element={<ClientForm />} />
          <Route path="/editClient/:id" element={<ClientForm />} />
          <Route path="/studentInfo/:id" element={<StudentPage isLoaded={isLoaded}/>} />  
          <Route path="/assign-route/:id" element={<AssignRoute />} />     
          <Route path="/newStudent/:id" element={<StudentForm />} />  
          <Route path="/message/:id" element={<MessageForm />} />    
          <Route path="/routes" element={<RoutesPage isLoaded={isLoaded}/>} />
          <Route path="/routes/:id" element={<RoutesPage isLoaded={isLoaded}/>} />
          <Route path="/routes/newRoute" element={<RouteForm isLoaded={isLoaded} />} />
          <Route path="/routes/editRoute/:id" element={<RouteForm isLoaded={isLoaded} />} />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
