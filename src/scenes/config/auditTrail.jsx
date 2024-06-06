import { Box, TextField, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react"
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { mockDataAuditTrail } from "../../data/mockData";

const AuditTrail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const columns = [
        {field: "user", headerName: "Usuarios", flex: 1,},
        {field: "name", headerName: "Nombre de Usuario", flex: 1,},
        {field: "zona", headerName: "Zona", flex: 1,},
        {field: "sucursal", headerName: "Sucursal", flex: 1,},
        {field: "modulo", headerName: "Modulo", flex: 1,},
        {field: "accion", headerName: "Acción", flex: 1,},
        {field: "date", headerName: "Fecha", flex: 1,},
        {field: "hora", headerName: "Hora", flex: 1,}
    ];

    return <Box m="20px">
        <Header title="Audit Trail" subtitle="Registros de eventos"></Header>

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
                            type="date"
                            label="Fecha Inicio"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.rfc}
                            name="date_init"
                            error={!!touched.rfc && !!errors.rfc}
                            helperText={touched.rfc && errors.rfc}
                            InputLabelProps={{
                                shrink: true, 
                            }}
                            sx={{ gridColumn: "span 1" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="date"
                            label="Fecha Fin"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.rfc}
                            name="date_end"
                            error={!!touched.rfc && !!errors.rfc}
                            helperText={touched.rfc && errors.rfc}
                            InputLabelProps={{
                                shrink: true, 
                            }}
                            sx={{ gridColumn: "span 1" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                        <ContentPasteSearchOutlinedIcon></ContentPasteSearchOutlinedIcon>
                            Buscar
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
            <DataGrid  rows={mockDataAuditTrail} columns={columns} slots={{ toolbar: GridToolbar }} />
        </Box>
    </Box>
}

const checkoutSchema = yup.object().shape({
    date_init: yup.string().required("required"),
    date_end: yup.string(),
});

const initialValues = {
    date_init: "",
    date_end: "",
};
export default AuditTrail;