import { useEffect, useState } from "react";
import { Box, useTheme, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, InputLabel, Input, MenuItem, Button, FormHelperText, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import { mockDataTypeClient } from "../../../data/mockData";
import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SidebarPro from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import configURL from "../../../config";
import Swal from "sweetalert2";
import { YouTube } from "@mui/icons-material";

const AreaBranches = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [listSucursales, setListSucursales] = useState([]);
  const [listZona, setListZona] = useState([]);
  const [loadingSucursal, setLoadingSucursal] = useState(true);
  const [loadingZona, setLoadingZona] = useState(true);
  const [sucursal, setSucursal] = useState("");
  const [no_sucursal, setNoSucursal] = useState("");
  const [zona, setZona] = useState("");

  const initialValues = {
    sucursal: "",
    no_sucursal: "",
    numeroZona: "",
  };

  const checkoutSchema = yup.object().shape({
    sucursal: yup.string().required("Sucursal es requerido"),
    no_sucursal: yup.number().required("No. Sucursal es requerido"),
    numeroZona: yup.string().required("Zona es requerida"),
  });

  const showSwalError = (message) => {
    Swal.fire({
      title: "¡No se pudo editar!",
      text: message,
      icon: "error",
      confirmButtonText: "Entendido",
    });
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const fetchSucursales = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Sucursales", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setListSucursales(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSucursal(false);
    }
  };

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
  };

  useEffect(() => {
    fetchSucursales();
    fetchZona();
  }, []);

  const editarSucursal = (id) => {};

  const eliminarSucursal = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    Swal.fire({
      title: "¡Eliminar registro!",
      text: "Esta acción no podrá deshacerse.",
      icon: "question",
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        fetch(`${configURL.apiBaseUrl}/Sucursales/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status) {
              fetchSucursales();
            } else {
              showSwalError(result.message);
            }
          })
          .catch((error) => console.error(error));
      },
    });
  };

  const columns = [
    {
      field: "sucursalNombre",
      headerName: "Sucursal",
      flex: 1,
    },
    {
      field: "numeroSucursal",
      headerName: "No. Sucursal",
      flex: 1,
    },
    {
      field: "zonaNombre",
      headerName: "Zona",
      flex: 1,
    },
    {
      field: "numeroZona",
      headerName: "No. Zona",
      flex: 1,
    },
    {
      field: "editar",
      headerName: "Editar",
      renderCell: ({ row: { id } }) => {
        return (
          <Button type="submit" color="secondary" variant="contained" onClick={() => editarSucursal(id)}>
            <EditOutlinedIcon />
          </Button>
        );
      },
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      renderCell: ({ row: { id } }) => {
        return (
          <Button type="submit" color="secondary" variant="contained" onClick={() => eliminarSucursal(id)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        );
      },
    },
  ];

  const changeSucursal = (event, setFieldValue) => {
    setFieldValue("sucursal", event.target.value);
    setSucursal(event.target.value);
  };

  const changeZona = (event, setFieldValue) => {
    setFieldValue("numeroZona", event.target.value);
    setZona(event.target.value);
  };

  // const changeSucursal = (event) => {
  //   setSucursal(event.target.value);
  // };

  // const changeNoSucursal = (event) => {
  //   setNoSucursal(event.target.value);
  // };

  // const changeZona = (event, setFieldValue) => {
  //   setZona(event.target.value);
  //   setFieldValue("numeroZona", event.target.value);
  // };

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Catálogo" subtitle="Administración de Zona y Sucursales"></Header>

          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                  }}
                >
                  <TextField fullWidth variant="filled" type="text" label="Sucursal" name="sucursal" value={values.sucursal} onChange={(event) => changeSucursal(event, setFieldValue)} onBlur={handleBlur} error={!!touched.sucursal && !!errors.sucursal} helperText={touched.sucursal && errors.sucursal} sx={{ gridColumn: "span 2" }} />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="No. Sucursal"
                    name="no_sucursal"
                    value={values.no_sucursal}
                    onChange={(event) => {
                      setFieldValue("no_sucursal", event.target.value);
                      setNoSucursal(event.target.value);
                    }}
                    onBlur={handleBlur}
                    error={!!touched.no_sucursal && !!errors.no_sucursal}
                    helperText={touched.no_sucursal && errors.no_sucursal}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                    <Select fullWidth variant="filled" type="text" onBlur={handleBlur} value={values.numeroZona} onChange={(event) => changeZona(event, setFieldValue)} name="numeroZona" id="numeroZona" error={!!touched.numeroZona && !!errors.numeroZona}>
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
                    {touched.numeroZona && errors.numeroZona && <FormHelperText style={{ color: "red" }}>{errors.numeroZona}</FormHelperText>}
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    <AddCircleOutlinedIcon />
                    Agregar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>

          {/* <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                  }}
                >
                  <TextField fullWidth variant="filled" type="text" label="Sucursal" name="sucursal" value={sucursal} onChange={(event) => changeSucursal(event, setFieldValue)} onBlur={handleBlur} error={!!touched.sucursal && !!errors.sucursal} helperText={touched.sucursal && errors.sucursal} sx={{ gridColumn: "span 2" }} />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="No. Sucursal"
                    name="no_sucursal"
                    value={no_sucursal}
                    onChange={(event) => {
                      changeNoSucursal(event);
                    }}
                    onBlur={handleBlur}
                    error={!!touched.no_sucursal && !!errors.no_sucursal}
                    helperText={touched.no_sucursal && errors.no_sucursal}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                    <Select fullWidth variant="filled" type="text" onBlur={handleBlur} value={zona} onChange={(event) => changeZona(event, setFieldValue)} name="numeroZona" id="numeroZona" error={!!touched.numeroZona && !!errors.numeroZona}>
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
                    {touched.numeroZona && errors.numeroZona && <FormHelperText style={{ color: "red" }}>{errors.numeroZona}</FormHelperText>}
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
                    Agregar
                  </Button>
                </Box>
              </form>
            )}
          </Formik> */}

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
            <DataGrid rows={listSucursales} columns={columns} slots={{ toolbar: GridToolbar }} />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default AreaBranches;
