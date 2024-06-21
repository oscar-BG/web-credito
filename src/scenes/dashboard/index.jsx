import { useEffect, useState } from "react";
import { Box, useTheme, Grid, ButtonBase } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Dashboar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [namecard, setNamecard] = useState("");
  const [iconcard, setIconCard] = useState();

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const dataUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    switch (dataUser.permisos) {
      case "comercial_matriz":
      case "comercial_foranea":
        setNamecard("Comercial");
        setIconCard(<ContactsOutlinedIcon sx={{ color: "#003773", fontSize: "60px" }} />);
        break;
      case "cartera_foranea":
      case "cartera_matriz":
        setNamecard("Cartera");
        setIconCard(<ReceiptOutlinedIcon sx={{ color: "#003773", fontSize: "60px" }} />);
        break;
      case "analista_credito":
        setNamecard("Analista de credito");
        setIconCard(<ManageSearchOutlinedIcon sx={{ color: "#003773", fontSize: "60px" }} />);
        break;
    }
  }, []);

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Inicio" subtitle="Bienvenido ..." sx={{color: "#003773"}}></Header>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
                <CardContent>
                  <ButtonBase onClick={() => handleNavigation("/config")} sx={{ width: "100%", height: "100%" }}>
                    {/* <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                      <StatBox
                        title="Configuración"
                        icon={
                          <Box
                            component="img"
                            src="../../icons/config_azul.png" // Ruta relativa de la imagen en la carpeta public
                            sx={{ width: 60, height: 60 }}
                            alt="PDF Icon"
                          />
                        }
                          sx={{ color: "#003773" }}
                      />
                    </Box> */}
                    <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                      <StatBox title="Configuración" icon={<SettingsApplicationsOutlinedIcon sx={{ color: "#003773", fontSize: "60px" }} />} />
                    </Box>
                  </ButtonBase>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
                <CardContent>
                  <ButtonBase onClick={() => handleNavigation("/commercial")} sx={{ width: "100%", height: "100%" }}>
                    {/* <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                      <StatBox
                        title="Configuración"
                        icon={
                          <Box
                            component="img"
                            src="../../icons/comercial_azul.png" // Ruta relativa de la imagen en la carpeta public
                            sx={{ width: 60, height: 60 }}
                            alt="PDF Icon"
                          />
                        }
                      />
                    </Box> */}
                    <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                      <StatBox title={namecard} icon={iconcard} />
                    </Box>
                  </ButtonBase>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
              <CardContent>
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
                          sx={{ color: "#003773", fontSize: "60px" }}
                        />
                      }
                    />
                  </Box>
                </ButtonBase>
                
              </CardContent>
            </Card>
          </Grid> */}
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: colors.primary[400], maxWidth: 260 }}>
              <CardContent>
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
                          sx={{ color: "#003773", fontSize: "60px" }}
                        />
                      }
                    />
                  </Box>
                </ButtonBase>
                
              </CardContent>
            </Card>
          </Grid> */}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Dashboar;
