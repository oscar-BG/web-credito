import { useState } from "react";
import { Box, useTheme, TextField, MenuItem, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import Header from "../../components/Header";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { useNavigate } from 'react-router-dom';


const CreditAnalyst = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (values) => {
      console.log(values);
    };

    const handleButtonClickExpediente = () => {
      navigate('/commercial/profile-user');
    };

    const columns = [
        { field: "rfc", headerName: "RFC" },
        {
          field: "name",
          headerName: "Nombre",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "type_client",
          headerName: "Tipo de cliente",
          flex: 1,
          renderHeader: (params) => (
            <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
              {params.colDef.headerName}
            </Box>
          ),
        },
        {
          field: "zone",
          headerName: "Zona",
          flex: 1,
          renderHeader: (params) => (
            <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
              {params.colDef.headerName}
            </Box>
          ),
        },
        {
            field: "sucursal",
            headerName: "Sucursal",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "data_rest",
            headerName: "Fecha Solicitud",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "date",
            headerName: "Fecha",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "vigencia",
            headerName: "Vigencia",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "monto",
            headerName: "Monto",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "date_pagare",
            headerName: "Fecha Pagaré",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "vigencia_pagare",
            headerName: "Vigencia Pagaré",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "vigencia_documentos",
            headerName: "Vigencia Documentos",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "estatus",
            headerName: "Estado",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
        },
        {
            field: "expediente",
            headerName: "Expediente",
            flex: 1,
            renderHeader: (params) => (
              <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' }}>
                {params.colDef.headerName}
              </Box>
            ),
            renderCell: ({ row: { expediente } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  borderRadius="4px"
                >
                  <Button color="secondary" sx={{ backgroundColor: "#1380D1" }} variant="contained" onClick={handleButtonClickExpediente}>
                    <VisibilityOutlinedIcon sx={{ color: '#FFFFFF' }}/>
                  </Button>
                </Box>
              );
            },
        },
        {
            field: "check_out",
            headerName: "Check Out",
            flex: 1,
            renderCell: ({ row: { check_out } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor="#87CD29"
                  borderRadius="4px"
                >
                  {check_out === true && <CheckCircleOutlinedIcon sx={{ color: '#FFFFFF' }}  />}
                </Box>
              );
            },
        },
        {
            field: "check_int",
            headerName: "Check In",
            flex: 1,
            renderCell: ({ row: { check_int } }) => {
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor="#EF2013"
                  borderRadius="4px"
                >
                  {check_int === false && <UnpublishedOutlinedIcon sx={{ color: '#FFFFFF' }} />}
                </Box>
              );
            },
        },
    ];

    return (
      <Box m="20px">
        <Header title="Analista de credito" subtitle="Lista de solicitudes" />

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
                label="Nombre/Razón social"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name_social}
                name="name_social"
                error={!!touched.name_social && !!errors.name_social}
                helperText={touched.name_social && errors.name_social}
                sx={{ gridColumn: "span 1" }}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Zona</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Zona"
                  value={age}
                  onChange={handleChange}
                  name="zone"
                  error={!!touched.zone && !!errors.zone}
                  helperText={touched.zone && errors.zone}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value={10}>Zona 1</MenuItem>
                  <MenuItem value={20}>Zona 2</MenuItem>
                  <MenuItem value={30}>Zona 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sucursal Cabecera</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  value={age}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="zone"
                  error={!!touched.zone && !!errors.zone}
                  helperText={touched.zone && errors.zone}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value={10}>Zona 1</MenuItem>
                  <MenuItem value={20}>Zona 2</MenuItem>
                  <MenuItem value={30}>Zona 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  value={age}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="status"
                  error={!!touched.zone && !!errors.zone}
                  helperText={touched.zone && errors.zone}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value={10}>Estatus 1</MenuItem>
                  <MenuItem value={20}>Estatus 2</MenuItem>
                  <MenuItem value={30}>Estatus 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de cliente</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  type="text"
                  value={age}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="status"
                  error={!!touched.zone && !!errors.zone}
                  helperText={touched.zone && errors.zone}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value={10}>Cliente 1</MenuItem>
                  <MenuItem value={20}>Cliente 2</MenuItem>
                  <MenuItem value={30}>Cliente 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">¿Cuenta con carta de execpción para entregas de documentos?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="SI" control={<Radio />} label="si" />
                  <FormControlLabel value="NO" control={<Radio />} label="no" />
                </RadioGroup>
              </FormControl>
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  <PersonSearchOutlinedIcon></PersonSearchOutlinedIcon>
                  Buscar cliente
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
          <DataGrid
            rows={mockDataTeam}
            columns={columns}
            slots={{ toolbar: GridToolbar }} 
          />
        </Box>
      </Box>
    );
}


const checkoutSchema = yup.object().shape({
  rfc: yup.string().required("required"),
  sucursal_cabecera: yup.string(),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const initialValues = {
  rfc: "",
  name_social: "",
  zone: "",
  sucursal_cabecera: "",
  address1: "",
  address2: "",
};

export default CreditAnalyst;