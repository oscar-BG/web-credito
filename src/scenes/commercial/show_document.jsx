import { useTheme, Box, Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header"
import { tokens } from "../../theme";
import { mockDataDocumentPersonFisica } from "../../data/mockData";
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Rotate90DegreesCcwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCcwOutlined';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';

const ShowDocument = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {field: "name", headerName : "Documentos", flex : 1},
        {field: "upload", headerName: "Acción",
            renderCell: ({row: {upload}}) => {
                return (
                    <BackupOutlinedIcon></BackupOutlinedIcon>
                );
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="Comercial" subtitle="Administración de documentos" />

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