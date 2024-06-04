import { useState } from "react";
import { Box, Typography, useTheme, TextField, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import { mockDataTypeClient } from "../../../data/mockData";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const TypeClient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [age, setAge] = useState('');

    const handleFormSubmit = (values) => {
      console.log(values);
    };

    const columns = [
        {
            field: "type",
            headerName: "Estatus Expediente"
        },
        {
            field: "editar",
            headerName: "Editar",
            flex: 1,
            renderCell: ({ row: { expediente } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={colors.greenAccent[700]}
                  borderRadius="4px"
                >
                  
                  <EditOutlinedIcon />
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {expediente}
                  </Typography>
                </Box>
              );
            },
        },
        {
            field: "eliminar",
            headerName: "Eliminar",
            flex: 1,
            renderCell: ({ row: { expediente } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={colors.greenAccent[700]}
                  borderRadius="4px"
                >
                  <DeleteOutlineOutlinedIcon />
                  <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {expediente}
                  </Typography>
                </Box>
              );
            },
        },
    ];

    return <Box m="20px">
        <Header title="Catalogo" subtitle="Administración de tipos de clientes"></Header>

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
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                        sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                        }}
                    >

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de Cliente</InputLabel>
                            <Select
                                fullWidth
                                variant="filled"
                                type="text"
                                label="status"
                                value={age}
                                onChange={handleChange}
                                name="status"
                                error={!!touched.zone && !!errors.zone}
                                helperText={touched.zone && errors.zone}
                                sx={{ gridColumn: "span 4" }}
                            >
                                <MenuItem value={10}>Cliente 1</MenuItem>
                                <MenuItem value={20}>Cliente 2</MenuItem>
                                <MenuItem value={30}>Cliente 3</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Box display="flex" justifyContent="center" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                        <AddCircleOutlinedIcon></AddCircleOutlinedIcon>
                            Agregar
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
            <DataGrid  rows={mockDataTypeClient} columns={columns} slots={{ toolbar: GridToolbar }} />
        </Box>
    </Box>
}

const checkoutSchema = yup.object().shape({
    zona: yup.string().required("required"),
    sucursal: yup.string(),
});

const initialValues = {
    zona: "",
    sucursal: "",
};

export default TypeClient;