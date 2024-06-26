import { useEffect, useState } from "react";
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import { useNavigate } from 'react-router-dom';

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
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
      {/* <Link to={to} /> */}
    </MenuItem>
  );
};

const SidebarPro = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [titleMenu, setTitleMenu] = useState();
  const [iconMenu, setIconMenu] = useState(<ContactsOutlinedIcon />);
  

  const dataUser = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const handleButtonClick = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {

    setUsername(dataUser.correo);
    setName(dataUser.nombre);

    switch (dataUser.permisos) {
      case 'comercial_matriz':
      case 'comercial_forenea':
        setTitleMenu('Comercial');
        setIconMenu(<ContactsOutlinedIcon />);
        break;
      case 'cartera_forenea':
      case 'cartera_matriz':
        setTitleMenu('Cartera')
        setIconMenu(<ReceiptOutlinedIcon />);
        break;
      case 'analista_credito':
        setTitleMenu('Analista de credito');
        setIconMenu(<ManageSearchOutlinedIcon />);
        break;
    }
  }, [])

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
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
                >
                {name}
                </Typography>
                <Typography
                color={colors.grey[100]}
                sx={{ m: "10px 0 0 0" }}
                >
                {username}
                </Typography>
              </Box>
            </Box>

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Inicio"
                  to="/home"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                
                <SubMenu defaultOpen label={"Configuración"} icon={<SettingsApplicationsOutlinedIcon />}>
                  <Item
                    title="Usuarios"
                    to="/config/user"
                    icon={<PersonOutlineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Catálogos"
                    to="/config/catalogue"
                    icon={<SummarizeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Audit Trail"
                    to="/config/audittrail"
                    icon={<ContentPasteSearchOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
                
                <Item
                  title={titleMenu}
                  to="/commercial"
                  icon={iconMenu}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="Cartera"
                  to="/briefcase"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}

                {/* <Item
                  title="Analista de crédito"
                  to="/creditanalyst"
                  icon={<ManageSearchOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <MenuItem
                active={selected == 'cerrar_sesion'}
                style={{
                  color: colors.grey[100]
                }}
                icon={<LogoutOutlinedIcon />}
                onClick={handleButtonClick}
                >
                  <Typography> Cerrar sesión </Typography>
                </MenuItem>
                {/* <Item
                  title="Cerrar sesión"
                  to="/signoff"
                  icon={<LogoutOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
               
            </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarPro;
