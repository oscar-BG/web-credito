import { Box, useTheme, Grid, ButtonBase } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { useNavigate } from 'react-router-dom';


const Dashboar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };


  return <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Inicio" subtitle="Bienvenido ..."></Header>
    </Box>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ButtonBase
          onClick={() => handleNavigation('/config')}
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
              title="Configuración"
              icon={
                <SettingsApplicationsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                />
              }
            />
          </Box>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ButtonBase
          onClick={() => handleNavigation('/commercial')}
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
              title="Comercial"
              icon={
                <ContactsOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                />
              }
            />
          </Box>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ButtonBase
          onClick={() => handleNavigation('/briefcase')}
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
              title="Cartera"
              icon={
                <ReceiptOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                />
              }
            />
          </Box>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <ButtonBase
          onClick={() => handleNavigation('/creditanalyst')}
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
              title="Análista de crédito"
              icon={
                <ManageSearchOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "60px" }}
                />
              }
            />
          </Box>
        </ButtonBase>
      </Grid>
    </Grid>
  </Box>
}

export default Dashboar;