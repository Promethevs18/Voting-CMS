import { CssBaseline, ThemeProvider } from "@mui/material";
import {ColorModeContext, useMode} from "./theme"
import Sidebar from "./Globals/Sidebar";
import { useEffect, useState } from "react";
import Topbar from "./Globals/Topbar"
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { auth } from "./firebase";
import AddCandidate from "./Pages/AddCandidate";

function App() {

  const [theme, colorMode] = useMode();
  const [active, setActive] = useState("Dashboard");
  const [user, setUser] = useState(null);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }
      else{
        setUser(null)
      }
    })
  }, [])

  return (
   <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar setActive={setActive} active={active} user={user}/>
          <main className="content">
            <Topbar/>
            <ToastContainer position="top-center"/>
             <Routes setUser={user}>
                <Route 
                  path="/"
                  element={<Dashboard setActive={setActive} user={user} />}   />
                <Route
                  path="/addcandidate"
                  element={<AddCandidate  user={user}/>}
                  />
             </Routes>
          </main>
        </div>
      </ThemeProvider>
   </ColorModeContext.Provider>
  );
}

export default App;
