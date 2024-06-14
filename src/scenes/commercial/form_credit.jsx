import React from "react"
import { useEffect, useState } from "react";
import { 
    Box, 
    useTheme, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    RadioGroup, 
    Radio, 
    TextField, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button,
    FormHelperText
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { Form } from "react-router-dom";


const FormNuevoCredito = ({dataUser}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [listSucursales, setListSucursales] = useState([]);
    const [sucursal, setSucursal] = useState(dataUser.idSucursalZona);
    const [loadingSucursal, setLoadingSucursal] = useState(true);

    const [listTipoCliente, setListTipoCliente] = useState([]);
    const [tipoCliente, setTipoCliente] = useState(dataUser.tipoCliente);
    const [loadingTipoCliente, setLoadingTipoCliente] = useState(true);
    
    const [listZona, setListZona] = useState([]);
    const [zona, setZona] = useState(dataUser.numeroZona);
    const [loadingZona, setLoadingZona] = useState(true);

    const [listCarta, setListCarta] = useState([]);
    const [carta, setCarta] = useState(dataUser.cartaExpedicionDocumentos);
    const [loadingCarta, setLoadingCarta] = useState(true);


    const handleFormSubmit = (values) => {
        console.log(values);
    };

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch("https://192.168.1.65:5555/Sucursales", {
                    method: "GET"
                });
                const result = await response.json();
                setListSucursales(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSucursal(false);
            }
        }

        const fetchZona = async () => {
            try {
                const response = await fetch("https://192.168.1.65:5555/Sucursales/Zonas", {
                    method: "GET"
                })
                const result = await response.json();
                setListZona(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingZona(false);
            }
        }

        const fetchTipoCliente = async () => {
            try {
                const response = await fetch("https://192.168.1.65:5555/Catalogos/TipoCliente", {
                    method: "GET"
                });
                const result = await response.json();
                setListTipoCliente(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingTipoCliente(false);
            }
        }

        const fetchCarta = async () => {
            try {
                const response = await fetch("https://192.168.1.65:5555/Catalogos/Cartas", {
                    method: "GET"
                });
                const result = await response.json();
                setListCarta(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingCarta(false);
            }
        }

        fetchSucursales();
        fetchTipoCliente();
        fetchZona();
        fetchCarta();
    }, []);

    const handleSelectChange = (event, setFieldValue) => {
        setSucursal(event.target.value)
        setFieldValue("idSucursalZona", event.target.value)
    }

    const handleSelectTipoCliente = (event, setFieldValue) => {
        setTipoCliente(event.target.value);
        setFieldValue("tipoCliente", event.target.value)
    }

    const handleSelectZona = (event, setFieldValue) => {
        setZona(event.target.value);
        setFieldValue("numeroZona", event.target.value);
    }

    const handleSelectCarta = (event, setFieldValue) => {
        setCarta(event.target.value);
        setFieldValue("cartaExpedicionDocumentos", event.target.value);
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues= {dataUser}
            validationSchema={checkoutSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>

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
                            value={values.nombreRazonSocial}
                            name="nombreRazonSocial"
                            error={!!touched.nombreRazonSocial && !!errors.nombreRazonSocial}
                            helperText={touched.nombreRazonSocial && errors.nombreRazonSocial}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-label">Sucursal Cabecera</InputLabel>
                            <Select
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                value={sucursal}
                                onChange={(event) => handleSelectChange(event, setFieldValue)}
                                name="idSucursalZona"
                                id="idSucursalZona"
                                error={!!touched.idSucursalZona && !!errors.idSucursalZona}
                            >
                                {loadingSucursal ? (
                                    <MenuItem disabled> Cargando ...</MenuItem>
                                ): (
                                    listSucursales.map((sucursal) => (
                                        <MenuItem  key={sucursal.id} value={sucursal.numeroSucursal}>
                                            {sucursal.sucursalNombre + ` [${sucursal.numeroSucursal}]`}
                                        </MenuItem >
                                    ))
                                )}   
                            </Select>
                            {touched.idSucursalZona && errors.idSucursalZona && (
                                <FormHelperText style={{color : "red"}}>{errors.idSucursalZona}</FormHelperText>
                            )}
                        </FormControl>

                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                            <Select
                                fullWidth
                                variant="filled"
                                type="text"
                                onBlur={handleBlur}
                                value={zona}
                                onChange={(event) => handleSelectZona(event, setFieldValue)}
                                name="numeroZona"
                                id="numeroZona"
                                error={!!touched.numeroZona && !!errors.numeroZona}
                            >
                                {loadingZona ? (
                                    <MenuItem>Cargando ...</MenuItem>
                                ): (
                                    listZona.map((zona) => (
                                        <MenuItem key={zona.numeroZona} value={zona.numeroZona}>
                                            {zona.zona}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {touched.numeroZona && errors.numeroZona && (
                                <FormHelperText style={{color : "red"}}>{errors.numeroZona}</FormHelperText>
                            )}
                        </FormControl>

                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-label">Tipo de cliente</InputLabel>
                            <Select
                                fullWidth
                                variant="filled"
                                type="text"
                                value={tipoCliente}
                                onBlur={handleBlur}
                                onChange={(event) => handleSelectTipoCliente(event, setFieldValue)}
                                name="tipoCliente"
                                id="tipoCliente"
                                error={!!touched.tipoCliente && !!errors.tipoCliente}
                            >
                                {loadingTipoCliente ? (
                                    <MenuItem disabled > Cargando ...</MenuItem>
                                ): (
                                    listTipoCliente.map((cliente) => (
                                        <MenuItem key={cliente.id} value={cliente.id}>
                                            {cliente.tipo}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {touched.tipoCliente && errors.tipoCliente && (
                                <FormHelperText style={{color : "red"}}>{errors.tipoCliente}</FormHelperText>
                            )}
                        </FormControl>

                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <FormLabel id="demo-radio-buttons-group-label">Cambios en Acta Constitutiva </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="actaConstitutiva"
                                id="actaConstitutiva"
                                value={values.actaConstitutiva}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="SI" control={<Radio />} label="si"  />
                                <FormControlLabel value="NO" control={<Radio />} label="no" />
                            </RadioGroup>
                            {touched.actaConstitutiva && errors.actaConstitutiva && (
                                <FormHelperText style={{color : "red"}}>{errors.actaConstitutiva}</FormHelperText>
                            )}
                        </FormControl>
                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <FormLabel id="demo-radio-buttons-group-label">Cuenta con carta de execpción para entregas de documentos</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="cartaExpedicion"
                                id="cartaExpedicion"
                                value={values.cartaExpedicion}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="SI" control={<Radio />} label="si" />
                                <FormControlLabel value="NO" control={<Radio />} label="no" />
                            </RadioGroup>
                            {touched.actaConstitutiva && errors.actaConstitutiva && (
                                <FormHelperText style={{color : "red"}}>{errors.actaConstitutiva}</FormHelperText>
                            )}
                        </FormControl>
                        
                        <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="demo-simple-select-label">¿Cuáles?</InputLabel>
                            <Select
                                fullWidth
                                variant="filled"
                                type="text"
                                value={carta}
                                onBlur={handleBlur}
                                onChange={(event) => handleSelectCarta(event, setFieldValue)}
                                name="cartaExpedicionDocumentos"
                                id="cartaExpedicionDocumentos"
                                error={!!touched.cartaExpedicionDocumentos && !!errors.cartaExpedicionDocumentos}
                            >
                                {loadingCarta ? (
                                    <MenuItem disabled>Cargando ...</MenuItem>
                                ): (
                                    listCarta.map((carta) => (
                                        <MenuItem key={carta.id} value={carta.id}>
                                            {carta.documentoNombre}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {touched.cartaExpedicionDocumentos && errors.cartaExpedicionDocumentos && (
                                <FormHelperText style={{color : "red"}}>{errors.cartaExpedicionDocumentos}</FormHelperText>
                            )}
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
                            value={values.fechaSolicitud}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="fechaSolicitud"
                            error={!!touched.fechaSolicitud && !!errors.fechaSolicitud}
                            helperText={touched.fechaSolicitud && errors.fechaSolicitud}
                            sx={{ gridColumn: "span 2" }}
                        />

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Número de Cliente"
                            value={values.numeroCliente}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="numeroCliente"
                            error={!!touched.numeroCliente && !!errors.numeroCliente}
                            helperText={touched.numeroCliente && errors.numeroCliente}
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

                        {/*
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
                        /> */}
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
    )
}

const checkoutSchema = yup.object().shape({
    rfc: yup.string().required("Valor requerido"),
    nombreRazonSocial: yup.string().required("Valor requerido"),
    idSucursalZona: yup.string().required("Valor requerido"),
    tipoCliente: yup.string().required("Valor requerido"),
    numeroZona: yup.string().required("Valor requerido"),
    actaConstitutiva : yup.string().required("Seleccione uno de los valores"),
    cartaExpedicion : yup.string().required("Seleccione uno de los valores"),
    cartaExpedicionDocumentos : yup.string().required("Valor requerido"),
    fechaSolicitud: yup.date().required("Valor requerido"),
    numeroCliente: yup.number().required("Valor requerido")
    // date_request: yup.string().required("required"),
    // number_client: yup.string().required("required"),
    // giro_empresarial: yup.string().required("required"),
    // calle: yup.string().required("required"),
    // num_exterior: yup.string().required("required"),
    // num_interior: yup.string().required("required"),
    // colonia: yup.string().required("required"),
    // alcaldia: yup.string().required("required"),
    // estado: yup.string().required("required"),
    // pais: yup.string().required("required"),
    // codigo_postal: yup.string().required("required"),
    // name_solicitante: yup.string().required("required"),
    // name_ejecutivo: yup.string().required("required"),
    // num_ejecutivo: yup.string().required("required"),
    // name_gerente: yup.string().required("required"),
    // num_gerente: yup.string().required("required"),
    // monto_credito: yup.string().required("required"),
});
  
// const initialValues = ;

export default FormNuevoCredito;