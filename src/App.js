import React, { useState, useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './paginas/Login';
import Menu from './paginas/Menu';
import Alerta from './paginas/Alerta';
import CambiarPass from './paginas/CambiarPass';
import Home from './paginas/Home';
import Insumos from './paginas/Insumos';
import SignosVitales from './paginas/SignosVitales';
import Tratamientos from './paginas/Tratamientos';
import Estudios from './paginas/estudios';
import Consultas from './paginas/consultas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { valorCookie } from './Funciones';


const history = createBrowserHistory();
// const ResidentesContext = React.createContext({ residentes: [], setResidentes: () => {} });

function App(props) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  const [residentes, setresidentes] = useState([]);

  const [activoCi, setActivoCi] = useState("");
  const [activoNom, setActivoNom] = useState("");
  const [activoUsu, setActivoUsu] = useState("");
  const [imgResidente, setImgResidente] = useState("");
  const [ingresoUnaVez, setIngreso] = useState(false);

  const modificarState = (e) => {
    console.log("entro dos");
    console.log(e);
    e.forEach(element => {
      setresidentes((current) => [...current, element]);
    }
    );

  }

  function yaEstaLogueado() {

  }

  const fijarResCookie = async () => {
    let cookieUsu = valorCookie("usuario")

    if (valorCookie("usuario") && activoUsu === "") {
      let datos = cookieUsu.split('|');
      let ci = datos[1].split(':')[1];
      let token = datos[2].split(':')[1];

      const usu = await fetch(`https://proyectocalistoortapi.azurewebsites.net/api/PWA/BuscarUsuario?cedula=${ci}&centro=${props.nomCentro}&token=${token}`).then(d => d.json()).catch(e => alert(e));
      if (usu != null) {
        modificarState(usu.Residentes);
      }
      return true;
    }
    return false;
  };

  // es el residente activo
  const modUsuActivo = (e) => {
    console.log(e);
    setActivoUsu(e);
    setActivoNom(e.Nombre);
    setActivoCi(e.Cedula);
    if (e.Genero == "F") {
      setImgResidente("./img/abuela.jpg");
    } else {
      setImgResidente("./img/abuelito.jpg");
    }
  }


  useLayoutEffect(() => history.listen(setState), [history]);
  return (

    <React.StrictMode>
      <BrowserRouter
        location={state.location}
        navigationType={state.action}
        navigator={history}>
        <Routes>

          <Route exact path="/" element={<Home nomCentro={props.nomCentro} setEstado={modificarState} res={residentes} ingreso={ingresoUnaVez} setIngreso={setIngreso} fijarResCookie={fijarResCookie} />} />

          <Route path="/alerta" element={<Alerta fijarResCookie={fijarResCookie} />} />
          <Route path="/cambiarPass" element={<CambiarPass fijarResCookie={fijarResCookie} />} />
          <Route path="/estudios" element={<Estudios fijarResCookie={fijarResCookie} />} />
          <Route path="/consultas" element={<Consultas fijarResCookie={fijarResCookie} />} />
          <Route path="/insumos" element={<Insumos fijarResCookie={fijarResCookie} />} />
          <Route path="/login" element={<Login nomCentro={props.nomCentro} setEstado={modificarState} />} />

          <Route path="/menu" element={<Menu nomCentro={props.nomCentro} res={residentes} modUsuActivo={modUsuActivo} activoUsu={activoUsu} imgResidente={imgResidente} modificarState={modificarState}  fijarResCookie={fijarResCookie}/>} />

          <Route path="/signosVitales" element={<SignosVitales />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}



export default App;