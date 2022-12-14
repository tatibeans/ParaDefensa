import React, { useState, useLayoutEffect, useEffect } from 'react';
import './App.css';
import Login from './paginas/login';
import Menu from './paginas/menu';
import Alerta from './paginas/alerta';
import CambiarPass from './paginas/cambiarPass';
import Home from './paginas/Home';
import Insumos from './paginas/insumos';
import SignosVitales from './paginas/signosVitales';
import Tratamientos from './paginas/tratamientos';
import Estudios from './paginas/estudios';
import Consultas from './paginas/consultas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { valorCookie } from './Funciones';
import { waitUntil } from 'workbox-core/_private';


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

  let logueado = false;

  useEffect(async () => {
    logueado = await fijarResCookie();
  }, []);

  

  const modificarState = (e) => {

    e.forEach(element => {
      setresidentes((current) => [...current, element]);
    }
    );
  }

  function yaEstaLogueado() {

  }

  const fijarResCookie = async function () {
    let valor = document.cookie;
    if (valor != null && valor != "" && valor != undefined) {
      valor = valor.split('; ')
        .find((row) => row.startsWith("usuario="))
        .split('=')[1];

      let datos = valor.split('|');
      let ci = datos[1].split(':')[1];
      let token = datos[2].split(':')[1];

      const usu = await fetch(`https://calisto-hilosdeplata.azurewebsites.net/api/PWA/BuscarUsuarioLogueado?cedula=${ci}&centro=${props.nomCentro}`)
      .catch((e) => {alert(e.message)});
      const jeison = await usu.json();
      if (jeison != null) {
        document.cookie = `usuario=nombre:${jeison.Nombre}|cedula:${jeison.Cedula}|token:${jeison.TokenPWA}`;
        setresidentes([]);
        const mods = modificarState(jeison.Residentes);
        return true;
      } else {
        console.log("datos nulos");
      }
    } else {
      return false;
    }

  };

  const usuarioYaLogueado = async () => {
    caches.open('dynamic-v1').then(c => {
      let usu = c.usuLogueado;
      if (usu != null && usu != "" && usu) {
        modificarState(usu.Residentes);
        return true;
      }
      return false;
    })
  }

  // es el residente activo
  const modUsuActivo = (e) => {

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
        basename="/"
        location={state.location}
        navigationType={state.action}
        navigator={history}>
        <Routes>

          <Route exact path="/" element={<Home nomCentro={props.nomCentro} setEstado={modificarState}
            res={residentes} ingreso={ingresoUnaVez} setIngreso={setIngreso} fijarResCookie={fijarResCookie}
            modUsuActivo={modUsuActivo} activoUsu={activoUsu} imgResidente={imgResidente}
            logueado={logueado} setresidentes={setresidentes}/>} />

          <Route path="/alerta" element={<Alerta fijarResCookie={fijarResCookie} />} />
          <Route path="/cambiarPass" element={<CambiarPass fijarResCookie={fijarResCookie} />} />
          <Route path="/estudios" element={<Estudios fijarResCookie={fijarResCookie} />} />
          <Route path="/consultas" element={<Consultas fijarResCookie={fijarResCookie} />} />
          <Route path="/insumos" element={<Insumos fijarResCookie={fijarResCookie} />} />
          <Route path="/login" element={<Login nomCentro={props.nomCentro} setEstado={modificarState} />} />

          <Route path="/menu" element={<Menu nomCentro={props.nomCentro} res={residentes}
            modUsuActivo={modUsuActivo} activoUsu={activoUsu} imgResidente={imgResidente}
            modificarState={modificarState} fijarResCookie={fijarResCookie} setresidentes={setresidentes}/>} />

          <Route path="/signosVitales" element={<SignosVitales fijarResCookie={fijarResCookie} />} />
          <Route path="/tratamientos" element={<Tratamientos fijarResCookie={fijarResCookie} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}



export default App;