import { useEffect, useState, useRef } from "react";
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
// import { SettingsEthernet } from "@mui/icons-material";

const ProfileUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(userData)
  const [isSidebar, setIsSidebar] = useState(true);
  const { userID } = useParams();
  const [carta, setCarta] = useState("");
  const [rfcCliente, setRfc] = useState("");
  const [documentStatus, setDocumentStatus] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [statusActual, setStatus] = useState("");
  const [visibleButton, setVisibleButton] = useState(true);
  const [disabledInput, setDisabledInput] = useState(true);
  const [formValidate, setFomrValidate] = useState([]);
  const endOfPageRef = useRef(null);
  const [formData, setFormData] = useState({ id: 0, rfc: "", nombreRazonSocial: "", idSucursalZona: "", tipoCliente: "", actaConstitutiva: "", cartaExpedicion: "", cartaExpedicionDocumentos: "", fechaSolicitud: "", numeroCliente: "", idSector: "", giroEmpresarial: "", calle: "", numeroExterior: "", numeroInterior: "", colonia: "", municipio: "", estado: "", pais: "", cp: "", nombreSolicitante: "", nombreEjecutivo: "", nominaEjecutivo: "", nombreGerenteVentas: "", nominaGerenteVentas: "", montoCreditoSolicitado: "", idEstatus: 0, categoria: "", calificacion: "", montoCreditoAceptado: "", numeroZona: "", tipoSolicitud: "", fechaAceptacion : "", fechaPagare : "", vigenciaPagare : "", vigenciaDocumentos : "", vigencia: ""});

  const handleFormSubmit = (values) => {
    // console.table(values);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const idExpediente = values.id;
    let jsonForm = {};

    switch (user.permisos) {
      case 'analista_credito':
        jsonForm = {
          "categoria" : values.categoria,
          "calificacion":   values.calificacion,
          "montoCreditoAceptado": values.montoCreditoAceptado,
          "fechaAceptacion":values.fechaAceptacion ,
          "vigencia": values.vigencia ,
          "fechaPagare": values.fechaPagare,
          "vigenciaPagare": values.vigenciaPagare,
          "vigenciaDocumentos": values.vigenciaDocumentos,
          "idEstatus": values.idEstatus 
        }
        break;
      case 'comercial_foranea':
      case 'comercial_matriz':
        jsonForm = {
          "idEstatus": values.idEstatus
        }
        break;
    }

    const raw = JSON.stringify(jsonForm);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };

    fetch(configURL.apiBaseUrl+"/Expediente/Actualizar/"+idExpediente, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

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

  const fetchStatusDocument = async (status_actual) => {
    console.log("Estatus Actual: ", status_actual);
    try {
      const response = await fetch(configURL.apiBaseUrl+"/Catalogos/Estatus", {
        method: "GET"
      });
      const result = await response.json();

      let listaStatus = [];
      switch (user.permisos) {
        case 'analista_credito':
          result.map( (status) => {
            if (status.estatusNombre === 'aceptado' || status.estatusNombre === 'rechazado' || status.id === status_actual) {
              listaStatus.push(status);
            }
          })
          setFomrValidate(checkoutSchemaRequired);
          setDisabledInput(false);
          break;
        case 'comercial_foranea':
        case 'comercial_matriz':
          result.map((status) => {
            if (status_actual === 1) {
              if (status.estatusNombre == 'cargado' || status.id === status_actual) {
                listaStatus.push(status);
              }
            }
            if (status_actual === 5) {
              if (status.estatusNombre === 'cargado' || status.estatusNombre === 'prevalidado' || status.estatusNombre === 'capturado') {
                listaStatus.push(status);
              }
            }
            // if (status.estatusNombre == 'cargado' || status.estatusNombre == 'prevalidado' || status.id === status_actual) {
            //   listaStatus.push(status);
            // }
          })
          setFomrValidate(checkoutSchemaValidate);
          break;
        case 'cartera_foranea':
        case 'cartera_matriz':
          result.map((status) => {
            if (status_actual === 2) {
              if (status.estatusNombre == 'prevalidado' || status.id === status_actual) {
                listaStatus.push(status);
              }
            }
          });

          setFomrValidate(checkoutSchemaValidate)
          break;
      }
      console.table(listaStatus);
      setDocumentStatus(listaStatus);
      setStatus(status_actual);

    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStatus(false);
    }
  }

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let sucursales = [];
    let zonas = [];
    let tipos_cliente = [];
    const fetchData = async () => {
      sucursales = await fetchSucursales();
      zonas = await fetchZona();
      tipos_cliente = await fetchTipoCliente();
      let status_actual = await fetchProfileUser(sucursales, zonas, tipos_cliente);
      if (status_actual) {
        fetchStatusDocument(status_actual);
      }
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
      result.fechaAceptacion = formatDate(result.fechaAceptacion);
      result.vigencia = formatDate(result.vigencia);
      result.fechaPagare = formatDate(result.fechaPagare);
      result.vigenciaPagare = formatDate(result.vigenciaPagare);
      result.vigenciaDocumentos = formatDate(result.vigenciaDocumentos);
      result.idSucursalZona = `${sucursal.sucursalNombre} [${sucursal.numeroSucursal}]`;
      result.tipoCliente = tipocliente.tipo;
      result.numeroZona = zona.zona;
      if (result.montoCreditoAceptado <= 0) {
        result.montoCreditoAceptado = '';
      }
      // if (result.idEstatus === 5) {
      //   setVisibleButton(true);
      // } 
      // console.table(result);
      setFormData(result);
      setCarta(result.cartaExpedicion);
      setRfc(result.rfc);

      return result.idEstatus;
      
    } catch (error) {
      alert(error);
    }
  };

  

  const formatDate = (date) => {

    if (date === null || date === '' || date === undefined) {
      return "";
    }
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const handleButtonClickShowDocument = () => {
    navigate(`/commercial/show-document/${userID}/${carta}/${rfcCliente}`);
  };

  const handleChangeSelectStatus = (event, setFieldValue) => {
    const idStatus = event.target.value;
    setStatus(idStatus);
    setFieldValue('idEstatus', idStatus);
    if (idStatus === 5) {
      // Estatus "Aceptado"
      setVisibleButton(true);
      
    } else {
      // Cualquier otro Status ocultar el boton de guardar
      setVisibleButton(true)
    }
    endOfPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Comercial" subtitle="Información de la solicitud" />

          <Formik onSubmit={handleFormSubmit} initialValues={formData} validationSchema={formValidate} enableReinitialize>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: "span 1" },
                  }}
                >
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Nombre/Razón Social" onBlur={handleBlur} onChange={handleChange} value={values.nombreRazonSocial} name="nombreRazonSocial" error={!!touched.nombreRazonSocial && !!errors.nombreRazonSocial} helperText={touched.nombreRazonSocial && errors.nombreRazonSocial} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="RFC" onBlur={handleBlur} onChange={handleChange} value={values.rfc} name="rfc" error={!!touched.rfc && !!errors.rfc} helperText={touched.rfc && errors.rfc} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Número Cliente" onBlur={handleBlur} onChange={handleChange} value={values.numeroCliente} name="numeroCliente" error={!!touched.numeroCliente && !!errors.numeroCliente} helperText={touched.numeroCliente && errors.numeroCliente} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="date" label="Fecha de Solicitud" onBlur={handleBlur} onChange={handleChange} value={values.fechaSolicitud} name="fechaSolicitud" error={!!touched.fechaSolicitud && !!errors.fechaSolicitud} helperText={touched.fechaSolicitud && errors.fechaSolicitud}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Tipo Solicitud" onBlur={handleBlur} onChange={handleChange} value={values.tipoSolicitud} name="tipoSolicitud" error={!!touched.tipoSolicitud && !!errors.tipoSolicitud} helperText={touched.tipoSolicitud && errors.tipoSolicitud} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Tipo de Cliente" onBlur={handleBlur} onChange={handleChange} value={values.tipoCliente} name="tipoCliente" error={!!touched.tipoCliente && !!errors.tipoCliente} helperText={touched.tipoCliente && errors.tipoCliente} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Zona" onBlur={handleBlur} onChange={handleChange} value={values.numeroZona} name="numeroZona" error={!!touched.numeroZona && !!errors.numeroZona} helperText={touched.numeroZona && errors.numeroZona} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Sucursal Cabecera" onBlur={handleBlur} onChange={handleChange} value={values.idSucursalZona} name="idSucursalZona" error={!!touched.idSucursalZona && !!errors.idSucursalZona} helperText={touched.idSucursalZona && errors.idSucursalZona} />
                  <FormControl fullWidth variant="standard" error={!!touched.cartaExpedicion && !!errors.cartaExpedicion}>
                    <InputLabel id="demo-simple-select-label">Capturado</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={values.cartaExpedicion} name="cartaExpedicion" onBlur={handleBlur} onChange={handleChange}>
                      <MenuItem value={"SI"}>Sí</MenuItem>
                      <MenuItem value={"NO"}>No</MenuItem>
                    </Select>
                    {touched.cartaExpedicion && errors.cartaExpedicion && <Typography color="error">{errors.cartaExpedicion}</Typography>}
                  </FormControl>
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Giro Empresarial" onBlur={handleBlur} onChange={handleChange} value={values.giroEmpresarial} name="giroEmpresarial" error={!!touched.giroEmpresarial && !!errors.giroEmpresarial} helperText={touched.giroEmpresarial && errors.giroEmpresarial} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Cambios en acta constitutiva" onBlur={handleBlur} onChange={handleChange} value={values.actaConstitutiva} name="actaConstitutiva" error={!!touched.actaConstitutiva && !!errors.actaConstitutiva} helperText={touched.actaConstitutiva && errors.actaConstitutiva} />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estatus </InputLabel>
                    <Select fullWidth variant="filled" type="text" onBlur={handleBlur} value={statusActual} onChange={(event) => handleChangeSelectStatus(event, setFieldValue)} name="idEstatus" id="idEstatus" error={!!touched.idEstatus && !!errors.idEstatus}>
                      {
                        loadingStatus ? (
                          <MenuItem>Cargando ...</MenuItem>
                        ) : (
                          documentStatus.map((status) => (
                            <MenuItem key={status.id} value={status.id} disabled={status.id === statusActual}>
                              {status.estatusNombre}
                            </MenuItem>
                          ))
                        )
                      }
                    </Select>
                  </FormControl>
                  <Typography variant="h5" fontWeight="bold" sx={{ gridColumn: "span 3" }}>
                    Domicilio
                  </Typography>

                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Calle" onBlur={handleBlur} onChange={handleChange} value={values.calle} name="calle" error={!!touched.calle && !!errors.calle} helperText={touched.calle && errors.calle} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Núm. Interior" onBlur={handleBlur} onChange={handleChange} value={values.numeroInterior} name="numeroInterior" error={!!touched.numeroInterior && !!errors.numeroInterior} helperText={touched.numeroInterior && errors.numeroInterior} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Núm. Exterior" onBlur={handleBlur} onChange={handleChange} value={values.numeroExterior} name="numeroExterior" error={!!touched.numeroExterior && !!errors.numeroExterior} helperText={touched.numeroExterior && errors.numeroExterior} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Colonia" onBlur={handleBlur} onChange={handleChange} value={values.colonia} name="colonia" error={!!touched.colonia && !!errors.colonia} helperText={touched.colonia && errors.colonia} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Municipio" onBlur={handleBlur} onChange={handleChange} value={values.municipio} name="municipio" error={!!touched.municipio && !!errors.municipio} helperText={touched.municipio && errors.municipio} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Estado" onBlur={handleBlur} onChange={handleChange} value={values.estado} name="estado" error={!!touched.estado && !!errors.estado} helperText={touched.estado && errors.estado} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="País" onBlur={handleBlur} onChange={handleChange} value={values.pais} name="pais" error={!!touched.pais && !!errors.pais} helperText={touched.pais && errors.pais} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Código Postal" onBlur={handleBlur} onChange={handleChange} value={values.cp} name="cp" error={!!touched.cp && !!errors.cp} helperText={touched.cp && errors.cp} />

                  <Typography variant="h5" color={colors.grey[100]} fontWeight="bold" sx={{ gridColumn: "span 3" }}>
                    Información del Solicitante
                  </Typography>

                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Solicitante" onBlur={handleBlur} onChange={handleChange} value={values.nombreSolicitante} name="nombreSolicitante" error={!!touched.nombreSolicitante && !!errors.nombreSolicitante} helperText={touched.nombreSolicitante && errors.nombreSolicitante} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Ejecutivo" onBlur={handleBlur} onChange={handleChange} value={values.nombreEjecutivo} name="nombreEjecutivo" error={!!touched.nombreEjecutivo && !!errors.nombreEjecutivo} helperText={touched.nombreEjecutivo && errors.nombreEjecutivo} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Núm. Nómina Ejecutivo" onBlur={handleBlur} onChange={handleChange} value={values.nominaEjecutivo} name="nominaEjecutivo" error={!!touched.nominaEjecutivo && !!errors.nominaEjecutivo} helperText={touched.nominaEjecutivo && errors.nominaEjecutivo} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Gerente de Ventas" onBlur={handleBlur} onChange={handleChange} value={values.nombreGerenteVentas} name="nombreGerenteVentas" error={!!touched.nombreGerenteVentas && !!errors.nombreGerenteVentas} helperText={touched.nombreGerenteVentas && errors.nombreGerenteVentas} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Núm. Nómina Gerente Ventas" onBlur={handleBlur} onChange={handleChange} value={values.nominaGerenteVentas} name="nominaGerenteVentas" error={!!touched.nominaGerenteVentas && !!errors.nominaGerenteVentas} helperText={touched.nominaGerenteVentas && errors.nominaGerenteVentas} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ readOnly: true }} fullWidth variant="standard" type="text" label="Monto  de Crédito Solicitado" onBlur={handleBlur} onChange={handleChange} value={values.montoCreditoSolicitado} name="montoCreditoSolicitado" error={!!touched.montoCreditoSolicitado && !!errors.montoCreditoSolicitado} helperText={touched.montoCreditoSolicitado && errors.montoCreditoSolicitado} sx={{ gridColumn: "span 1" }} />
                  
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="text" label="Categoría" value={values.categoria} onBlur={handleBlur} onChange={handleChange} name="categoria" error={!!touched.categoria && !!errors.categoria} helperText={touched.categoria && errors.categoria} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="text" label="Calificación" value={values.calificacion} onBlur={handleBlur} onChange={handleChange} name="calificacion" error={!!touched.calificacion && !!errors.calificacion} helperText={touched.calificacion && errors.calificacion} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="date" label="Fecha de aceptación" value={values.fechaAceptacion} onBlur={handleBlur} onChange={handleChange} name="fechaAceptacion" error={!!touched.fechaAceptacion && !!errors.fechaAceptacion} helperText={touched.fechaAceptacion && errors.fechaAceptacion} InputLabelProps={{   shrink: true, }} sx={{ gridColumn: "span 1" }}/>
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="date" label="Vigencia" value={values.vigencia} onBlur={handleBlur} onChange={handleChange} name="vigencia" error={!!touched.vigencia && !!errors.vigencia} helperText={touched.vigencia && errors.vigencia} InputLabelProps={{   shrink: true, }} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="text" label="Monto Crédito" value={values.montoCreditoAceptado} onBlur={handleBlur} onChange={handleChange} name="montoCreditoAceptado" error={!!touched.montoCreditoAceptado && !!errors.montoCreditoAceptado} helperText={touched.montoCreditoAceptado && errors.montoCreditoAceptado} sx={{ gridColumn: "span 1" }} />
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="date" label="Fecha Pagare" value={values.fechaPagare} onBlur={handleBlur} onChange={handleChange} name="fechaPagare" error={!!touched.fechaPagare && !!errors.fechaPagare} helperText={touched.fechaPagare && errors.fechaPagare} InputLabelProps={{   shrink: true, }} sx={{ gridColumn: "span 1" }}/>
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="date" label="Vigencia Pagaré" value={values.vigenciaPagare} onBlur={handleBlur} onChange={handleChange} name="vigenciaPagare" error={!!touched.vigenciaPagare && !!errors.vigenciaPagare} helperText={touched.vigenciaPagare && errors.vigenciaPagare} sx={{ gridColumn: "span 1" }}  InputLabelProps={{ shrink: true, }}/>
                  <TextField InputProps={{ disabled: disabledInput }} fullWidth variant="filled" type="date" label="Vigencia Documentos" value={values.vigenciaDocumentos} onBlur={handleBlur} onChange={handleChange} name="vigenciaDocumentos" error={!!touched.vigenciaDocumentos && !!errors.vigenciaDocumentos} helperText={touched.vigenciaDocumentos && errors.vigenciaDocumentos} sx={{ gridColumn: "span 1" }} InputLabelProps={{ shrink: true, }}/>

                  
                </Box>
                <Box display="flex" justifyContent="space-around" mt="20px">
                  {
                    visibleButton ? (
                      <Button type="submit" color="secondary" variant="contained">
                        <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                        Guardar
                      </Button>
                    ) : ``
                  }
                  <Button color="secondary" variant="contained" onClick={handleButtonClickShowDocument}>
                    <PostAddOutlinedIcon></PostAddOutlinedIcon>
                    Documentos
                  </Button>
                </Box>
                <div ref={endOfPageRef} />
              </form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
};

