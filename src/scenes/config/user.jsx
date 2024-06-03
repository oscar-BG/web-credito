import { Box } from "@mui/material";
import { useTheme } from "@emotion/react"
import { tokens } from "../../theme";
import Header from "../../components/Header";

const User = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m="20px">
        <Header title="Usuarios" subtitle="Administración de usuarios"></Header>
    </Box>
}

export default User;