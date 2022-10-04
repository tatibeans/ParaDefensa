import Titulo from "../componentes/Titulo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Estudios({fijarResCookie}) {
  const location = useLocation();
  const cedulaRes = location.state.cedulaRes;
  const nomRes = location.state.nomRes;
  const token = location.state.usuToken;
  const nomCentro = location.state.centro;
  const imgResidente = location.state.imgResidente;
  const [estudios, setEstudios] = useState(null);
  
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fijarResCookie()
    setOpen(!open);
    buscarEstudios();
  }, []);

  function navegar() {
    return navigate("/menu");
  }

  async function buscarEstudios() {
    
    const estyCons = fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/GetEstudios?cedula=${cedulaRes}&centro=${nomCentro}&token=${token}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data === "No hay estudios ingresados.") {
          setEstudios([]);
          setOpen(false);

        } else {
          setEstudios(data);
          setOpen(false);
        }
      });
  }

  const navSeccion = (
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
      <ArrowCircleLeftIcon onClick={navegar} />
      <Titulo texto="Estudios" />
      <Avatar
        alt="Abuela"
        src={imgResidente}

      />
              <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </Box>
  );

  if (estudios === null) {
    return (
      <>
        {navSeccion}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "auto",
            alignItems: "center",
            boxShadow: 2,
          }}
        >          
        </Box>
      </>
    );
  } else if (estudios.length === 0) {
    return (
      <>
        {navSeccion}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "auto",
            alignItems: "center",
            boxShadow: 2,
          }}
        >
          <Typography>No hay estudios pendientes</Typography>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {navSeccion}
        {estudios?.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Tipo: {e.Descripcion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                
                  <Typography>
                    Especificaciones: {e.Especificaciones}
                  </Typography>
                </li>
                <li>
                  <Typography>Fecha: {e.FechaEstudio.substring(0,10)} </Typography>
                </li>
                <li>
                  <Typography>Drección: {e.Direccion} </Typography>
                </li>
                <li>
                  <Typography>
                    Fecha est. resultado: {e.EstimadoResultado.substring(0,10)}
                  </Typography>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}

      </>
    );
  }
}

export default Estudios;
