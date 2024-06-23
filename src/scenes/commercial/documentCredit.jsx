import { useTheme } from "@emotion/react";
import { 
    Box,
    Grid,
    Typography
} from "@mui/material";
import { tokens } from "../../theme";
const DocumentCredit = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    <Box sx={{ flexGrow: 1, padding: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box
                  m="40px 0 40px 0"
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
                    <Typography variant="h5">
                        Subir documentos ......
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
};

export default DocumentCredit;