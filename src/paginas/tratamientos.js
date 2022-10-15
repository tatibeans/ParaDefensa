import Titulo from "../componentes/Titulo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {Backdrop, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Typography, Avatar, Box, Modal} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
import {
  NoLuggageOutlined,
  SignalCellularNullSharp,
} from "@mui/icons-material";

function Tratamientos({fijarResCookie}) {
  const location = useLocation();
  const cedulaRes = location.state.cedulaRes;
  const nomRes = location.state.nomRes;
  const token = location.state.usuToken;
  const nomCentro = location.state.centro;
  const imgResidente = location.state.imgResidente;
  const [tratamientos, setTratamientos] = useState(null);
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    //fijarResCookie()
    setOpen(!open);
    buscarTratamientos();
  }, []);

  function navegar() {
    return navigate("/menu");
  }

  const buscarTratamientos = async () => {
    const estyCons = await fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/GetTratamientos?cedula=${cedulaRes}&centro=${nomCentro}&token=${token}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data === "No hay tratamientos ingresados.") {
          console.log("no hay tratamientos");
          setTratamientos([]);
          setOpen(false);
        } else {
          console.log(data);
          //console.log(data.json());
          setTratamientos(data);
          setOpen(false);
        }
      });
  };

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
      <Titulo texto="Tratamientos" />
      <Avatar alt="Abuela" src={imgResidente} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );

  const medicamentos = (sus, m) => {
    console.log(m);
    m?.map((e) => {
      if (e.Sustancia === sus) {
        return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Nombre: {e.Nombre}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              <li>
                <Typography>Presentación: {e.Presentacion}</Typography>
              </li>
              <li>
                <Typography>Stock: {e.Stock}</Typography>
              </li>
              <li>
                <Typography>
                  Fecha de fin de stock: {e.FechaFinStock.substring(0, 10)}{" "}
                </Typography>
              </li>
              <li>
                <Typography>Laboratorio: {e.Laboratorio} </Typography>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        )
      }
    });
  };

  const recetas = (r, med) => {
    console.log(r);
    return r?.map((e) => (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sustancia: {e.Sustancia}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              <Typography>Frecuencia: {e.Frecuencia}</Typography>
            </li>
            <li>
              <Typography>Dosis: {e.Dosis}</Typography>
            </li>
            <li>
              <Typography>
                Fecha de emisión: {e.FechaEmision.substring(0, 10)}{" "}
              </Typography>
            </li>
            <li>
              <Typography>
                Fecha de vencimiento: {e.FechaVencimiento.substring(0, 10)}{" "}
              </Typography>
            </li>
          </ul>
          <Typography onClick={handleOpen}>Medicamentos</Typography>
          {/* <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>{medicamentos(e.Sustancia, med)}</Box>
          </Modal> */}
        </AccordionDetails>
      </Accordion>
    ));
  };

  if (tratamientos === null) {
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
        ></Box>
      </>
    );
  } else if (tratamientos.length === 0) {
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
          <Typography>No hay tratamientos pendientes</Typography>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {navSeccion}
        {tratamientos?.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Descripcion: {e.Descripcion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  <Typography>Medico: {e.Medico}</Typography>
                </li>
                <li>
                  <Typography>
                    Fecha comienzo : {e.FechaComienzo.substring(0, 10)}{" "}
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Fecha fin : {e.FechaFin.substring(0, 10)}{" "}
                  </Typography>
                </li>
                <Typography> Recetas </Typography>
                {recetas(e.Recetas, e.Medicametos)}
              </ul>
            </AccordionDetails>
          </Accordion>
        ))}
        {/* <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop> */}
      </>
    );
  }
}

export default Tratamientos;
