import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import InnerLayout from "../Layouts/InnerLayout";
import MapPage from "../Pages/MapPage";
import ClientsPage from "../Pages/ClientsPage";
import ServicesPage from "../Pages/ServicesPage";
import RoutesPage from "../Pages/RoutesPage";
import GuidePage from "../Pages/GuidePage";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<InnerLayout />}>
          <Route path="/map" element={<MapPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/help" element={<GuidePage />} />
        </Route>
        <Route path="*" element={<p>NO EXISTE ESTA PÁGINA</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
