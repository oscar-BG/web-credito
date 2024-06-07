import { Box, useTheme, Grid, ButtonBase } from "@mui/material";
import { tokens } from "../../theme"
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Config = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
        <Box m="20px">
            <Header title="Configuración" subtitle=""></Header>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
                        <CardContent>

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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    
                    <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
                        <CardContent>

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
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
                        <CardContent>

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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Config;