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
    FormHelperText,
    Typography
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
import configURL from "../../config";


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

    const [listSector, setListSector] = useState([]);
    const [ sector, setSector] = useState(dataUser.idSector);
    const [loadingSector, setLoadingSector] = useState(true);


    const handleFormSubmit = (values) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(values);

        console.log(raw);

        fetch(configURL.apiBaseUrl+"/Expediente", {
            method: "POST",
            body: raw,
            headers : myHeaders
        })
        .then((response) => {
            if (response.status === 201) {
                return response.text();
            } else {
                alert("Error al enviar el formulario");
            }

        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch(configURL.apiBaseUrl+"/Sucursales", {
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
                const response = await fetch(configURL.apiBaseUrl+"/Sucursales/Zonas", {
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
                const response = await fetch(configURL.apiBaseUrl+"/Catalogos/TipoCliente", {
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
                const response = await fetch(configURL.apiBaseUrl+"/Catalogos/Cartas", {
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

        const fetchSector = async () => {
            try {
                const response = await fetch(configURL.apiBaseUrl+"/Catalogos/Sector", {
                    method: "GET"
                });
                const result = await response.json();
                setListSector(result);

            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSector(false);
            }
        }

        fetchSucursales();
        fetchTipoCliente();
        fetchZona();
        fetchCarta();
        fetchSector();
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

    const handleSelectSector = (event, setFieldValue) => {
        setSector(event.target.value);
        setFieldValue("idSector", event.target.value);
    }

    return (
        <Formik
            onSubmit={(values, { resetForm }) => {
                handleFormSubmit(values);
                resetForm();  // Opcional: Resetea el formulario después de enviarlo
            }}
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
                handleReset,
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
                            InputLabelProps={{
                                shrink: true, 
                            }}
                            sx={{ gridColumn: "span 2" }}
                        />

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
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
                                value={sector}
                                onBlur={handleBlur}
                                onChange={(event) => handleSelectSector(event, setFieldValue)}
                                name="idSector"
                                error={!!touched.idSector && !!errors.idSector}
                            >
                                {loadingSector ? (
                                    <MenuItem>Cargando</MenuItem>
                                ) : (
                                    listSector.map((sector) => (
                                        <MenuItem key={sector.id} value={sector.id}>
                                            {sector.sectorNombre}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {touched.idSector && errors.idSector && (
                                <FormHelperText style={{color : "red"}}>{errors.idSector}</FormHelperText>
                            )}
                        </FormControl>

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Giro Empresarial"
                            value={values.giroEmpresarial}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="giroEmpresarial"
                            id="giroEmpresarial"
                            error={!!touched.giroEmpresarial && !!errors.giroEmpresarial}
                            helperText={touched.giroEmpresarial && errors.giroEmpresarial}
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
                            value={values.calle}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="calle"
                            id="calle"
                            error={!!touched.calle && !!errors.calle}
                            helperText={touched.calle && errors.calle}
                            sx={{ gridColumn: "span 2" }}
                        />

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Núm. Exterior"
                            value={values.numeroExterior}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="numeroExterior"
                            error={!!touched.numeroExterior && !!errors.numeroExterior}
                            helperText={touched.numeroExterior && errors.numeroExterior}
                            sx={{ gridColumn: "span 2" }}
                        />

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Núm. Interior"
                            value={values.numeroInterior}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="numeroInterior"
                            error={!!touched.numeroInterior && !!errors.numeroInterior}
                            helperText={touched.numeroInterior && errors.numeroInterior}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Colonia"
                            value={values.colonia}
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
                            value={values.municipio}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="municipio"
                            error={!!touched.municipio && !!errors.municipio}
                            helperText={touched.municipio && errors.municipio}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Estado"
                            value={values.estado}
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
                            value={values.pais}
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
                            value={values.cp}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="cp"
                            error={!!touched.cp && !!errors.cp}
                            helperText={touched.cp && errors.cp}
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
                            value={values.nombreSolicitante}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nombreSolicitante"
                            error={!!touched.nombreSolicitante && !!errors.nombreSolicitante}
                            helperText={touched.nombreSolicitante && errors.nombreSolicitante}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Nombre Ejecutivo Integral"
                            value={values.nombreEjecutivo}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nombreEjecutivo"
                            error={!!touched.nombreEjecutivo && !!errors.nombreEjecutivo}
                            helperText={touched.nombreEjecutivo && errors.nombreEjecutivo}
                            sx={{ gridColumn: "span 2" }}
                        />

                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Núm. Nómina Ejecutivo"
                            value={values.nominaEjecutivo}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nominaEjecutivo"
                            error={!!touched.nominaEjecutivo && !!errors.nominaEjecutivo}
                            helperText={touched.nominaEjecutivo && errors.nominaEjecutivo}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Nombre Gerente de Ventas"
                            value={values.nombreGerenteVentas}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nombreGerenteVentas"
                            error={!!touched.nombreGerenteVentas && !!errors.nombreGerenteVentas}
                            helperText={touched.nombreGerenteVentas && errors.nombreGerenteVentas}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Núm. Nómina Gerente"
                            value={values.nominaGerenteVentas}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="nominaGerenteVentas"
                            error={!!touched.nominaGerenteVentas && !!errors.nominaGerenteVentas}
                            helperText={touched.nominaGerenteVentas && errors.nominaGerenteVentas}
                            sx={{ gridColumn: "span 2" }}
                        />
                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Monto de crédito solicitado"
                            value={values.montoCreditoSolicitado}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="montoCreditoSolicitado"
                            error={!!touched.montoCreditoSolicitado && !!errors.montoCreditoSolicitado}
                            helperText={touched.montoCreditoSolicitado && errors.montoCreditoSolicitado}
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
    )
}

const checkoutSchema = yup.object().shape({
    rfc:                        yup.string().required("Valor requerido"),
    nombreRazonSocial:          yup.string().required("Valor requerido"),
    idSucursalZona:             yup.string().required("Valor requerido"),
    tipoCliente:                yup.string().required("Valor requerido"),
    numeroZona:                 yup.string().required("Valor requerido"),
    actaConstitutiva :          yup.string().required("Seleccione uno de los valores"),
    cartaExpedicion :           yup.string().required("Seleccione uno de los valores"),
    cartaExpedicionDocumentos : yup.string().required("Valor requerido"),
    fechaSolicitud:             yup.date().required("Valor requerido"),
    numeroCliente:              yup.string().required("Valor requerido"),
    idSector:                   yup.string().required("Valor requerido"),
    giroEmpresarial :           yup.string().required("Valor requerido"),
    calle :                     yup.string().required("Valor requerido"),
    numeroExterior :            yup.string().required("Valor requerido"),
    numeroInterior :            yup.string().required("Valor requerido"),
    colonia:                    yup.string().required("Valor requerido"),
    municipio:                  yup.string().required("Valor requerido"),
    estado:                     yup.string().required("Valor requerido"),
    pais:                       yup.string().required("Valor requerido"),
    cp:                         yup.string().required("Valor requerido"),
    nombreSolicitante:          yup.string().required("Valor requerido"),
    nombreEjecutivo:            yup.string().required("Valor requerido"),
    nominaEjecutivo:            yup.string().required("Valor requerido"),
    nombreGerenteVentas:        yup.string().required("Valor requerido"),
    nominaGerenteVentas:        yup.string().required("Valor requerido"),
    montoCreditoSolicitado:     yup.number().required("Valor requerido")
});

export default FormNuevoCredito;