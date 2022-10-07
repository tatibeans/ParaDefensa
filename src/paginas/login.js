import Titulo from "../componentes/Titulo";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Loading from "../componentes/Loading";
import ToastMessage from "../componentes/Toast";
import { Toast, Button } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";

function Login(props) {
  const password = useRef(null);
  const cedula = useRef(null);
  const divContenedor = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("top-center");
  let primerIngreso = false;

  let navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const usu = await loguearUsuario(props.nomCentro, cedula, password);
  };

  async function loguearUsuario(nomCentro, cedula, password) {
    setIsLoading(true);
    const usuario = fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/LogIn?cedula=${
        cedula.current.value
      }&pass=${password.current.value}&centro=${nomCentro}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data != null && data.TokenPWA != null) {
          // caches.open('dynamic-v1').then(c => {
          //   c.add([
          //     usuLogueado, data.json()
          //   ])
          // })

          document.cookie = `usuario=nombre:${data.Nombre}|cedula:${data.Cedula}|token:${data.TokenPWA}`;
         

          props.setEstado(data.Residentes);
          setIsLoading(false);
          if (!props.ingreso){
            props.setIngreso(true);
            empezarIntervalo();
          }
          return navigate("/menu");
        } else {
          setShow(true);
          setIsLoading(false);
        }
      });
  }


  function empezarIntervalo(){
    const intervalo = setInterval(() => {
      
      let usu = fetch("https://proyectocalistoortapi.azurewebsites.net/api/PWA/LogIn?cedula=51364829&pass=Calisto2022!&centro=HilosDePlata");
      if (usu != null){
        if (window.Notification){
          if (Notification.permission === 'granted'){
            new Notification("¡Notificaciones activadas! Buen día " + usu.Nombre);
          } else {
            Notification.requestPermission(permiso => {
              if (permiso === 'granted') new Notification("¡Gracias por activar sus notificaciones! Buen día " + usu.Nombre);
              
            })
          }
        }
      }
    }, 1000 * 60 * 60 * 24);
  }

  // function empezarIntervalo(){
  //   const intervalo = setInterval(() => {
  //     let horaActual = new Date().getHours();
  //     while(horaActual < 10 || horaActual > 14){
  //       setTimeout(1000 * 60 * 60);
  //     }

      
  //   }, 1000 * 60 * 60 * 24);
  // }

  function serializarFecha(fecha) {
    //2022-09-06T12:20:28.75
    let sinHora = fecha.split("T")[0];
    let numeros = sinHora.split("-");
    return numeros[2] + "/" + numeros[1] + "/" + numeros[0];
  }

  return (
    <div className="divHeader">
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="Auth-form-container" ref={divContenedor}>
        <ToastContainer className="p-3" position={position}>
          <Toast
            onClose={() => setShow(false)}
            autohide
            show={show}
            delay={3000}
          >
            <Toast.Header>
              <strong className="mr-auto">CalistoPWA -</strong>
              <small> Mensaje</small>
            </Toast.Header>
            <Toast.Body>Usuario o contraseña incorrectos</Toast.Body>
          </Toast>
        </ToastContainer>
        <form className="Auth-form" onSubmit={manejarSubmit}>
          <div className="Auth-form-content">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                border: 0,
              }}
            >
              <Box
                component="img"
                sx={{
                  height: "50%",
                  width: "50%",
                  border: 0,
                }}
                alt="Logo"
                src="192x192.png"
              />
            </Box>

            {/* <img src={"./img/192.png"} style={{ width: "50%" , heigth:"50%"}} /> */}
            <div className="form-group mt-3">
              <label>Cédula</label>
              <input
                type="text"
                className="form-control mt-1"
                id="txtCedula"
                placeholder="Ingrese su cédula sin puntos ni guiones"
                ref={cedula}
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Ingrese su contraseña"
                id="txtPass"
                ref={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" id="btnLogin">
                {isLoading ? <Loading /> : "Ingresar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Box>
    </div>
  );
}



Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
