import { Box, useTheme, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, InputLabel, Select, MenuItem, Typography, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

const DocumentRequest = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="Comercial" subtitle="Generar nuevas solicitudes" />

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
                }) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Tipo de Solicitud</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                sx={{ gridColumn : "span 3"}}
                            >
                                <FormControlLabel value="opcion1" control={<Radio />} label="Nuevo Crédito" />
                                <FormControlLabel value="opcion2" control={<Radio />} label="Incremento línea de crédito" />
                                <FormControlLabel value="opcion3" control={<Radio />} label="Incremento plazo de crédito" />
                                <FormControlLabel value="opcion4" control={<Radio />} label="Incremento en línea y plazo de crédito" />
                                <FormControlLabel value="opcion5" control={<Radio />} label="Renovación de vigencia" />
                            </RadioGroup>
                        </FormControl>

                        <Box
                            mt="50px"
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                            }}
                        >
                            

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
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nombre/Razón Social"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.rfc}
                                name="name_social"
                                error={!!touched.rfc && !!errors.rfc}
                                helperText={touched.rfc && errors.rfc}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-label">Sucursal Cabecera</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="sucursal"
                                    error={!!touched.sucursal && !!errors.sucursal}
                                    helperText={touched.sucursal && errors.sucursal}
                                    
                                >
                                    <MenuItem value={10}>Sucursal 1</MenuItem>
                                    <MenuItem value={20}>Sucursal 2</MenuItem>
                                    <MenuItem value={30}>Sucursal 3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onChange={handleChange}
                                    name="zone"
                                    error={!!touched.zone && !!errors.zone}
                                    helperText={touched.zone && errors.zone}
                                >
                                    <MenuItem value={10}>Zona 1</MenuItem>
                                    <MenuItem value={20}>Zona 2</MenuItem>
                                    <MenuItem value={30}>Zona 3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-label">Tipo de cliente</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="type_client"
                                    error={!!touched.type_client && !!errors.type_client}
                                    helperText={touched.type_client && errors.type_client}
                                >
                                    <MenuItem value={10}>Cliente 1</MenuItem>
                                    <MenuItem value={20}>Cliente 2</MenuItem>
                                    <MenuItem value={30}>Cliente 3</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <FormLabel id="demo-radio-buttons-group-label">Cambios en Acta Constitutiva </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="SI" control={<Radio />} label="si" />
                                    <FormControlLabel value="NO" control={<Radio />} label="no" />
                                </RadioGroup>
                            </FormControl>

                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <FormLabel id="demo-radio-buttons-group-label">Cuenta con carta de execpción para entregas de documentos</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="SI" control={<Radio />} label="si" />
                                    <FormControlLabel value="NO" control={<Radio />} label="no" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-label">¿Cuáles?</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="document"
                                    error={!!touched.document && !!errors.document}
                                    helperText={touched.document && errors.document}
                                >
                                    <MenuItem value={10}>Opción 1</MenuItem>
                                    <MenuItem value={20}>Opción 2</MenuItem>
                                    <MenuItem value={30}>Opción 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            mt="50px"
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Fecha de Solicitud"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="date_request"
                                error={!!touched.date_request && !!errors.date_request}
                                helperText={touched.date_request && errors.date_request}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Número de Cliente"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="number_client"
                                error={!!touched.number_client && !!errors.number_client}
                                helperText={touched.number_client && errors.number_client}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                                <InputLabel id="demo-simple-select-label">Sector</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="sector"
                                    error={!!touched.sector && !!errors.sector}
                                    helperText={touched.sector && errors.sector}
                                >
                                    <MenuItem value={10}>Opción 1</MenuItem>
                                    <MenuItem value={20}>Opción 2</MenuItem>
                                    <MenuItem value={30}>Opción 3</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Giro Empresarial"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="giro_empresarial"
                                error={!!touched.giro_empresarial && !!errors.giro_empresarial}
                                helperText={touched.giro_empresarial && errors.giro_empresarial}
                                sx={{ gridColumn: "span 2" }}
                            />
                            
                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ gridColumn: "span 4" }}
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
                                name="calle"
                                error={!!touched.calle && !!errors.calle}
                                helperText={touched.calle && errors.calle}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Núm. Exterior"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="num_exterior"
                                error={!!touched.num_exterior && !!errors.num_exterior}
                                helperText={touched.num_exterior && errors.num_exterior}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Núm. Interior"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="num_interior"
                                error={!!touched.num_interior && !!errors.num_interior}
                                helperText={touched.num_interior && errors.num_interior}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Colonia"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="colonia"
                                error={!!touched.colonia && !!errors.colonia}
                                helperText={touched.colonia && errors.colonia}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Alcaldía o Municipio"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="alcaldia"
                                error={!!touched.alcaldia && !!errors.alcaldia}
                                helperText={touched.alcaldia && errors.alcaldia}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Estado"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="estado"
                                error={!!touched.estado && !!errors.estado}
                                helperText={touched.estado && errors.estado}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="País"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="pais"
                                error={!!touched.pais && !!errors.pais}
                                helperText={touched.pais && errors.pais}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="C.P"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="codigo_postal"
                                error={!!touched.codigo_postal && !!errors.codigo_postal}
                                helperText={touched.codigo_postal && errors.codigo_postal}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <Typography
                                variant="h5"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ gridColumn: "span 4" }}
                            >
                                Información del Solicitante
                            </Typography>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nombre del Solicitante"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name_solicitante"
                                error={!!touched.name_solicitante && !!errors.name_solicitante}
                                helperText={touched.name_solicitante && errors.name_solicitante}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nombre Ejecutivo Integral"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name_ejecutivo"
                                error={!!touched.name_ejecutivo && !!errors.name_ejecutivo}
                                helperText={touched.name_ejecutivo && errors.name_ejecutivo}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Núm. Nómina Ejecutivo"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="num_ejecutivo"
                                error={!!touched.num_ejecutivo && !!errors.num_ejecutivo}
                                helperText={touched.num_ejecutivo && errors.num_ejecutivo}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nombre Gerente de Ventas"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="name_gerente"
                                error={!!touched.name_gerente && !!errors.name_gerente}
                                helperText={touched.name_gerente && errors.name_gerente}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Núm. Nómina Gerente"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="num_gerente"
                                error={!!touched.num_gerente && !!errors.num_gerente}
                                helperText={touched.num_gerente && errors.num_gerente}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Monto de crédito solicitado"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="monto_credito"
                                error={!!touched.monto_credito && !!errors.monto_credito}
                                helperText={touched.monto_credito && errors.monto_credito}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                            <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                            Guardar
                            </Button>
                        </Box>
                    </form>
                )}

            </Formik>
        </Box>
    );

}


