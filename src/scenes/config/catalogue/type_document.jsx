import { useState } from "react";
import { Box, Typography, useTheme, Checkbox, TextField, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import { mockDataDocumentPersonFisica } from "../../../data/mockData";
import { mockDataDocumentMoralPerson } from "../../../data/mockData";
import { mockDataDocumentGovernment } from "../../../data/mockData";
import { mockDataDocumentMultinationalCompanies } from "../../../data/mockData";
import { mockDataDocumentGroupInfra } from "../../../data/mockData";
import { mockDataDocumentClientExport } from "../../../data/mockData";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Header from "../../../components/Header";

const TypeDocument = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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

    return <Box m="20px">
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
}

export default TypeDocument;