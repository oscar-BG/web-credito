import { Box, useTheme, Grid, ButtonBase } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { useNavigate } from 'react-router-dom';

const Config = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
        <Box m="20px">
            <Header title="Configuracion" subtitle=""></Header>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ButtonBase
                    onClick={() => handleNavigation('/config/user')}
                    sx={{ width: '100%', height: '100%' }}
                    >
                    <Box
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="150px"
                    >
                        <StatBox
                        title="Usuarios"
                        icon={
                            <PersonOutlineOutlinedIcon
                            sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                            />
                        }
                        />
                    </Box>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ButtonBase
                    onClick={() => handleNavigation('/config/catalogue')}
                    sx={{ width: '100%', height: '100%' }}
                    >
                    <Box
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="150px"
                    >
                        <StatBox
                        title="Catálogos"
                        icon={
                            <SummarizeOutlinedIcon
                            sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                            />
                        }
                        />
                    </Box>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <ButtonBase
                    onClick={() => handleNavigation('/config/audittrail')}
                    sx={{ width: '100%', height: '100%' }}
                    >
                    <Box
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="150px"
                    >
                        <StatBox
                        title="Audit Trail"
                        icon={
                            <ContentPasteSearchOutlinedIcon
                            sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                            />
                        }
                        />
                    </Box>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Config;