//THE CODE BELOW IS NECESSARY IF YOU ARE USING THE REACT-PRO-SIDEBAR VER 0.7.1
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { tokens } from '../theme';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem} from "react-pro-sidebar"
import { HomeOutlined, MenuOutlined } from '@mui/icons-material';
import {signOut} from "firebase/auth"
import { auth } from "../firebase"
import { toast } from 'react-toastify';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Item = ({title, to, icon, selected, setSelected, user}) =>{
 const tema = useTheme();
 const kulay = tokens(tema.palette.mode);

 const pinili = (pamagat) =>{
    if (user?.uid){
        signOut(auth).then(() =>{
            toast("You have successfully logged out")
        })
    }
    setSelected(pamagat)
 }
    return(
        <MenuItem
            active={selected === title}
            style={{color: kulay.grey[100]}}
            onClick={() => pinili(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}

const Sidebar = ({user}) => {

    const tema = useTheme();
    const kulay = tokens(tema.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [pinili, setPinili] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
            background: `${kulay.primary[400]} !important`,
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
        "& .pro-inner-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
     <ProSidebar collapsed={isCollapsed} style={{height:"100%"}}>
        <Menu iconShape = "square">
            <MenuItem 
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlined/> : undefined}
                style={{
                    margin: "10px 0 20px 0",
                    color: kulay.grey[100]
                }}
            >
                {!isCollapsed && (
                    <Box 
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="20px"
                    >
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlined/>
                        </IconButton>
                    </Box>
                )}
            </MenuItem>
             {!isCollapsed && (
                <Box mb="20px">
                    <Box display="flex" justifyContent="center" alignContent="center">
                        <img
                            alt="School Logo"
                            width="150px"
                            height="150px"
                            src="https://firebasestorage.googleapis.com/v0/b/pnhs-online-voting.appspot.com/o/Misc%2FSSG%20Logo.png?alt=media&token=3939d326-17b9-424b-9ef1-efc3b1f9559f&_gl=1*1bftppj*_ga*OTc5MjU5NDA0LjE2OTY4MjM3NjY.*_ga_CW55HF8NVT*MTY5Njk5NDU5MS4xMC4xLjE2OTY5OTQ2MjYuMjUuMC4w"
                            style={{cursor: "pointer", borderRadius: "50%"}}
                        />    
                    </Box>
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            color={kulay.grey[100]}
                            fontWeight="bold"
                            sx={{m:"10px 0 0 0"}}
                         >
                            Administrator
                         </Typography>             
                    </Box>
                </Box>
             )}
             <Box paddingLeft={!isCollapsed ? undefined: "10%"}>
                <Item
                    title="Dashboard"
                    to="/"
                    icon={<HomeOutlined/>}
                    selected={pinili}
                    setSelected={setPinili}
                />    
                  <Item
                    title="Add candidate"
                    to="/addcandidate"
                    icon={<HowToRegIcon/>}
                    selected={pinili}
                    setSelected={setPinili}
                /> 
             </Box>
        </Menu>   
     </ProSidebar>   
    </Box>
  )
}

export default Sidebar