import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import Header from "../../components/Header";

const Config = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Header title="Configuracion" subtitle=""></Header>

        </Box>
    )
}

export default Config;