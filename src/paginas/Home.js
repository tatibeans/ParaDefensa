import Menu from './Menu';
import Login from './Login';
import React, { useState, useEffect } from 'react';
import {
      useNavigate,
      Outlet
} from 'react-router-dom';
import { borrarCookie, valorCookie } from '../Funciones';


// hacer algo más interesante después
export default function Home(props) {
      if (!props.fijarResCookie()) {
            return <Login nomCentro={props.nomCentro} setEstado={props.setEstado} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
      } else {
            return <Menu nomCentro={props.nomCentro} res={props.residentes} ingreso={props.ingreso} setIngreso={props.setIngreso} />;
      }

}
