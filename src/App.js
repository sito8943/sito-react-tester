import "./App.css";
import React, { useState } from "react";

import cargas from "./img/cargas.png";
import delantera from "./img/delantera.png";
import trasera from "./img/trasera.png";
import contenedor from "./img/contenedor.png";

function App() {
  // para este ejemplo 74 es el 100%  de un contenedor
  // 74 vendría siendo la altura de la capa que marca lo que no está lleno en el contenedor
  // debajo de esta capa está la capa naranja que indica lo que está lleno
  // las partes del barco, son imágenes con extensión png con las mismas dimensiones h: 160 y w: 118
  // si se va a mover el barco se tiene que cambiar el margin-top que tiene las clases css carga y no-carga
  const [contenedores, setContenedores] = useState([74, 20, 39, 37]); // arreglo con estados con los números que representan la carga
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
