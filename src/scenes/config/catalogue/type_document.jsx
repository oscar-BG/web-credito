import { useState } from "react";
import { Box, useTheme, Checkbox, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDocumentPersonFisica } from "../../../data/mockData";
import { mockDataDocumentMoralPerson } from "../../../data/mockData";
import { mockDataDocumentGovernment } from "../../../data/mockData";
import { mockDataDocumentMultinationalCompanies } from "../../../data/mockData";
import { mockDataDocumentGroupInfra } from "../../../data/mockData";
import { mockDataDocumentClientExport } from "../../../data/mockData";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Header from "../../../components/Header";
import SidebarPro from "../../global/Sidebar";
import Topbar from "../../global/Topbar";

const TypeDocument = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isSidebar, setIsSidebar] = useState(true);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const columnsTablePhysicalPerson = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
                );
            }
        }
    ];
    const columnsTableMoralPerson = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
                );
            }
        }
    ];

    const columnsTableGovernment = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
                );
            }
        }
    ];

    const columnsTableMultinational = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
                );
            }
        }
    ];
    const columnsTableGroupInfra = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
                );
            }
        }
    ];
    const columnsTableClientExport = [
        {field: "id", headerName : "No"},
        {field: "name", headerName: "Documento", flex : 1,},
        {field: "required", headerName : "Obligatoriedad", flex : 1,
            renderCell: ({ row : { required}}) => {
                return (
                    <Box width="40%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px">
                        { required === true ? <Checkbox {...label} defaultChecked /> : <Checkbox {...label} />}
                    </Box>
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
                    <Header title="Catálogo Documentos" subtitle="Tipos documentos persona Física"></Header>

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
                        <DataGrid  rows={mockDataDocumentPersonFisica} columns={columnsTablePhysicalPerson} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Header title="Catálogo Documentos" subtitle="Tipos documentos persona Moral"></Header>
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
                        <DataGrid  rows={mockDataDocumentMoralPerson} columns={columnsTableMoralPerson} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Header title="Catálogo Documentos" subtitle="Tipos documentos Gobierno"></Header>
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
                        <DataGrid  rows={mockDataDocumentGovernment} columns={columnsTableGovernment} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Header title="Catálogo Documentos" subtitle="Tipos documentos Empresas Multinacionales"></Header>
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
                        <DataGrid  rows={mockDataDocumentMultinationalCompanies} columns={columnsTableMultinational} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Header title="Catálogo Documentos" subtitle="Tipos documentos Grupo Infra"></Header>
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
                        <DataGrid  rows={mockDataDocumentGroupInfra} columns={columnsTableGroupInfra} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Header title="Catálogo Documentos" subtitle="Tipos documentos Clientes exportaciones"></Header>
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
                        <DataGrid  rows={mockDataDocumentClientExport} columns={columnsTableClientExport} />
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                <SaveAltOutlinedIcon></SaveAltOutlinedIcon>
                                Guardar
                            </Button>
                        </Box>
                    </Box>

                    <Box m="40px 0 150px 0"></Box>


                </Box>
            </main>
        </div>
    )
}

export default TypeDocument;