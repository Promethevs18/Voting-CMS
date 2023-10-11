import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./global/Sidebar";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("Dashboard");

  //eto ang magchecheck if may user na nakalogin
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar setActive={setActive} active={active} user={user} />
          <main className="content">
            <Topbar />
            <ToastContainer position="top-center" />
            <Routes setUser={user}>
              <Route
                path="/"
                element={<Dashboard setActive={setActive} user={user} />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

//THIS PROJECT WAS MADE BY PROMETHEUS
