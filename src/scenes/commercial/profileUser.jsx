import { useEffect, useState } from "react";
import { useTheme, Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import configURL from "../../config";

const ProfileUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSidebar, setIsSidebar] = useState(true);
    const { userID } = useParams();

    const [dataUser, setDataUser] = useState({"nombreRazonSocial": "OSCAR",});

    // console.log(`USER ID: ${userID}`);
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const navigate = useNavigate();
    const handleButtonClickShowDocument = () => {
        navigate('/commercial/show-document');
    };

    useEffect(() => {
        const fetchProfileUser = async () => {
            try {
                const response = await fetch(configURL.apiBaseUrl+"/Expediente/"+userID, {
                    method : "GET"
                });
                const result = await response.json();
                console.log(result);
                setDataUser(result);
            } catch (error) {
                alert(error);
            }
        }

        fetchProfileUser();
    }, [])

    return (
        <div className="app">
            <SidebarPro isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Box m="20px">
                    <Header title="Comercial" subtitle="Información de la solicitud" />

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={dataUser}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
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
                                    label="Nombre/Razón Social"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.nombreRazonSocial}
                                    name="nombreRazonSocial"
                                    error={!!touched.nombreRazonSocial && !!errors.nombreRazonSocial}
                                    helperText={touched.nombreRazonSocial && errors.nombreRazonSocial}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="RFC"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rfc}
                                    name="rfc"
                                    error={!!touched.rfc && !!errors.rfc}
                                    helperText={touched.rfc && errors.rfc}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Número Cliente"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_client}
                                    name="num_client"
                                    error={!!touched.num_client && !!errors.num_client}
                                    helperText={touched.num_client && errors.num_client}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Fecha de Solicitud"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.date_solicitud}
                                    name="date_solicitud"
                                    error={!!touched.date_solicitud && !!errors.date_solicitud}
                                    helperText={touched.date_solicitud && errors.date_solicitud}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tipo Solicitud"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type_solicitud}
                                    name="type_solicitud"
                                    error={!!touched.type_solicitud && !!errors.type_solicitud}
                                    helperText={touched.type_solicitud && errors.type_solicitud}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tipo de Cliente"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type_client}
                                    name="type_client"
                                    error={!!touched.type_client && !!errors.type_client}
                                    helperText={touched.type_client && errors.type_client}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Zona"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.zona}
                                    name="zona"
                                    error={!!touched.zona && !!errors.zona}
                                    helperText={touched.zona && errors.zona}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Sucursal Cabecera"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sucursal}
                                    name="sucursal"
                                    error={!!touched.sucursal && !!errors.sucursal}
                                    helperText={touched.sucursal && errors.sucursal}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Capturado </InputLabel>
                                    <Select
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="capturado"
                                        error={!!touched.zone && !!errors.zone}
                                        helperText={touched.zone && errors.zone}
                                        sx={{ gridColumn: "span 1" }}
                                    >
                                        <MenuItem value={10}>opcion 1</MenuItem>
                                        <MenuItem value={20}>opcion 2</MenuItem>
                                        <MenuItem value={30}>opcion 3</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Giro Empresarial"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.giro_empresarial}
                                    name="giro_empresarial"
                                    error={!!touched.giro_empresarial && !!errors.giro_empresarial}
                                    helperText={touched.giro_empresarial && errors.giro_empresarial}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Cambios en acta constitutiva"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.acta_constitutiva}
                                    name="acta_constitutiva"
                                    error={!!touched.acta_constitutiva && !!errors.acta_constitutiva}
                                    helperText={touched.acta_constitutiva && errors.acta_constitutiva}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ gridColumn: "span 3" }}
                                >
                                    Domicilio
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Calle"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.calle}
                                    name="calle"
                                    error={!!touched.calle && !!errors.calle}
                                    helperText={touched.calle && errors.calle}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Núm. Interior"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_interior}
                                    name="num_interior"
                                    error={!!touched.num_interior && !!errors.num_interior}
                                    helperText={touched.num_interior && errors.num_interior}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Núm. Exterior"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_exterior}
                                    name="num_exterior"
                                    error={!!touched.num_exterior && !!errors.num_exterior}
                                    helperText={touched.num_exterior && errors.num_exterior}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Colonia"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.colonia}
                                    name="colonia"
                                    error={!!touched.colonia && !!errors.colonia}
                                    helperText={touched.colonia && errors.colonia}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Municipio"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.municipio}
                                    name="municipio"
                                    error={!!touched.municipio && !!errors.municipio}
                                    helperText={touched.municipio && errors.municipio}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Estado"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.estado}
                                    name="estado"
                                    error={!!touched.estado && !!errors.estado}
                                    helperText={touched.estado && errors.estado}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="País"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.pais}
                                    name="pais"
                                    error={!!touched.pais && !!errors.pais}
                                    helperText={touched.pais && errors.pais}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="C.P"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.codigo_postal}
                                    name="codigo_postal"
                                    error={!!touched.codigo_postal && !!errors.codigo_postal}
                                    helperText={touched.codigo_postal && errors.codigo_postal}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Teléfono"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.telefono}
                                    name="telefono"
                                    error={!!touched.telefono && !!errors.telefono}
                                    helperText={touched.telefono && errors.telefono}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ gridColumn: "span 3" }}
                                >
                                    Información del Solicitante
                                </Typography>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Solicitante"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name_solicitante}
                                    name="name_solicitante"
                                    error={!!touched.name_solicitante && !!errors.name_solicitante}
                                    helperText={touched.name_solicitante && errors.name_solicitante}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Ejecutivo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ejecutivo}
                                    name="ejecutivo"
                                    error={!!touched.ejecutivo && !!errors.ejecutivo}
                                    helperText={touched.ejecutivo && errors.ejecutivo}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Núm. Nómina Ejecutivo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_ejecutivo}
                                    name="num_ejecutivo"
                                    error={!!touched.num_ejecutivo && !!errors.num_ejecutivo}
                                    helperText={touched.num_ejecutivo && errors.num_ejecutivo}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Gerente de Ventas"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.gerente_ventas}
                                    name="gerente_ventas"
                                    error={!!touched.gerente_ventas && !!errors.gerente_ventas}
                                    helperText={touched.gerente_ventas && errors.gerente_ventas}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Núm. Nómina Gerente Ventas"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_gerente_ventas}
                                    name="num_gerente_ventas"
                                    error={!!touched.num_gerente_ventas && !!errors.num_gerente_ventas}
                                    helperText={touched.num_gerente_ventas && errors.num_gerente_ventas}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Monto  de Crédito Solicitado"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.credito_solicitado}
                                    name="credito_solicitado"
                                    error={!!touched.credito_solicitado && !!errors.credito_solicitado}
                                    helperText={touched.credito_solicitado && errors.credito_solicitado}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Categoría"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="categoria"
                                    error={!!touched.categoria && !!errors.categoria}
                                    helperText={touched.categoria && errors.categoria}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Calificación"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="calificacion"
                                    error={!!touched.calificacion && !!errors.calificacion}
                                    helperText={touched.calificacion && errors.calificacion}
                                    sx={{ gridColumn: "span 1" }}
                                />
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
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Vigencia"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="vigencia"
                                    error={!!touched.vigencia && !!errors.vigencia}
                                    helperText={touched.vigencia && errors.vigencia}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Monto Crédito"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="monto_credito"
                                    error={!!touched.monto_credito && !!errors.monto_credito}
                                    helperText={touched.monto_credito && errors.monto_credito}
                                    sx={{ gridColumn: "span 1" }}
                                />
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
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Vigencia Pagaré"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="vigencia_pagare"
                                    error={!!touched.vigencia_pagare && !!errors.vigencia_pagare}
                                    helperText={touched.vigencia_pagare && errors.vigencia_pagare}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Vigencia Documentos"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="vigencia_documentos"
                                    error={!!touched.vigencia_documentos && !!errors.vigencia_documentos}
                                    helperText={touched.vigencia_documentos && errors.vigencia_documentos}
                                    sx={{ gridColumn: "span 1" }}
                                />

                                
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
}


