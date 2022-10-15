import Menu from './menu';
import Login from './login';
import React, { useState, useEffect } from 'react';
import {
      useNavigate,
      Outlet
} from 'react-router-dom';
import { borrarCookie, valorCookie } from '../Funciones';



export default function Home(props) {
      useEffect(() => {
            llamarNotifs();
      }, []);
      
      async function llamarNotifs() {
      
      }

      // res={residentes} modUsuActivo={modUsuActivo} activoUsu={activoUsu} imgResidente={imgResidente} modificarState={modificarState} fijarResCookie={fijarResCookie}
     
            if (!props.logueado) {
                  {console.log("if para enviar al login")}
                  return <Login nomCentro={props.nomCentro} setEstado={props.setEstado} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
            } else {
                  {console.log("if para el menú")}
                  
                  return <Menu nomCentro={props.nomCentro} res={props.res} ingreso={props.ingreso} setIngreso={props.setIngreso} modUsuActivo={props.modUsuActivo} 
                  activoUsu={props.activoUsu} imgResidente={props.imgResidente} modificarState={props.modificarState} fijarResCookie={props.fijarResCookie}/>;
            }
    /*  })*/
      

}
