import { useEffect, useState, } from "react";
import { useTheme, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import { mockDataDocumentPersonFisica } from "../../data/mockData";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ShowDocument = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen ] = useState(false);
    const [base64, setbase64] = useState('');
    const [isSidebar, setIsSidebar] = useState(true);

    // Información de documento
    // const 

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    

    // const base64 = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
    
    const formik = useFormik({
        initialValues: {
          file: null,
        },
        validationSchema: Yup.object({
          file: Yup.mixed().required('Archivo obligatorio'),
        }),
        onSubmit: (values) => {
            console.log(values);
            const formData = new FormData();
            formData.append("Cliente", "Bautista Oscar");
            formData.append("IDEXP", "202423");
            formData.append("TipoDocumento", "Document");
            formData.append('binFile', values.file);
    
            fetch('https://192.168.1.77:7094/api/AE/UploadDocument', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                console.log('Archivo subido exitosamente', data);
                //   resetForm();
                })
                .catch((error) => {
                console.error('Error al subir el archivo:', error);
                //   resetForm();
            });
        },
    });

    const show_documentExpediente = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idexp": "1",
            "iddb": "2",
            "tipoDoc": "Estados financieros"
        });

          
        fetch("https://192.168.1.65:7094/api/AE/GetDocumento", {
            method: "POST",
            body: raw,
            headers: myHeaders
        })
        .then((response) => response.text())
        .then((result) => {
            setbase64(result);
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        return () => {
          formik.resetForm();
        };
    }, [open]);

    const handleFileChange = (event) => {
        formik.setFieldValue('file', event.currentTarget.files[0]);
    };
    
    const columns = [
        {field: "name", headerName : "Documentos", flex : 1},
        {field: "upload", headerName: "Acción",
            renderCell: ({row: {upload, name}}) => {
                console.log(name);
                return (
                    upload === true ?
                    <Button variant="contained" color="info" onClick={show_documentExpediente}>
                        <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                    </Button>
                    :
                    <Button variant="contained" color="success" onClick={handleClickOpen}>
                        <BackupOutlinedIcon></BackupOutlinedIcon>
                    </Button>
                );
            }
        }
    ];

    return (
        <div className="app">
            <SidebarPro isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px">
                    <Header title="Comercial" subtitle="Administración de documentos" />

                    <Dialog
                        open={open}
                        onClose={handleClose} 
                    >
                        <DialogTitle>Documento</DialogTitle>
                        <DialogContent>
                        
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl error={formik.touched.file && Boolean(formik.errors.file)} fullWidth>
                                    <Input id="file" name="file" type="file" onChange={handleFileChange} />
                                    {formik.touched.file && formik.errors.file ? (
                                    <FormHelperText>{formik.errors.file}</FormHelperText>
                                    ) : null}
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Enviar
                                </Button>
                            </form>      

                        </DialogContent>
                        <DialogActions>
                            <Box display="flex" justifyContent="space-between" >
                                <Button onClick={handleClose}> Cerrar</Button>
                                
                            </Box>
                        </DialogActions>
                    </Dialog>

                    <Box sx={{ flexGrow: 1, padding: 1}}>
                        <Grid container spacing={2}> 
                            <Grid item xs={12} md={6}>
                                <Box
                                    m="40px 0 150px 0"
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
                                    <DataGrid  rows={mockDataDocumentPersonFisica} columns={columns} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    width="100%"
                                    height="75vh"
                                >
                                    {/* <Box display="flex" justifyContent="center" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            <AddOutlinedIcon></AddOutlinedIcon>
                                        </Button>
                                        <Button type="submit" color="secondary" variant="contained">
                                            <RemoveOutlinedIcon></RemoveOutlinedIcon>
                                        </Button>
                                        <Button type="submit" color="secondary" variant="contained">
                                            <Rotate90DegreesCcwOutlinedIcon></Rotate90DegreesCcwOutlinedIcon>
                                        </Button>
                                        <Button type="submit" color="secondary" variant="contained">
                                            <Rotate90DegreesCwOutlinedIcon></Rotate90DegreesCwOutlinedIcon>
                                        </Button>
                                    </Box> */}

                                    <Box display="flex" justifyContent="center" mt="20">
                                        <object data={"data:application/pdf;base64," + base64}
                                        type="application/pdf"
                                        width="400"
                                        height="750"
                                        >

                                        </object>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </main>
        </div>
    )
}

export default ShowDocument;