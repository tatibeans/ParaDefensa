import Menu from './menu';
import Login from './login';
import React, { useState, useEffect } from 'react';
import {
      useNavigate,
      Outlet
} from 'react-router-dom';
import { borrarCookie, valorCookie } from '../Funciones';



export default function Home(props) {
      let navigate = useNavigate();

      useEffect(() => {
      });

      let valor = document.cookie;

      if (valor != null && valor != "") {
            valor = valor
                  .split("; ")
                  .find((row) => row.startsWith("usuario="))
                  .split("=")[1];
      }


      async function redirigir() {
            const promesa = await props.fijarResCookie();
            if (promesa) return navigate("/menu");


            return <Menu nomCentro={props.nomCentro} res={props.res} ingreso={props.ingreso}
                  setIngreso={props.setIngreso} modUsuActivo={props.modUsuActivo}
                  activoUsu={props.activoUsu} imgResidente={props.imgResidente}
                  modificarState={props.modificarState} fijarResCookie={props.fijarResCookie}
                  setresidentes={props.setresidentes} />;


      }
     
      if (!props.logueado && document.cookie.split("; ").find((row) => row.startsWith("usuario=")) == null) {
            console.log("if para enviar al login")
            return <Login nomCentro={props.nomCentro} setEstado={props.setEstado} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
      } else {
            console.log("if para el menú")
            redirigir();
      }


}
