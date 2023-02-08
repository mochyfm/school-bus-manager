import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import InnerLayout from "./Layouts/InnerLayout";
import MapPage from "./Pages/MapPage";
import ClientsPage from "./Pages/ClientsPage";
import ServicesPage from "./Pages/ServicesPage";
import RoutesPage from "./Pages/RoutesPage";
import GuidePage from "./Pages/GuidePage";
import ClientForm from "./Components/ClientForm/ClientForm";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<InnerLayout />}>
          <Route path="/map" element={<MapPage />} />
          <Route path="/map/:latLng" element={<MapPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/newClient" element={<ClientForm/>} />
          <Route path="/editClient/:id" element={<ClientForm/>} />
          <Route path="/studentInfo/:id" element={<p>INFORMACIÓN DE ESTUDIANTE </p>} />     
          <Route path="/message/:id" element={<p>MENSAJE A </p>} />    
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<p>INFORMACION DE SERVICIO</p>} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/help" element={<GuidePage />} />
        </Route>
        <Route path="*" element={<p>NO EXISTE ESTA PÁGINA</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
