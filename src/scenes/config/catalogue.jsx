import { Box } from "@mui/material";
import { useTheme } from "@emotion/react"
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Catalogue = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m="20px">
        <Header title="Catálogo" subtitle="Administración de catálogo"></Header>
    </Box>
}

export default Catalogue;