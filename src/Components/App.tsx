import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "../Pages/Login/Login";
import HomePage from "../Pages/HomePage";
import Footer from "./Footer/Footer";
import Layout from "../Pages/Layout";

function App() {

  return (
    <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/student/:id" element={} /> */}
          </Route>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
