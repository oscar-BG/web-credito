import { useState } from "react";
import { Box, TextField, MenuItem, FormControl, Button, FormHelperText } from "@mui/material";
import { Formik, useFormik } from "formik";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react"
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { mockDataUsers } from "../../data/mockData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";






const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSidebar, setIsSidebar] = useState(true);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [users, setUsers] = useState(mockDataUsers);

    const handleFormSubmit = (values, {resetForm}) => {
        console.log(values);
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("name", values.name);
        formData.append("sucursal", values.sucursal);
        formData.append("type_user", values.type_user);
        formData.append("zona", values.zona);
    
        console.log(formData);
    
        const newUser = {
            id : mockDataUsers.length + 1,
            username: values.username,
            name: values.name,
            permisos : values.permisos,
            zona : values.zona,
            sucursal: values.sucursal,
            password : "12345678"
        }
    
        mockDataUsers.push(newUser);
        
        setUsers([...users, newUser]);
        console.log(mockDataUsers);
    
        resetForm();
    
    };

    const columns = [
        {field: "username", headerName: "Usuario"},
        {
            field: "name",
            headerName: "Nombre",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
        {
            field: "permisos",
            headerName: "Tipo de Usuario",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
        {
            field: "zona",
            headerName: "Zona",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
        {
            field: "sucursal",
            headerName: "Sucursal",
            headerAlign: "left",
            align: "left",
            flex: 1
        },
        {
            field: "editar",
            headerName: "Editar",
            renderCell: ({ row: { editar } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={colors.greenAccent[600]}
                  borderRadius="4px"
                >
                <EditOutlinedIcon />
                </Box>
              );
            },
        },
        {
            field: "eliminar",
            headerName: "Eliminar",
            renderCell: ({ row: { eliminar } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={colors.greenAccent[600]}
                  borderRadius="4px"
                >
                  <DeleteOutlineOutlinedIcon />
                </Box>
              );
            },
        }
    ];

    return (
        <div className="app">
            <SidebarPro isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px">
                    <Header title="Usuarios" subtitle="Administración de usuarios"></Header>

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            resetForm
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                    sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                    }}
                                >
                                
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Usuario"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        name="username"
                                        id="username"
                                        error={!!touched.username && !!errors.username}
                                        helperText={touched.username && errors.username}
                                        sx={{ gridColumn: "span 1" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Nombre usuario"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        id="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        sx={{ gridColumn: "span 1" }}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            name="type_user"
                                            value={values.type_user}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.type_user && !!errors.type_user}
                                            sx={{ gridColumn: "span 1" }}
                                        >
                                            <MenuItem value="admin">Administrado</MenuItem>
                                            <MenuItem value="cartera">Jefe de Cartera Foráneo</MenuItem>
                                            <MenuItem value="comercial">Ejecutivos Comerciales</MenuItem>
                                            <MenuItem value="comercial">Analista de Credito</MenuItem>
                                            <MenuItem value="cartera">Analista de Cartera</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            // value={zona}
                                            name="zona"
                                            id="zona"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.zona && !!errors.zona}
                                            sx={{ gridColumn: "span 1" }}
                                        >
                                            <MenuItem value="1">Zona 1</MenuItem>
                                            <MenuItem value="2">Zona 1</MenuItem>
                                            <MenuItem value="3">Zona 1</MenuItem>
                                        </Select>
                                    </FormControl> 

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sucursal</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            // value={typeuser}
                                            name="sucursal"
                                            id="sucursal"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={!!touched.sucursal && !!errors.sucursal}
                                            helperText={touched.sucursal && errors.sucursal}
                                            sx={{ gridColumn: "span 1" }}
                                        >
                                            <MenuItem value="1">Usuario 1</MenuItem>
                                            <MenuItem value="2">Usuario 2</MenuItem>
                                            <MenuItem value="3">Usuario 3</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Box>
                                <Box display="flex" justifyContent="center" mt="20px">
                                    <Button type="submit" color="secondary" variant="contained">
                                        <PersonAddAlt1OutlinedIcon></PersonAddAlt1OutlinedIcon>
                                        Agregar Usuario
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
                        <DataGrid  rows={users} columns={columns} slots={{ toolbar: GridToolbar }} />
                    </Box>
                </Box>
            </main>
        </div>
    )
}

const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    name: yup.string().required("required"),
    type_user: yup.string().required("required"),
    zona: yup.string().required("required"),
    sucursal: yup.string().required("required"),
});

const initialValues = {
    username: "",
    name: "",
    type_user: "1",
    zona: "",
    sucursal: "",
};

export default User;