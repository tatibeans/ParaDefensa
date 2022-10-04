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

function Consultas({fijarResCookie}) {
  const location = useLocation();
  const cedulaRes = location.state.cedulaRes;
  const nomRes = location.state.nomRes;
  const token = location.state.usuToken;
  const nomCentro = location.state.centro;
  const imgResidente = location.state.imgResidente;
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fijarResCookie()
    setOpen(!open);
    buscarConsultas();
  }, []);

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function navegar() {
    return navigate("/menu");
  }

  async function buscarConsultas() {
  
    const estyCons = fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/GetConsultas?cedula=${cedulaRes}&centro=${nomCentro}&token=${token}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data === "No hay consultas ingresadas.") {
            setConsultas([]);
          setOpen(false);
        } else {
            setConsultas(data);
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
      <Titulo texto="Consultas" />
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

 
 
  if (consultas === null) {
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
  } else if (consultas.length === 0) {
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
          <Typography>No hay consultas ingresadas</Typography>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {navSeccion}
        {consultas?.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Especialidad: {e.Especialidad}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  {" "}
                  <Typography>
                    Medico: {e.Medico}
                  </Typography>
                </li>
                <li>
                  <Typography>Fecha : {e.FechaConsulta.substring(0,10)} </Typography>
                </li>
                <li>
                  <Typography>Dreccion: {e.Direccion} </Typography>
                </li>               
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}

      </>
    );
  }
}

export default Consultas;