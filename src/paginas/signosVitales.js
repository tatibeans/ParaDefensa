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

function SignosVitales({fijarResCookie}) {
 const location = useLocation();
  const cedulaRes = location.state.cedulaRes;
  const nomRes = location.state.nomRes;
  const token = location.state.usuToken;
  const nomCentro = location.state.centro;
  const imgResidente = location.state.imgResidente;
  const [signos, setSignos] = useState(null);

  useEffect(() => {
    fijarResCookie()
    setOpen(!open);
      buscarSignos();
  }, []);

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function navegar() {
    return navigate("/menu");
  }

  const buscarSignos = async () => { 
    const estyCons =  await fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/GetSignos?cedula=${cedulaRes}&centro=${nomCentro}&token=${token}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data === "No hay registros.") {
            console.log("entro");
            setSignos([]);
            setOpen(false);
         
        } else {
            console.log(data);
            setSignos(data);
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
      <Titulo texto="Signos Vitales" />
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

  if (signos === null) {
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
  } else if (signos.length === 0) {
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
          <Typography>No hay registros</Typography>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {navSeccion}
        {signos?.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Fecha: {e.FechaRegistro.substring(0,10)} Hora: {e.FechaRegistro.substring(12,19)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                 
                  <Typography>
                  Presión Minima: {e.PresionMinima !== 0 ? e.PresionMinima : "-"}
                  </Typography>
                </li>
                <li>
                  <Typography>Presión Maxima : {e.PresionMaxima !== 0 ? e.PresionMaxima : "-"} </Typography>
                </li>
                <li>
                  <Typography>Azúcar: {e.Azucar !== 0 ? e.Azucar : "-"} </Typography>
                </li>
                <li>
                  <Typography>Oxígeno : {e.Oxigeno !== 0 ? e.Oxigeno : "-"}</Typography>
                </li>
                  <li>
                  <Typography>Temperatura:  {e.Temperatura !== 0 ? e.Temperatura : "-"}</Typography>
                </li>
                <li>
                  <Typography>Pulso:  {e.Pulso !== 0 ? e.Pulso : "-"}</Typography>
                </li>
                   <li>
                  <Typography>Comentario: {e.Comentario !== 0 ? e.Comentario : "-"}</Typography>
                </li>
                <li>
                  <Typography>
                    Tomado por: {e.CiFuncionario}
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

export default SignosVitales;