const checkoutSchema = yup.object().shape({
    rfc: yup.string().required("required"),
    name_social: yup.string().required("required"),
    sucursal: yup.string().required("required"),
    zone: yup.string().required("required"),
    date_request: yup.string().required("required"),
    number_client: yup.string().required("required"),
    giro_empresarial: yup.string().required("required"),
    calle: yup.string().required("required"),
    num_exterior: yup.string().required("required"),
    num_interior: yup.string().required("required"),
    colonia: yup.string().required("required"),
    alcaldia: yup.string().required("required"),
    estado: yup.string().required("required"),
    pais: yup.string().required("required"),
    codigo_postal: yup.string().required("required"),
    name_solicitante: yup.string().required("required"),
    name_ejecutivo: yup.string().required("required"),
    num_ejecutivo: yup.string().required("required"),
    name_gerente: yup.string().required("required"),
    num_gerente: yup.string().required("required"),
    monto_credito: yup.string().required("required"),
});
  
const initialValues = {
    rfc : "",
    name_social : "",
    sucursal : "",
    zone : "",
    date_request : "",
    number_client : "",
    giro_empresarial : "",
    calle : "",
    num_exterior : "",
    num_interior : "",
    colonia : "",
    alcaldia : "",
    estado : "",
    pais : "",
    codigo_postal : "",
    name_solicitante : "",
    name_ejecutivo : "",
    num_ejecutivo : "",
    name_gerente : "",
    num_gerente : "",
    monto_credito : "",
};

export default DocumentRequest;