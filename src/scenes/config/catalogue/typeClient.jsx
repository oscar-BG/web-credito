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

const TypeClient = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [listaTipoCliente, setListTipoCliente] = useState([]);
  const [descTipo, setDesc] = useState("");
  const [tipoID, setTipoID] = useState(0);
  const [open, setOpen] = useState(false);
  const initialValues = { tipoCliente: "" };

  const showSwal = () => {
    Swal.fire({
      title: "¡Tipo cliente existente!",
      text: "Ya existe un registro con la misma descripción.",
      icon: "warning",
      confirmButtonText: "Entendido",
    });
  };

  // const showSwalConfirm = () => {
  //   Swal.fire({
  //     title: "¡Eliminar registro!",
  //     input: "Esta acción no podrá deshacerse.",
  //     icon: "question",
  //     preConfirm: () => {},
  //   });
  // };

  const showSwalSuccess = () => {
    Swal.fire({
      title: "¡Tipo cliente existente!",
      text: "Ya existe un registro con la misma descripción.",
      icon: "success",
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

  const handleFormSubmit = (values) => {
    console.log(values.tipoCliente);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      tipo: values.tipoCliente,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(configURL.apiBaseUrl + "/Catalogos/CreaTipoCliente", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        fetchTipoCliente();
      })
      .catch((error) => console.error(error));
  };

  const fetchTipoCliente = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Catalogos/TipoCliente", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setListTipoCliente(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTipoCliente();
  }, []);

  const hideiddb = true;

  const editar_tipoCliente = (idRes, descRes) => {
    setOpen(true);
    setTipoID(idRes);
    setDesc(descRes);
  };

  const eliminar_tipoCliente = (id) => {
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
        fetch(`${configURL.apiBaseUrl}/Catalogos/TipoCliente/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status) {
              fetchTipoCliente();
            } else {
              showSwalError(result.message);
            }
          })
          .catch((error) => console.error(error));
      },
    });
  };

  const columns = [
    ...(hideiddb ? [] : { headerName: "ID", field: "id" }),
    {
      field: "tipo",
      headerName: "Descripción",
      flex: 7,
    },
    {
      field: "editar",
      headerName: "Editar",
      flex: 1,
      renderCell: ({ row: { id, tipo } }) => {
        return (
          <Button color="secondary" variant="contained" onClick={() => editar_tipoCliente(id, tipo)}>
            <EditOutlinedIcon />
          </Button>
        );
      },
    },
    {
      field: "eliminar",
      headerName: "Eliminar",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Button color="secondary" variant="contained" onClick={() => eliminar_tipoCliente(id)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        );
      },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const editedVal = formJson.tipoClienteEdit;
    const normalizedInput = normalizeString(editedVal);
    const exists = listaTipoCliente.some((item) => normalizeString(item.tipo) === normalizedInput);

    console.log("modificar ID", tipoID, "valor:", editedVal);

    if (!exists) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        tipoCliente: editedVal,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${configURL.apiBaseUrl}/Catalogos/EditaTipoCliente/${tipoID}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("Result", result);
          if (result.status) {
            setTipoID(0);
            setOpen(false);
            fetchTipoCliente();
          } else {
            showSwalError(result.message);
          }
        })
        .catch((error) => console.error(error));
    } else {
      showSwal();
      setOpen(false);
    }
  };

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Catálogo" subtitle="Administración de tipos de clientes"></Header>
          <Dialog
            open={open}
            PaperProps={{
              component: "form",
              onSubmit: handleSubmit,
            }}
          >
            <DialogTitle>Búsqueda por RFC</DialogTitle>
            <DialogContent>
              <TextField autoFocus required margin="dense" id="tipoClienteEdit" value={descTipo} name="tipoClienteEdit" label="Tipo Cliente" onChange={handleChange} type="text" fullWidth variant="standard" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
              <Button type="submit" color="primary">
                Buscar
              </Button>
            </DialogActions>
          </Dialog>

          <Formik
            onSubmit={(values, { resetForm }) => {
              const normalizedInput = normalizeString(values.tipoCliente);
              const exists = listaTipoCliente.some((item) => normalizeString(item.tipo) === normalizedInput);

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
                  <TextField fullWidth variant="filled" type="text" label="Tipo Cliente" name="tipoCliente" value={values.tipoCliente} onChange={handleChange} onBlur={handleBlur} error={!!touched.tipoCliente && !!errors.tipoCliente} helperText={touched.tipoCliente && errors.tipoCliente} sx={{ gridColumn: "span 2" }} />
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
            <DataGrid rows={listaTipoCliente} columns={columns} />
          </Box>
        </Box>
      </main>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  tipoCliente: yup.string().required("Valor requerido"),
});
export default TypeClient;
