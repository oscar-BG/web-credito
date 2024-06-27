import { useEffect, useState } from "react";
import { Box, useTheme, TextField, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button, FormHelperText } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useNavigate } from "react-router-dom";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import configURL from "../../config";
import Swal from "sweetalert2";

const Commercial = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(userData);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [dataTable, setDataTable] = useState([]);

  const [listZona, setListZona] = useState([]);
  const [zona, setZona] = useState("");
  const [loadingZona, setLoadingZona] = useState(true);

  const [listSucursales, setListSucursales] = useState([]);
  const [sucursal, setSucursal] = useState("");
  const [loadingSucursal, setLoadingSucursal] = useState(true);

  const [listStatus, setListStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);

  const [listTipoCliente, setListTipoCliente] = useState([]);
  const [tipoCliente, setTipoCliente] = useState("");
  const [loadingTipoCliente, setLoadingTipoCliente] = useState(true);

  const [titleView, setTitle] = useState("");

  const handleFormSubmit = (values) => {
    // console.log(values);

    const filteredValues = Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== ""));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(filteredValues);
    console.table(raw);

    const requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
    };

    fetch(configURL.apiBaseUrl + "/Expediente/BuscarExpedientes", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          Swal.fire({
            text: "No se encontrarón resultados",
            icon: "info",
            confirmButtonText: "Entendido",
          });
          return  []
        }
      })
      .then((result) => {
        console.log(result);
        setDataTable(result);
      })
      .catch((error) => console.error(error));
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/commercial/new-request-document");
  };
  const handleButtonClickExpediente = (userID) => {
    navigate(`/commercial/profile-user/${userID}`);
  };

  useEffect(() => {
    const fetchZona = async () => {
      try {
        const response = await fetch(configURL.apiBaseUrl + "/Sucursales/Zonas", {
          method: "GET",
        });
        const result = await response.json();
        setListZona(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingZona(false);
      }

      switch (user.permisos) {
        case "comercial_matriz":
        case "comercial_foranea":
          setTitle("Comercial");
          // setIconMenu(<ContactsOutlinedIcon />);
          break;
        case "cartera_foranea":
        case "cartera_matriz":
          setTitle("Cartera");
          // setIconMenu(<ReceiptOutlinedIcon />);
          break;
        case "analista_credito":
          setTitle("Analista de crédito");
          // setIconMenu(<ManageSearchOutlinedIcon />);
          break;
      }
    };

    const fetchSucursales = async () => {
      try {
        const response = await fetch(configURL.apiBaseUrl + "/Sucursales", {
          method: "GET",
        });
        const result = await response.json();
        setListSucursales(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSucursal(false);
      }
    };

    const fetchStatus = async () => {
      let listaStatus = [];

      try {
        const response = await fetch(configURL.apiBaseUrl + "/Catalogos/Estatus", {
          method: "GET",
        });
        const result = await response.json()
        // console.table(result);
        console.log(user.permisos);
        switch (user.permisos) {
          case 'comercial_matriz':
          case 'comercial_foranea':
            result.map((status) => {
              if (status.estatusNombre === 'capturado' || status.estatusNombre === 'cargado' || status.estatusNombre === 'aceptado' || status.estatusNombre == 'rechazado') {
                listaStatus.push(status);
              }
            });
            break;
          case 'cartera_foranea':
          case 'cartera_matriz':
            result.map((status) => {
              // console.log(status);
              if (status.estatusNombre === 'cargado') {
                listaStatus.push(status);
              }
            });
          case 'analista_credito':
            result.map((status) => {
              if (status.estatusNombre === 'prevalidado' || status.estatusNombre === 'aceptado' || status.estatusNombre === 'rechazado') {
                listaStatus.push(status);
              }
            });
            break;
            break;
        }
        // console.table(listaStatus);
        setListStatus(listaStatus);
      } catch (error) {
        alert(error);
      } finally {
        setLoadingStatus(false);
      }
    };

    const fetchTipoCliente = async () => {
      try {
        const response = await fetch(configURL.apiBaseUrl + "/Catalogos/TipoCliente", {
          method: "GET",
        });
        const result = await response.json();
        setListTipoCliente(result);
      } catch (error) {
        alert(error);
      } finally {
        setLoadingTipoCliente(false);
      }
    };

    fetchZona();
    fetchSucursales();
    fetchStatus();
    fetchTipoCliente();
  }, []);

  const handleSelectZona = (event, setFieldValue) => {
    setZona(event.target.value);
    setFieldValue("numeroZona", event.target.value);
  };

  const handleSelectSucursal = (event, setFieldValue) => {
    setSucursal(event.target.value);
    setFieldValue("idSucursalZona", event.target.value);
  };

  const handleSelectStatus = (event, setFieldValue) => {
    setStatus(event.target.value);
    setFieldValue("idEstatus", event.target.value);
  };

  const handleSelectTipoCliente = (event, setFieldValue) => {
    setTipoCliente(event.target.value);
    setFieldValue("tipoCliente", event.target.value);
  };

  const columns = [
    { field: "rfc", headerName: "RFC", flex: 1 },
    {
      field: "nombreRazonSocial",
      headerName: "Nombre",
      headerAlign: "left",
      align: "left",
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "tipoCliente",
      headerName: "Tipo de cliente",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "numeroZona",
      headerName: "Zona",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "idSucursalZona",
      headerName: "Sucursal",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "fechaSolicitud",
      headerName: "Fecha Solicitud",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    // {
    //     field: "date",
    //     headerName: "Fecha",
    //     flex: 1,
    //     renderHeader: (params) => (
    //       <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
    //         {params.colDef.headerName}
    //       </Box>
    //     ),
    // },
    {
      field: "vigencia",
      headerName: "Vigencia",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "montoCreditoSolicitado",
      headerName: "Monto",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "fechaPagare",
      headerName: "Fecha Pagaré",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "vigenciaPagare",
      headerName: "Vigencia Pagaré",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "vigenciaDocumentos",
      headerName: "Vigencia Documentos",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
    },
    {
      field: "id",
      headerName: "Expediente",
      flex: 1,
      renderHeader: (params) => <Box sx={{ whiteSpace: "normal", wordWrap: "break-word", textAlign: "center" }}>{params.colDef.headerName}</Box>,
      renderCell: ({ row: { id } }) => {
        return (
          <Box width="60%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
            <Button color="secondary" variant="contained" onClick={() => handleButtonClickExpediente(id)}>
              <VisibilityOutlinedIcon />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title={titleView} subtitle="Lista de solicitudes" />
            <Box display="flex" justifyContent="center" mt="20px">
              {["comercial_matriz", "comercial_foranea"].includes(user.permisos) && (
                <Button color="secondary" variant="contained" onClick={handleButtonClick}>
                  <PersonAddOutlinedIcon></PersonAddOutlinedIcon>
                  Agregar
                </Button>
              )}
            </Box>
          </Box>

          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                  }}
                >
                  <TextField fullWidth variant="filled" type="text" label="RFC" onBlur={handleBlur} onChange={handleChange} value={values.rfc} name="rfc" error={!!touched.rfc && !!errors.rfc} helperText={touched.rfc && errors.rfc} sx={{ gridColumn: "span 1" }} />

                  <TextField fullWidth variant="filled" type="text" label="Nombre/Razón social" onBlur={handleBlur} onChange={handleChange} value={values.nombreRazonSocial} name="nombreRazonSocial" error={!!touched.nombreRazonSocial && !!errors.nombreRazonSocial} helperText={touched.nombreRazonSocial && errors.nombreRazonSocial} sx={{ gridColumn: "span 1" }} />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                    <Select fullWidth variant="filled" type="text" label="Zona" value={zona} onChange={(event) => handleSelectZona(event, setFieldValue)} name="numeroZona" error={!!touched.numeroZona && !!errors.numeroZona} sx={{ gridColumn: "span 1" }}>
                      {loadingZona ? (
                        <MenuItem>Cargando ...</MenuItem>
                      ) : (
                        listZona.map((zona) => (
                          <MenuItem key={zona.numeroZona} value={zona.numeroZona}>
                            {zona.zona}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sucursal Cabecera</InputLabel>
                    <Select fullWidth variant="filled" type="text" value={sucursal} onBlur={handleBlur} onChange={(event) => handleSelectSucursal(event, setFieldValue)} name="idSucursalZona" id="idSucursalZona" error={!!touched.idSucursalZona && !!errors.idSucursalZona} sx={{ gridColumn: "span 1" }}>
                      {loadingSucursal ? (
                        <MenuItem>Cargando ...</MenuItem>
                      ) : (
                        listSucursales.map((sucursal) => (
                          <MenuItem key={sucursal.id} value={sucursal.numeroSucursal}>
                            {sucursal.sucursalNombre}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                    <Select fullWidth variant="filled" type="text" value={status} onBlur={handleBlur} onChange={(event) => handleSelectStatus(event, setFieldValue)} name="idEstatus" error={!!touched.idEstatus && !!errors.idEstatus} sx={{ gridColumn: "span 1" }}>
                      {loadingStatus ? (
                        <MenuItem>Cargando ...</MenuItem>
                      ) : (
                        listStatus.map((status) => (
                          <MenuItem key={status.id} value={status.id}>
                            {status.estatusNombre}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    {touched.idEstatus && errors.idEstatus && <FormHelperText style={{color: "red"}}>{errors.idEstatus}</FormHelperText>}
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo de cliente</InputLabel>
                    <Select fullWidth variant="filled" type="text" value={tipoCliente} onBlur={handleBlur} onChange={(event) => handleSelectTipoCliente(event, setFieldValue)} name="tipoCliente" error={!!touched.tipoCliente && !!errors.tipoCliente} sx={{ gridColumn: "span 1" }}>
                      {loadingTipoCliente ? (
                        <MenuItem>Cargando ...</MenuItem>
                      ) : (
                        listTipoCliente.map((cliente) => (
                          <MenuItem key={cliente.id} value={cliente.id}>
                            {cliente.tipo}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">¿Cuenta con carta de execpción para entregas de documentos?</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="cartaExpedicion" value={values.cartaExpedicion} onBlur={handleBlur} onChange={handleChange}>
                      <FormControlLabel value="SI" control={<Radio />} label="si" />
                      <FormControlLabel value="NO" control={<Radio />} label="no" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    <PersonSearchOutlinedIcon></PersonSearchOutlinedIcon>
                    Buscar cliente
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid rows={dataTable} columns={columns} slots={{ toolbar: GridToolbar }} />
          </Box>
        </Box>
      </main>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  rfc: yup.string().required("Valor requerido"),
  nombreRazonSocial: yup.string(),
  numeroZona: yup.string(),
  idSucursalZona: yup.string(),
  idEstatus: yup.string().required("Valor requerido"),
  tipoCliente: yup.string(),
  cartaExpedicion: yup.string(),
});

const initialValues = {
  rfc: "",
  nombreRazonSocial: "",
  numeroZona: "",
  idSucursalZona: "",
  idEstatus: "",
  tipoCliente: "",
  cartaExpedicion: "",
};

export default Commercial;
