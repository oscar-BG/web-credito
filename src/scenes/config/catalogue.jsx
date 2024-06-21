import { useState } from "react";
import { Box, Grid, ButtonBase } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useNavigate } from "react-router-dom";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import SidebarPro from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Catalogue = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app">
      <SidebarPro isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <Header title="Catálogo" subtitle="Administración de catálogo"></Header>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ButtonBase onClick={() => handleNavigation("/config/catalogue/zone-branches")} sx={{ width: "100%", height: "100%" }}>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                  <StatBox title="Zonas y Sucursales" icon={<AddLocationAltOutlinedIcon sx={{ color: colors.greenAccent[500], fontSize: "60px" }} />} />
                </Box>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ButtonBase onClick={() => handleNavigation("/config/catalogue/file-status")} sx={{ width: "100%", height: "100%" }}>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                  <StatBox title="Estatus de expediente" icon={<TaskOutlinedIcon sx={{ color: colors.greenAccent[500], fontSize: "60px" }} />} />
                </Box>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ButtonBase onClick={() => handleNavigation("/config/catalogue/type-client")} sx={{ width: "100%", height: "100%" }}>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                  <StatBox title="Tipos de clientes" icon={<PeopleAltOutlinedIcon sx={{ color: colors.greenAccent[500], fontSize: "60px" }} />} />
                </Box>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ButtonBase onClick={() => handleNavigation("/config/catalogue/type-document")} sx={{ width: "100%", height: "100%" }}>
                <Box backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" height="150px">
                  <StatBox title="Tipos documentales" icon={<CreateNewFolderOutlinedIcon sx={{ color: colors.greenAccent[500], fontSize: "60px" }} />} />
                </Box>
              </ButtonBase>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Catalogue;
