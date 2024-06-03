import { useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarPro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
                }}
            >
              {!isCollapsed && (
              <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
              >
                  <Typography variant="h6" color={colors.grey[100]}>
                  INFRA
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                  </IconButton>
              </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                  alt="profile-user"
                  width="100px"
                  height="50px"
                  src={`../../assets/infra.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  >
                  Ed Roh
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                    title="Inicio"
                    to="/"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                
                <Item
                title="Configuración"
                to="/config"
                icon={<SettingsApplicationsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Comercial"
                to="/commercial"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Cartera"
                to="/briefcase"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                />

                <Item
                title="Analista de crédito"
                to="/creditanalyst"
                icon={<ManageSearchOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Cerrar sesión"
                to="/signoff"
                icon={<LogoutOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                />
               
            </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarPro;
