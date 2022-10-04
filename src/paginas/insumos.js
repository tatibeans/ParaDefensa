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

function Insumos({fijarResCookie}) {
  const location = useLocation();
  const cedulaRes = location.state.cedulaRes;
  const nomRes = location.state.nomRes;
  const token = location.state.usuToken;
  const nomCentro = location.state.centro;
  const [insumos, setInsumos] = useState(null);
  const imgResidente = location.state.imgResidente;

  useEffect(() => {
    fijarResCookie()
    setOpen(!open);
    buscarInsumos();
  }, []);

  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function navegar() {
    return navigate("/menu");
  }

  async function buscarInsumos() {
  
    const estyCons = fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/GetInsumos?cedula=${cedulaRes}&centro=${nomCentro}&token=${token}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data === "No hay insumos ingresados.") {
            setInsumos([]);
            setOpen(false);
        } else {
            setInsumos(data);
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
      <Titulo texto="Insumos" />
      <Avatar
        alt="Abuela"
        src={imgResidente}
        // sx={{ width: auto, height: 20 }}
      />
              <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </Box>
  );

  if (insumos === null) {
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
  } else if (insumos.length === 0) {
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
        {insumos?.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Item: {e.Descripcion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  {" "}
                  <Typography>
                    Stock: {e.Stock}
                  </Typography>
                </li>
                <li>
                  <Typography>Fecha : {e.FechaIngreso.substring(0,10)} </Typography>
                </li>
                <li>
                  <Typography>Tipo: {e.Tipo} </Typography>
                </li>
                <li>
                  <Typography>
                    Recibido por: {e.CiFuncionario}{" "}
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

export default Insumos;