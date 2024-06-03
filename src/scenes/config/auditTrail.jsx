import { Box } from "@mui/material";
import { useTheme } from "@emotion/react"
import { tokens } from "../../theme";
import Header from "../../components/Header";

const AuditTrail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <Box m="20px">
        <Header title="Audit Trail" subtitle="Registros de eventos"></Header>
    </Box>
}

export default AuditTrail;