import Titulo from "../componentes/Titulo";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown, Container, Row, Col, Image, Card } from 'react-bootstrap';
import { Box, Avatar, Select, InputLabel, MenuItem, Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, Backdrop, CircularProgress } from '@mui/material'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SelectChangeEvent } from "@mui/material/Select";
import { notificar } from '../Funciones';

function Menu({ nomCentro, res, modUsuActivo, activoUsu, imgResidente, modificarState, fijarResCookie, setresidentes }) {
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  useEffect(async () => {
    const porfaFunciona = await fijarResCookie();
    cargarUsuyRes();

  }, []);

  window.addEventListener("load", (event) => {
    event.preventDefault();
    navigate("/menu");
  });

  function cargarUsuyRes() {

      modUsuActivo(res[0]);

    let tokenCookie = document.cookie.split('; ')
       .find((row) => row.startsWith("usuario="))
       .split('=')[1].split("|")[2].split(":")[1];


    setToken(tokenCookie);
  }



  async function buscarResidentes(usuario){
    //string cedula, string centro, string token
    let datosUsu = usuario.split('|');
    let ci = datosUsu[1].split(':')[1];
    let suToken = datosUsu[2].split(':')[1];

    const residentes = await fetch( `https://proyectocalistoortapi.azurewebsites.net/api/PWA/BuscarUsuario?cedula=${
      ci
    }&centro=${nomCentro}&token=${suToken}`);
    return residentes;
  }



  const handleChange = (e) => {
    modUsuActivo(e.target.value);
  };

  const navSeccionMenu = (
    <Accordion sx={{ mb: 4 }}>
      <AccordionSummary
        expandIcon={<Avatar alt="Abuela" src={imgResidente} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{activoUsu.Nombre}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>
            <Typography>Cédula: {activoUsu.Cedula}</Typography>
          </li>
          <li>
            <Typography>Fecha de nac.: {activoUsu.FechaNacimiento} </Typography>
          </li>
          <li>
            <Typography>Mutualista: {activoUsu.Mutualista} </Typography>
          </li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );

  const SelecResPrueba = (
    <FormControl sx={{ mb: 4 }} fullWidth>
      <InputLabel id="demo-simple-select-label">Residente</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={activoUsu}
        label="Residente"
        onChange={handleChange}
      >
        {res?.map((nom) => (
          <MenuItem value={nom}>{nom.Nombre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  function salir() {
    document.cookie = 'usuario=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    modUsuActivo("");
    setresidentes([]);
    navigate("/");
  }


  const cabezal = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "auto",
          alignItems: "center",
          height: "10%",
          backgroundColor: "primary.light",
          boxShadow: 2,
        }}
        px={2}
      >
        <Avatar
          alt="logo"
          src="192x192.png"
        // sx={{ width: auto, height: 20 }}
        />
        <Titulo texto="Hilos De Plata" />

        <Typography style={{ color: 'white' }} variant="h6" onClick={salir}> Salir </Typography>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );

  const htmlMenu = (
    <>
    <div className="row justify-content-evenly mt-2 mb-4">
    <button className="btn btn-primary" styles="width: 150px;" onClick={evt => notificar(evt, activoUsu.Cedula, nomCentro, token)} id={"btnNotificar"}>Recibir notificaciones ahora</button>
    </div>
      <div className="row justify-content-evenly mt-2 mb-4">
        <div className="col-xs-10 col-md-5">
          <Link
            to="/SignosVitales"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card>
              <Card.Img variant="top" src="./img/6.png" />
              <Card.Body>
                <Card.Title>Signos Vitales</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-xs-10 col-md-5">
          <Link
            to="/tratamientos"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card>
              <Card.Img variant="top" src="./img/1.png" />
              <Card.Body>
                <Card.Title>Tratamientos</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>

      <div className="row justify-content-evenly mt-2 mb-4">
        <div className="col-xs-10 col-md-5">
          <Link
            to="/estudios"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card>
              <Card.Img variant="top" src="./img/5.png" />
              <Card.Body>
                <Card.Title>Estudios</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-xs-10 col-md-5">
          <Link
            to="/insumos"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card>
              <Card.Img variant="top" src="./img/3.png" />
              <Card.Body>
                <Card.Title>Insumos</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>

      <div className="row justify-content-evenly mt-2 mb-4">
        <div className="col-xs-10 col-md-5">
          <Link
            to="/consultas"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card border="ligth">
              <Card.Img variant="top" src="./img/2.png" />
              <Card.Body>
                <Card.Title>Consultas</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-xs-10 col-md-5">
          <Link
            to="/alerta"
            state={{
              cedulaRes: activoUsu.Cedula,
              nomRes: activoUsu.Nombre,
              centro: nomCentro,
              usuToken: token,
              imgResidente: imgResidente,
            }}
          >
            <Card>
              <Card.Img border="ligth" variant="top" src="./img/4.png" />
              <Card.Body>
                <Card.Title>Alertas</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );

  if (res.length > 1) {
    return (
      <>
        <div className="divHeader">
          {cabezal}
          {navSeccionMenu}
          {SelecResPrueba}
        </div>
        {htmlMenu}
      </>
    );
  } else {
    return (
      <>
        <div className="divHeader">
          {cabezal}
          {navSeccionMenu}
        </div>
        {htmlMenu}
      </>
    );
  }
}

export default Menu;
