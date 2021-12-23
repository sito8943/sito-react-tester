import "./App.css";
import React, { useState } from "react";

import cargas from "./img/cargas.png";
import delantera from "./img/delantera.png";
import trasera from "./img/trasera.png";
import contenedor from "./img/contenedor.png";

function App() {
  // para este ejemplo 74 es el 100%  de un contenedor
  const [contenedores, setContenedores] = useState([74, 20, 39, 37]);
  return (
    <div className="App">
      <img src={trasera} alt="trasera" className="trasera" />
      {contenedores.map((d, i) => {
        return (
          <div className="contenedor-div">
            <img src={cargas} alt="carga" className="carga" />
            <div style={{ height: d }} className="no-carga"></div>
            <img src={contenedor} alt="contenedor" className="contenedor" />
          </div>
        );
      })}
      <img src={delantera} alt="delantera" className="delantera" />
    </div>
  );
}

export default App;