const checkoutSchema = yup.object().shape({
    nombreRazonSocial: yup.string().required("required"),
    rfc: yup.string().required("required"),
    num_client: yup.string().required("required"),
    date_solicitud: yup.string().required("required"),
    type_solicitud: yup.string().required("required"),
    type_solicitud: yup.string().required("required"),
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
    name_solicitante: yup.string().required("required"),
    ejecutivo: yup.string().required("required"),
    num_ejecutivo: yup.string().required("required"),
    gerente_ventas: yup.string().required("required"),
    num_gerente_ventas: yup.string().required("required"),
    credito_solicitado: yup.string().required("required"),
    categoria: yup.string().required("required"),
    calificacion: yup.string().required("required"),
    date_aceptacion: yup.string().required("required"),
    vigencia: yup.string().required("required"),
    monto_credito: yup.string().required("required"),
    date_pagare: yup.string().required("required"),
    vigencia_pagare: yup.string().required("required"),
    vigencia_documentos: yup.string().required("required"),
});
  
const initialValues = {
    name : "Persona 1",
    rfc : "SDR5455FDF",
    num_client : "234",
    date_solicitud : "05/05/2024",
    type_solicitud : "Aumento línea crédito",
    type_client : "Persona moral",
    zona : "Metro",
    sucursal : "Matriz",
    giro_empresarial : "Tecnología",
    acta_constitutiva : "NO",
    calle : "Avenida 1",
    num_interior : "400",
    num_exterior : "100",
    colonia : "Centro",
    municipio : "Cuauhtémoc",
    estado : "Ciudad de México",
    pais : "México",
    codigo_postal : "3434",
    telefono : "5555555555",
    name_solicitante : "Juan Pérez López",
    ejecutivo : "Santiago Mendoza Juárez",
    num_ejecutivo : "4344332",
    gerente_ventas : "Fernando Rodríguez Ulloa",
    num_gerente_ventas : "4343",
    credito_solicitado : "$3443",
    categoria : "",
    calificacion : "",
    date_aceptacion : "",
    vigencia : "",
    monto_credito : "",
    date_pagare : "",
    vigencia_pagare : "",
    vigencia_documentos : "",
};

export default ProfileUser;