const checkoutSchemaValidate = yup.object().shape({
  idEstatus :           yup.string().required("Valor requerido")
});
const checkoutSchemaRequired = yup.object().shape({
  fechaSolicitud:       yup.string().required("Valor requerido"),
  tipoSolicitud:        yup.string().required("Valor requerido"),
  categoria:            yup.string().required("Valor requerido"),
  calificacion:         yup.string().required("Valor requerido"),
  fechaAceptacion:      yup.string().required("Valor requerido"),
  vigencia:             yup.string().required("Valor requerido"),
  montoCreditoAceptado: yup.string().required("Valor requerido"),
  fechaPagare:          yup.string().required("Valor requerido"),
  vigenciaPagare:       yup.string().required("Valor requerido"),
  vigenciaDocumentos:   yup.string().required("Valor requerido"),
  idEstatus :           yup.string().required("Valor requerido")

  // nombreRazonSocial: yup.string().required("Valor requerido"),
  // rfc: yup.string().required("Valor requerido"),
  // numeroCliente: yup.string().required("Valor requerido"),
  // zona: yup.string().required("Valor requerido"),
  // sucursal: yup.string().required("Valor requerido"),
  // giro_empresarial: yup.string().required("Valor requerido"),
  // acta_constitutiva: yup.string().required("Valor requerido"),
  // calle: yup.string().required("Valor requerido"),
  // num_interior: yup.string().required("Valor requerido"),
  // num_exterior: yup.string().required("Valor requerido"),
  // colonia: yup.string().required("Valor requerido"),
  // municipio: yup.string().required("Valor requerido"),
  // estado: yup.string().required("Valor requerido"),
  // pais: yup.string().required("Valor requerido"),
  // codigo_postal: yup.string().required("Valor requerido"),
  // telefono: yup.string().required("Valor requerido"),
  // nombreSolicitante: yup.string().required("Valor requerido"),
  // nombreEjecutivo: yup.string().required("Valor requerido"),
  // nominaEjecutivo: yup.string().required("Valor requerido"),
  // gerente_ventas: yup.string().required("Valor requerido"),
  // nominaGerenteVentas: yup.string().required("Valor requerido"),
  // montoCreditoSolicitado: yup.string().required("Valor requerido"),
  
});

export default ProfileUser;
