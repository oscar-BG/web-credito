import { useState } from "react";
import { useTheme, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import { mockDataDocumentPersonFisica } from "../../data/mockData";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';

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

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    // const [open, setOpen] = useState(false);
    // const handleOpenModal = () => setOpen(true);
    // const handleCloseModal = () => setOpen(false);
    
    const columns = [
        {field: "name", headerName : "Documentos", flex : 1},
        {field: "upload", headerName: "Acción",
            renderCell: ({row: {upload}}) => {
                return (
                    <Button onClick={handleClickOpen}>
                        <BackupOutlinedIcon></BackupOutlinedIcon>
                    </Button>
                );
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="Comercial" subtitle="Administración de documentos" />

            <Dialog
                open={open}
                onClose={handleClose}                
            >
                <DialogTitle>Documento</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        Ingrese Información del documento
                    </DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="field1"
                        name="field1"
                        label="Field 1"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="field2"
                        name="field2"
                        label="Field 2"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="field3"
                        name="field3"
                        label="Field 3"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="field4"
                        name="field4"
                        label="Field 4"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="field5"
                        name="field5"
                        label="Field 5"
                        type="file"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" >
                        <Button onClick={handleClose}> Cerrar</Button>
                        <Button> Enviar </Button>
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
                            <Box display="flex" justifyContent="center" mt="20px">
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
                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ShowDocument;