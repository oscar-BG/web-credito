import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import Topbar from "./scenes/global/Topbar";
import Dashboar from "./scenes/dashboard";
// import SidebarPro from "./scenes/global/Sidebar";
import Config from "./scenes/config";
import Commercial from "./scenes/commercial";
import Briefcase from "./scenes/briefcase";
import Creditanalyst from "./scenes/creditanalyst";
import User from "./scenes/config/user";
import Catalogue from "./scenes/config/catalogue";
import AuditTrail from "./scenes/config/auditTrail";
import FileStatus from "./scenes/config/catalogue/fileStatus";
import AreaBranches from "./scenes/config/catalogue/areaBranches";
import TypeClient from "./scenes/config/catalogue/typeClient";
import TypeDocument from "./scenes/config/catalogue/type_document";
import DocumentRequest from "./scenes/commercial/documentRequest";
import ProfileUser from "./scenes/commercial/profileUser";
import ShowDocument from "./scenes/commercial/show_document";
import LoginForm from "./scenes/auth/login";

// import Signoff from "./scenes/Signoff";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="/home" element={<Dashboar/>} />
            <Route path="/config" element={<Config/>} />
            <Route path="/commercial" element={<Commercial/>} />
            <Route path="/commercial/new-request-document" element={<DocumentRequest/>} />
            <Route path="/commercial/profile-user/:userID" element={<ProfileUser/>} />
            <Route path="/commercial/show-document/:clienteID/:carta/:rfc" element={<ShowDocument/>} />
            <Route path="/briefcase" element={<Briefcase/>} />
            <Route path="/creditanalyst" element={<Creditanalyst/>} />
            <Route path="/config/user" element={<User/>} />
            <Route path="/config/catalogue" element={<Catalogue/>} />
            <Route path="/config/catalogue/zone-branches" element={<AreaBranches/>} />
            <Route path="/config/catalogue/file-status" element={<FileStatus/>} />
            <Route path="/config/catalogue/type-client" element={<TypeClient/>} />
            <Route path="/config/catalogue/type-document" element={<TypeDocument/>} />
            <Route path="/config/audittrail" element={<AuditTrail/>} />
          </Routes>
          
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
