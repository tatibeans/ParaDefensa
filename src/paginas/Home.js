import Menu from './menu';
import Login from './login';
import React, { useState, useEffect } from 'react';
import {
      useNavigate,
      Outlet
} from 'react-router-dom';
import { borrarCookie, valorCookie } from '../Funciones';


// hacer algo más interesante después
export default function Home(props) {
      const banderita = props.fijarResCookie().then(b => {
            if (!b) {
                  {console.log("if para enviar al login")}
                  return <Login nomCentro={props.nomCentro} setEstado={props.setEstado} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
            } else {
                  {console.log("if para el menú")}
                  return <Menu nomCentro={props.nomCentro} res={props.residentes} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
            }
      })
      

}
