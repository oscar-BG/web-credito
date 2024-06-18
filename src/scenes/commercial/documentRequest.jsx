import { useState } from "react";
import { 
    Box, 
    FormControl, 
    FormControlLabel, 
    FormLabel,
    TextField, 
    Button, 
    FormGroup, 
    Switch, 
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import Header from "../../components/Header";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";
import FormNuevoCredito from "./form_credit";
import configURL from "../../config";




const DocumentRequest = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    const [activeBusqueda, setActiveBusqueda] = useState(false);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [dataUser, setDataUser] = useState({
        "id": 0,
        "rfc": "",
        "nombreRazonSocial": "",
        "idSucursalZona": "",
        "tipoCliente": "",
        "actaConstitutiva": "",
        "cartaExpedicion": "",
        "cartaExpedicionDocumentos": "",
        "fechaSolicitud": "",
        "numeroCliente": "",
        "idSector": "",
        "giroEmpresarial": "",
        "calle": "",
        "numeroExterior": "",
        "numeroInterior": "",
        "colonia": "",
        "municipio": "",
        "estado": "",
        "pais": "",
        "cp": "",
        "nombreSolicitante": "",
        "nombreEjecutivo": "",
        "nominaEjecutivo": "",
        "nombreGerenteVentas": "",
        "nominaGerenteVentas": "",
        "montoCreditoSolicitado": "",
        "idEstatus": 0,
        "categoria": "",
        "calificacion": "",
        "montoCreditoAceptado": 0.00,
        "numeroZona": ""
    });
   

    const [state, setState] = useState({
        nuevo_credito: false,
        incremento_credito: false,
        incremento_plazo: false,
        incremento_credito_plazo: false,
        renovacion_vigencia : false,
        activeSwitch: ''
    });
    
    const handleChange = (event) => {
        const { name } = event.target;
        setState({
            nuevo_credito: false,
            incremento_credito: false,
            incremento_plazo: false,
            incremento_credito_plazo: false,
            renovacion_vigencia : false,
            [name]: event.target.checked,
            activeSwitch: name
        });
        
        if (name == 'incremento_credito' && event.target.checked || name == 'incremento_plazo' && event.target.checked || name == 'incremento_credito_plazo' && event.target.checked || name == 'renovacion_vigencia' && event.target.checked) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };
 

    const handleClose = (event) => {
        setOpen(false);
    }

    const renderFormulario = () => {
        console.log(state.nuevo_credito);
        if (state.nuevo_credito) {
            return <FormNuevoCredito dataUser={dataUser}></FormNuevoCredito>
        }

        if (showForm === true) {
            return <FormNuevoCredito dataUser={dataUser}></FormNuevoCredito>
        }
    }


    return (
        <div className="app">
            <SidebarPro isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />

                
                <Box m="20px">
                    <Header title="Comercial" subtitle="Generar nuevas solicitudes" />

                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Tipos de líneas de Credito </FormLabel>
                        <FormGroup>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>

                                    <FormControlLabel
                                        control={
                                            <Switch checked={state.nuevo_credito} onChange={handleChange} name="nuevo_credito" />
                                        }
                                        label="Nuevo crédito"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={state.incremento_credito} onChange={handleChange} name="incremento_credito" />
                                        }
                                        label="Incremento línea de crédito"
                                    />
                                </Grid>
                                <Grid item xs={4}>

                                    <FormControlLabel
                                        control={
                                            <Switch checked={state.incremento_plazo} onChange={handleChange} name="incremento_plazo" />
                                        }
                                        label="Incremento plazo de crédito"
                                    />
                                    <FormControlLabel 
                                        control={
                                            <Switch checked={state.incremento_credito_plazo} onChange={handleChange} name="incremento_credito_plazo" />   
                                        }
                                        label="Incremento en línea y plazo de crédito"
                                    />
                                </Grid>
                                <Grid item xs={4}>

                                    <FormControlLabel 
                                        control={
                                            <Switch checked={state.renovacion_vigencia} onChange={handleChange} name="renovacion_vigencia" />   
                                        }
                                        label="Renovación de vigencia"
                                    />
                                </Grid>
                            </Grid>
                            
                        </FormGroup>
                    </FormControl>

                    <Dialog 
                        open={open}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());

                                const myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");

                                const raw = JSON.stringify(formJson);

                                fetch(configURL.apiBaseUrl+"/Expediente/BuscarExpedientes", {
                                    method: "POST",
                                    body: raw,
                                    headers: myHeaders
                                })
                                .then((response) => {
                                    if (!response.ok) {
                                        if (response.status == 404) {
                                            console.log('No hay resultados')
                                        } else {
                                            throw new Error(`HTTP error! status: ${response.status}`);
                                        }
                                    }
                                    return response.json();
                                })
                                .then((result) => {
                                    setDataUser(result[0]);
                                    setShowForm(true);
                                })
                                .catch((error) => console.error(error));
                            }
                        }} 
                    >
                        <DialogTitle>Búsqueda por RFC</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="rfc"
                                name="rfc"
                                label="RFC"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
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

                    {renderFormulario()}

                </Box>

            </main>
        </div>
    );

}




export default DocumentRequest;