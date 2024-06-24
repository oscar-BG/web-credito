import { useEffect, useState } from "react";
import { useTheme, Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { useNavigate, useParams } from "react-router-dom";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import configURL from "../../config";

const ProfileUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const { userID } = useParams();
  const [carta, setCarta] = useState("");
  const [rfcCliente, setRfc] = useState("");
  const [documentStatus, setDocumentStatus] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    rfc: "",
    nombreRazonSocial: "",
    idSucursalZona: "",
    tipoCliente: "",
    actaConstitutiva: "",
    cartaExpedicion: "",
    cartaExpedicionDocumentos: "",
    fechaSolicitud: "",
    numeroCliente: "",
    idSector: "",
    giroEmpresarial: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    colonia: "",
    municipio: "",
    estado: "",
    pais: "",
    cp: "",
    nombreSolicitante: "",
    nombreEjecutivo: "",
    nominaEjecutivo: "",
    nombreGerenteVentas: "",
    nominaGerenteVentas: "",
    montoCreditoSolicitado: "",
    idEstatus: 0,
    categoria: "",
    calificacion: "",
    montoCreditoAceptado: 0.0,
    numeroZona: "",
    tipoSolicitud: "",
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const navigate = useNavigate();

  const fetchSucursales = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Sucursales", {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchZona = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Sucursales/Zonas", {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTipoCliente = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Catalogos/TipoCliente", {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatusDocument = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl+"/Catalogos/Estatus", {
        method: "GET"
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error)
    }

    return [];
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let sucursales = [];
    let zonas = [];
    let tipos_cliente = [];
    let status = [];
    const fetchData = async () => {
      sucursales = await fetchSucursales();
      zonas = await fetchZona();
      tipos_cliente = await fetchTipoCliente();
      await fetchProfileUser(sucursales, zonas, tipos_cliente);
      status = await fetchStatusDocument();
      setDocumentStatus(status);
    };

    fetchData();
  }, []);

  const fetchProfileUser = async (sucs, zonas, tipos) => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Expediente/" + userID, {
        method: "GET",
      });
      const result = await response.json();

      var sucursal = sucs.find((sucursal) => sucursal.id === result.idSucursalZona);
      var tipocliente = tipos.find((tipo) => tipo.id === result.tipoCliente);
      var zona = zonas.find((zona) => zona.numeroZona === result.numeroZona);

      result.fechaSolicitud = formatDate(result.fechaSolicitud);
      result.idSucursalZona = `${sucursal.sucursalNombre} [${sucursal.numeroSucursal}]`;
      result.tipoCliente = tipocliente.tipo;
      result.numeroZona = zona.zona;
      setFormData(result);
      setCarta(result.cartaExpedicion);
      setRfc(result.rfc);
    } catch (error) {
      alert(error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const handleButtonClickShowDocument = () => {
    navigate(`/commercial/show-document/${userID}/${carta}/${rfcCliente}`);
  };

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Comercial" subtitle="Información de la solicitud" />

          <Formik onSubmit={handleFormSubmit} initialValues={formData} validationSchema={checkoutSchema} enableReinitialize>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: "span 1" },
                  }}
                >
                  <TextField fullWidth variant="filled" type="text" label="Nombre/Razón Social" onBlur={handleBlur} onChange={handleChange} value={values.nombreRazonSocial} name="nombreRazonSocial" error={!!touched.nombreRazonSocial && !!errors.nombreRazonSocial} helperText={touched.nombreRazonSocial && errors.nombreRazonSocial} />
                  <TextField fullWidth variant="filled" type="text" label="RFC" onBlur={handleBlur} onChange={handleChange} value={values.rfc} name="rfc" error={!!touched.rfc && !!errors.rfc} helperText={touched.rfc && errors.rfc} />
                  <TextField fullWidth variant="filled" type="text" label="Número Cliente" onBlur={handleBlur} onChange={handleChange} value={values.numeroCliente} name="numeroCliente" error={!!touched.numeroCliente && !!errors.numeroCliente} helperText={touched.numeroCliente && errors.numeroCliente} />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Fecha de Solicitud"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fechaSolicitud}
                    name="fechaSolicitud"
                    error={!!touched.fechaSolicitud && !!errors.fechaSolicitud}
                    helperText={touched.fechaSolicitud && errors.fechaSolicitud}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField fullWidth variant="filled" type="text" label="Tipo Solicitud" onBlur={handleBlur} onChange={handleChange} value={values.tipoSolicitud} name="tipoSolicitud" error={!!touched.tipoSolicitud && !!errors.tipoSolicitud} helperText={touched.tipoSolicitud && errors.tipoSolicitud} />
                  <TextField fullWidth variant="filled" type="text" label="Tipo de Cliente" onBlur={handleBlur} onChange={handleChange} value={values.tipoCliente} name="tipoCliente" error={!!touched.tipoCliente && !!errors.tipoCliente} helperText={touched.tipoCliente && errors.tipoCliente} />
                  <TextField fullWidth variant="filled" type="text" label="Zona" onBlur={handleBlur} onChange={handleChange} value={values.numeroZona} name="numeroZona" error={!!touched.numeroZona && !!errors.numeroZona} helperText={touched.numeroZona && errors.numeroZona} />
                  <TextField fullWidth variant="filled" type="text" label="Sucursal Cabecera" onBlur={handleBlur} onChange={handleChange} value={values.idSucursalZona} name="idSucursalZona" error={!!touched.idSucursalZona && !!errors.idSucursalZona} helperText={touched.idSucursalZona && errors.idSucursalZona} />
                  <FormControl fullWidth variant="filled" error={!!touched.cartaExpedicion && !!errors.cartaExpedicion}>
                    <InputLabel id="demo-simple-select-label">Capturado</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={values.cartaExpedicion} name="cartaExpedicion" onBlur={handleBlur} onChange={handleChange}>
                      <MenuItem value={"SI"}>Sí</MenuItem>
                      <MenuItem value={"NO"}>No</MenuItem>
                    </Select>
                    {touched.cartaExpedicion && errors.cartaExpedicion && <Typography color="error">{errors.cartaExpedicion}</Typography>}
                  </FormControl>
                  <TextField fullWidth variant="filled" type="text" label="Giro Empresarial" onBlur={handleBlur} onChange={handleChange} value={values.giroEmpresarial} name="giroEmpresarial" error={!!touched.giroEmpresarial && !!errors.giroEmpresarial} helperText={touched.giroEmpresarial && errors.giroEmpresarial} />
                  <TextField fullWidth variant="filled" type="text" label="Cambios en acta constitutiva" onBlur={handleBlur} onChange={handleChange} value={values.actaConstitutiva} name="actaConstitutiva" error={!!touched.actaConstitutiva && !!errors.actaConstitutiva} helperText={touched.actaConstitutiva && errors.actaConstitutiva} />

                  
                  <Typography variant="h5" fontWeight="bold" sx={{ gridColumn: "span 3" }}>
                    Domicilio
                  </Typography>

                  <TextField fullWidth variant="filled" type="text" label="Calle" onBlur={handleBlur} onChange={handleChange} value={values.calle} name="calle" error={!!touched.calle && !!errors.calle} helperText={touched.calle && errors.calle} />
                  <TextField fullWidth variant="filled" type="text" label="Núm. Interior" onBlur={handleBlur} onChange={handleChange} value={values.numeroInterior} name="numeroInterior" error={!!touched.numeroInterior && !!errors.numeroInterior} helperText={touched.numeroInterior && errors.numeroInterior} />
                  <TextField fullWidth variant="filled" type="text" label="Núm. Exterior" onBlur={handleBlur} onChange={handleChange} value={values.numeroExterior} name="numeroExterior" error={!!touched.numeroExterior && !!errors.numeroExterior} helperText={touched.numeroExterior && errors.numeroExterior} />
                  <TextField fullWidth variant="filled" type="text" label="Colonia" onBlur={handleBlur} onChange={handleChange} value={values.colonia} name="colonia" error={!!touched.colonia && !!errors.colonia} helperText={touched.colonia && errors.colonia} />
                  <TextField fullWidth variant="filled" type="text" label="Municipio" onBlur={handleBlur} onChange={handleChange} value={values.municipio} name="municipio" error={!!touched.municipio && !!errors.municipio} helperText={touched.municipio && errors.municipio} />
                  <TextField fullWidth variant="filled" type="text" label="Estado" onBlur={handleBlur} onChange={handleChange} value={values.estado} name="estado" error={!!touched.estado && !!errors.estado} helperText={touched.estado && errors.estado} />
                  <TextField fullWidth variant="filled" type="text" label="País" onBlur={handleBlur} onChange={handleChange} value={values.pais} name="pais" error={!!touched.pais && !!errors.pais} helperText={touched.pais && errors.pais} />
                  <TextField fullWidth variant="filled" type="text" label="Código Postal" onBlur={handleBlur} onChange={handleChange} value={values.cp} name="cp" error={!!touched.cp && !!errors.cp} helperText={touched.cp && errors.cp} />

                  <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sx={{ gridColumn: "span 3" }}>
                    Información del Solicitante
                  </Typography>

                  <TextField fullWidth variant="filled" type="text" label="Solicitante" onBlur={handleBlur} onChange={handleChange} value={values.nombreSolicitante} name="nombreSolicitante" error={!!touched.nombreSolicitante && !!errors.nombreSolicitante} helperText={touched.nombreSolicitante && errors.nombreSolicitante} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Ejecutivo" onBlur={handleBlur} onChange={handleChange} value={values.nombreEjecutivo} name="nombreEjecutivo" error={!!touched.nombreEjecutivo && !!errors.nombreEjecutivo} helperText={touched.nombreEjecutivo && errors.nombreEjecutivo} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Núm. Nómina Ejecutivo" onBlur={handleBlur} onChange={handleChange} value={values.nominaEjecutivo} name="nominaEjecutivo" error={!!touched.nominaEjecutivo && !!errors.nominaEjecutivo} helperText={touched.nominaEjecutivo && errors.nominaEjecutivo} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Gerente de Ventas" onBlur={handleBlur} onChange={handleChange} value={values.nombreGerenteVentas} name="nombreGerenteVentas" error={!!touched.nombreGerenteVentas && !!errors.nombreGerenteVentas} helperText={touched.nombreGerenteVentas && errors.nombreGerenteVentas} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Núm. Nómina Gerente Ventas" onBlur={handleBlur} onChange={handleChange} value={values.nominaGerenteVentas} name="nominaGerenteVentas" error={!!touched.nominaGerenteVentas && !!errors.nominaGerenteVentas} helperText={touched.nominaGerenteVentas && errors.nominaGerenteVentas} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Monto  de Crédito Solicitado" onBlur={handleBlur} onChange={handleChange} value={values.montoCreditoSolicitado} name="montoCreditoSolicitado" error={!!touched.montoCreditoSolicitado && !!errors.montoCreditoSolicitado} helperText={touched.montoCreditoSolicitado && errors.montoCreditoSolicitado} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Categoría" onBlur={handleBlur} onChange={handleChange} name="categoria" error={!!touched.categoria && !!errors.categoria} helperText={touched.categoria && errors.categoria} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Calificación" onBlur={handleBlur} onChange={handleChange} name="calificacion" error={!!touched.calificacion && !!errors.calificacion} helperText={touched.calificacion && errors.calificacion} sx={{ gridColumn: "span 1" }} />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Fecha de aceptación"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="date_aceptacion"
                    error={!!touched.date_aceptacion && !!errors.date_aceptacion}
                    helperText={touched.date_aceptacion && errors.date_aceptacion}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField fullWidth variant="filled" type="text" label="Vigencia" onBlur={handleBlur} onChange={handleChange} name="vigencia" error={!!touched.vigencia && !!errors.vigencia} helperText={touched.vigencia && errors.vigencia} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Monto Crédito" onBlur={handleBlur} onChange={handleChange} name="monto_credito" error={!!touched.monto_credito && !!errors.monto_credito} helperText={touched.monto_credito && errors.monto_credito} sx={{ gridColumn: "span 1" }} />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="date"
                    label="Fecha Pagare"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="date_pagare"
                    error={!!touched.date_pagare && !!errors.date_pagare}
                    helperText={touched.date_pagare && errors.date_pagare}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField fullWidth variant="filled" type="text" label="Vigencia Pagaré" onBlur={handleBlur} onChange={handleChange} name="vigencia_pagare" error={!!touched.vigencia_pagare && !!errors.vigencia_pagare} helperText={touched.vigencia_pagare && errors.vigencia_pagare} sx={{ gridColumn: "span 1" }} />
                  <TextField fullWidth variant="filled" type="text" label="Vigencia Documentos" onBlur={handleBlur} onChange={handleChange} name="vigencia_documentos" error={!!touched.vigencia_documentos && !!errors.vigencia_documentos} helperText={touched.vigencia_documentos && errors.vigencia_documentos} sx={{ gridColumn: "span 1" }} />
                </Box>
                <Box display="flex" justifyContent="space-around" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                    Guardar
                  </Button>
                  <Button color="secondary" variant="contained" onClick={handleButtonClickShowDocument}>
                    <PostAddOutlinedIcon></PostAddOutlinedIcon>
                    Documentos
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  nombreRazonSocial: yup.string().required("required"),
  rfc: yup.string().required("required"),
  numeroCliente: yup.string().required("required"),
  fechaSolicitud: yup.string().required("required"),
  tipoSolicitud: yup.string().required("required"),
  tipoSolicitud: yup.string().required("required"),
  zona: yup.string().required("required"),
  sucursal: yup.string().required("required"),
  giro_empresarial: yup.string().required("required"),
  acta_constitutiva: yup.string().required("required"),
  calle: yup.string().required("required"),
  num_interior: yup.string().required("required"),
  num_exterior: yup.string().required("required"),
  colonia: yup.string().required("required"),
  municipio: yup.string().required("required"),
  estado: yup.string().required("required"),
  pais: yup.string().required("required"),
  codigo_postal: yup.string().required("required"),
  telefono: yup.string().required("required"),
  nombreSolicitante: yup.string().required("required"),
  nombreEjecutivo: yup.string().required("required"),
  nominaEjecutivo: yup.string().required("required"),
  gerente_ventas: yup.string().required("required"),
  nominaGerenteVentas: yup.string().required("required"),
  montoCreditoSolicitado: yup.string().required("required"),
  categoria: yup.string().required("required"),
  calificacion: yup.string().required("required"),
  date_aceptacion: yup.string().required("required"),
  vigencia: yup.string().required("required"),
  monto_credito: yup.string().required("required"),
  date_pagare: yup.string().required("required"),
  vigencia_pagare: yup.string().required("required"),
  vigencia_documentos: yup.string().required("required"),
  idEstatus : yup.string().required("Valor requerido")
});

export default ProfileUser;
