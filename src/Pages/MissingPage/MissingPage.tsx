import React from "react";
import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <div>
        <h1>Error 404 Página no encontrada</h1>
      <h1>¡Vaya! Parece que te has desviado del camino</h1>
      <p>Prueba en acceder a <Link to="/">este sitio.</Link></p>
      <div>
        
      </div>
    </div>
  );
};

export default MissingPage;
