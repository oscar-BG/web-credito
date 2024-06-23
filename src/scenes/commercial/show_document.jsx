import { useEffect, useState } from "react";
import { useTheme, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Input, FormHelperText, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import configURL from "../../config";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ShowDocument = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(userData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const { userID, carta, rfc } = useParams();
  const [base64, setbase64] = useState("iVBORw0KGgoAAAANSUhEUgAAAJsAAABgCAYAAAAKNABWAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABJ0RVh0U29mdHdhcmUAR3JlZW5zaG90XlUIBQAAAQBJREFUeF7t0jENADAQA7Hyxxzpy+ImD2bgt+2gIBsZ2cjIRkY2MrKRkY2MbGRkIyMbGdnIyEZGNjKykZGNjGxkZCMjGxnZyMhGRjYyspGRjYxsZGQjIxsZ2cjIRkY2MrKRkY2MbGRkIyMbGdnIyEZGNjKykZGNjGxkZCMjGxnZyMhGRjYyspGRjYxsZGQjIxsZ2cjIRkY2MrKRkY2MbGRkIyMbGdnIyEZGNjKykZGNjGxkZCMjGxnZyMhGRjYyspGRjYxsZGQjIxsZ2cjIRkY2MrKRkY2MbGRkIyMbGdnIyEZGNjKykZGNjGxkZCMjGxnZyMhGRjYyspGRjYxsRHYfQZmZzI7xpikAAAAASUVORK5CYII=");
  const [mmTyoe, setMimeType] = useState("image/png");
  const [isSidebar, setIsSidebar] = useState(true);
  const [docsClient, setDocsClient] = useState([]);
  const [docsClientCredit, setDocsClientCredit] = useState([]);
  const [nameDoc, setNameDoc] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [montoSolicitado, setMonto] = useState(0);
  const [listStatus, setListStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [perfilUsuario] = useState(user.permisos);
  const [documents, setDocuments] = useState([]);
  const [visibleDocCredit, setVisibleDocCredit] = useState(false);
  const [visibleUploadDocCredit, setVisibleUploadDocCredit] = useState(false);
  // const [uploadDocument, setUploadDocument] = useState(false);

  var initialDocuments = [];

  const doctosCredito = ["Pagaré emitido por INFRA", "Seguro de Crédito / Carta de Crédito", "Carta de Aceptación de condiciones Crediticias", "Caratulas actas constitutivas", "Reporte Historial SISCOM", "Determinación de la línea de crédito", "Análisis de estados Financieros", "Análisis Buró de Crédito", "Validación INE", "Referencias Comerciales"];

  const doctosParciales = ["Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto", "Constancia de situación fiscal vigente", "Opinión de cumplimiento positiva vigente", "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)", "Acta constitutiva", "Poder notarial (Facultad de otorgar y suscribir títulos de crédito)", "Estados financieros", "Estados de cuenta bancarios de los últimos 2 meses a la fecha de solicitud", "Contrato / Pedido / Orden de compra", "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto", "Formato Autorización Buró de Crédito", "Identificación Oficial", "Check List Firma de Contrato", "Check List Firma de Pagaré", "Perfil del Cliente"];

  const requiredDocuments = ["Solicitud de Crédito firmada en original por el cliente, ejecutivo y máximo nivel comercial según punto", "Comprobante domicilio (No mayor a 3 meses a la fecha de solicitud)", "Copia de identificación del represante legal", "Acta constitutiva", "Poder notarial (Facultad de otorgar y suscribir títulos de crédito)", "Contrato / Pedido / Orden de compra", "Check list firma de contrado", "Proyección de ventas firmada en original por ejecutivo y máximo nivel comercial según punto", "Perfil del cliente firmado en original por el cliente, ejecutivo y máximo nivel comercial", "Check list de firma pagare"];

  const handleClickOpen = (nameDoc) => {
    setNameDoc(nameDoc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("Archivo obligatorio"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("Cliente", rfc);
      formData.append("IDEXP", rfc);
      formData.append("TipoDocumento", nameDoc);
      formData.append("binFile", values.file);

      fetch(`${configURL.apiBaseUrl}/api/AE/UploadDocument`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Archivo subido exitosamente", data);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error al subir el archivo:", error);
        }
      );
    },
  });

  const getClientDocuments = function () {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${configURL.apiBaseUrl}/Expediente/Documentos/${rfc}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        initialDocuments = result;
        const updatedDocuments = initialDocuments.map((result) => ({
          ...result,
          requerido: carta == "SI" ? requiredDocuments.includes(result.documentoNombre) : true,
        }));

        setDocuments(updatedDocuments);
      })
      .catch((error) => console.error(error));
  };

  const getExpediente = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const response = await fetch(`${configURL.apiBaseUrl}/Expediente/BuscarExpedientes`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ rfc: rfc }),
      });
      const result = await response.json();
      // console.log("result expediente", result);

      setStatus(result[0].idEstatus);
      setMonto(1000000);
      // setMonto(result[0].montoCreditoSolicitado);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(configURL.apiBaseUrl + "/Catalogos/Estatus", {
        method: "GET",
      });
      const result = await response.json();
      setListStatus(result);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  const show_documentExpediente = (documento, iddb) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      idexp: rfc,
      iddb: iddb.toString(),
      tipoDoc: documento,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${configURL.apiBaseUrl}/api/AE/GetDocumento`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setMimeType("application/pdf");
        setbase64(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.info("Permisos: ", perfilUsuario);
    switch (perfilUsuario) {
      case 'comercial_matriz':
        setVisibleDocCredit(false);
        break;
      case 'comercial_foranea':
        setVisibleDocCredit(false);
        break;
      case 'cartera_foranea':
        if (montoSolicitado < 2000000) {
          setVisibleDocCredit(true);
        }
        break;
      case 'cartera_matriz':
        // setVisibleDocCredit(false);
        if (montoSolicitado < 2000000) {
          setVisibleDocCredit(true);
        }
        break;
      case 'analista_credito':
        setVisibleDocCredit(true);
        break;
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetchStatus();
      await getExpediente();
    };

    fetchData();
    getClientDocuments();
    return () => {
      formik.resetForm();
    };
  }, [open]);

  useEffect(() => {
    determinePermissions();
  }, [montoSolicitado, perfilUsuario, documents]);

  const determinePermissions = () => {
    let allowedDocuments = [];
    let allowedDocumentsCredit = [];
    console.log(montoSolicitado, perfilUsuario, documents);
    if (montoSolicitado > 2000000) {
      if (perfilUsuario.includes("comercial_matriz") || perfilUsuario.includes("cartera_matriz") || perfilUsuario.includes("cartera_foranea")) {
        allowedDocuments = doctosParciales;
      } else if (perfilUsuario.includes("analista_credito")) {
        // allowedDocuments = doctosCredito;
        allowedDocumentsCredit = doctosCredito;
      }
    } else {
      if (perfilUsuario.includes("comercial_matriz")) {
        allowedDocuments = doctosParciales;
      } else if (perfilUsuario.includes("cartera_matriz") || perfilUsuario.includes("cartera_foranea")) {
        // allowedDocuments = doctosCredito;
        allowedDocumentsCredit = doctosCredito;
      } else if (perfilUsuario.includes("analista_credito")) {
        allowedDocuments = [];
      }
    }

    const updatedDocuments = documents
      .filter((doc) => allowedDocuments.includes(doc.documentoNombre))
      .map((doc) => ({
        ...doc,
        permitido: true,
      }));
    
    const updatedDocumentsCredit = documents
      .filter((doc) => allowedDocumentsCredit.includes(doc.documentoNombre))
      .map((doc) => ({
        ...doc,
        permitido: true
      }));

    setDocsClient(updatedDocuments);
    setDocsClientCredit(updatedDocumentsCredit);
    console.table(docsClientCredit);
  };

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  const handleSelectStatus = (event, setFieldValue) => {
    console.log("event status", event.target.value);
    setStatus(event.target.value);
    setFieldValue("idEstatus", event.target.value);
    // actualizaEstatus(event.target.value);
    // setFieldValue("idEstatus", event.target.value);
  };

  const handleDocumentCredit = () => {
    // Actualizar el status del expediente  a "check out"
    setVisibleUploadDocCredit(true);
    actualizaEstatus(6);
  }

  const actualizaEstatus = (idActualizaEstatus) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      idEstatus: idActualizaEstatus,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    var idExp = parseInt(userID);
    console.log("idExp", idExp);

    fetch(`${configURL.apiBaseUrl}/Expediente/Actualizar/${idExp}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const hideiddb = true;

  const columns = [
    { field: "documentoNombre", headerName: "Documento", flex: 1 },
    { field: "requerido", headerName: "Requerido", flex: 1, renderCell: (params) => (params.value ? "SI" : "NO") },
    ...(hideiddb ? [] : { headerName: "IDDB", field: "iddb" }),
    {
      field: "cargado",
      headerName: "Acción",
      renderCell: ({ row: { cargado, documentoNombre, id, iddb } }) => {
        return cargado ? (
          <Button variant="contained" color="info" onClick={() => show_documentExpediente(documentoNombre, iddb)}>
            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={() => handleClickOpen(documentoNombre)}>
            <BackupOutlinedIcon></BackupOutlinedIcon>
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
          <Header title="Comercial" subtitle="Administración de documentos" />
          <span>{montoSolicitado}</span>
          {/* onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema} */}
          <Formik>
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                    <Select fullWidth variant="filled" type="text" value={status} onBlur={handleBlur} onChange={(event) => handleSelectStatus(event, setFieldValue)} name="idEstatus" id="idEstatus" sx={{ gridColumn: "span 1" }}>
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
                  </FormControl>
                </Box>
              </form>
            )}
          </Formik>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Documento</DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <FormControl error={formik.touched.file && Boolean(formik.errors.file)} fullWidth>
                  <Input id="file" name="file" type="file" onChange={handleFileChange} />
                  {formik.touched.file && formik.errors.file ? <FormHelperText>{formik.errors.file}</FormHelperText> : null}
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Enviar
                </Button>
              </form>
            </DialogContent>
            <DialogActions>
              <Box display="flex" justifyContent="space-between">
                <Button onClick={handleClose}> Cerrar</Button>
              </Box>
            </DialogActions>
          </Dialog>

          <Box sx={{ flexGrow: 1, padding: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  m="40px 0 40px 0"
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
                  <DataGrid rows={docsClient} columns={columns} />
                </Box>
                {
                  visibleDocCredit ? (
                    <Box display="flex" justifyContent="center">
                      <Button variant="contained" size="large" color="secondary" onClick={handleDocumentCredit}>
                        Agregar documentos de análisis
                      </Button>
                    </Box>
                  ) : ``
                }
                
                {
                  visibleUploadDocCredit ? (

                    <Box
                      m="40px 0 40px 0"
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
                      {/* Mostrar documentos de crédito */}
                      <DataGrid rows={docsClientCredit} columns={columns} />
                    </Box>
                  ) : ``
                }


              </Grid>
              <Grid item xs={12} md={6}>
                <Box width="100%" height="75vh">
                  <Box display="flex" justifyContent="center" mt="20">
                    <object data={`data:${mmTyoe};base64, ${base64}`} type={`${mmTyoe}`} width="400" height="750" alt="red dot"></object>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default ShowDocument;
