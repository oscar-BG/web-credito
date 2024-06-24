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

const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
};

const FileStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [listStatus, setListStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);

  const initialValues = {
    estatus: "",
  };

  const checkoutSchema = yup.object().shape({
    estatus: yup.string().required("Estatus es requerido"),
  });

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const showSwal = () => {
    Swal.fire({
      title: "¡Tipo cliente existente!",
      text: "Ya existe un registro con la misma descripción.",
      icon: "warning",
      confirmButtonText: "Entendido",
    });
  };

  const showSwalError = (message) => {
    Swal.fire({
      title: "¡No se pudo editar!",
      text: message,
      icon: "error",
      confirmButtonText: "Entendido",
    });
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Catalogos/Estatus", {
        method: "GET",
      });
      const result = await response.json();
      console.log("result", result);
      setListStatus(result);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleFormSubmit = (values) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      estatusNombre: values.estatus,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log("requestOptions", requestOptions);

    fetch(configURL.apiBaseUrl + "/Catalogos/CreaEstatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchStatus();
      })
      .catch((error) => console.error(error));
  };

  const editarEstatus = (idRes, descRes) => {
    // setOpen(true);
    // setTipoID(idRes);
    // setDesc(descRes);
  };

  const eliminarEstatus = (id) => {
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
        fetch(`${configURL.apiBaseUrl}/Catalogos/Estatus/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status) {
              fetchStatus();
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
      field: "estatusNombre",
      headerName: "Estatus",
      flex: 7,
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Button color="secondary" variant="contained" onClick={() => eliminarEstatus(id)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
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
          <Header title="Catálogo" subtitle="Administración de estado de documento"></Header>

          <Formik
            onSubmit={(values, { resetForm }) => {
              const normalizedInput = normalizeString(values.estatus);
              console.log("normalizedInput", normalizedInput);
              const exists = listStatus.some((item) => normalizeString(item.estatusNombre) === normalizedInput);

              if (!exists) {
                handleFormSubmit(values);
                resetForm();
              } else {
                showSwal();
              }
            }}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                  }}
                >
                  <TextField fullWidth variant="filled" type="text" label="Estatus" name="estatus" value={values.estatus} onChange={handleChange} onBlur={handleBlur} error={!!touched.estatus && !!errors.estatus} helperText={touched.estatus && errors.estatus} sx={{ gridColumn: "span 2" }} />
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
            <DataGrid rows={listStatus} columns={columns} slots={{ toolbar: GridToolbar }} />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default FileStatus;
