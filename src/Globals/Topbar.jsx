import { Box, IconButton, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../theme';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

const Topbar = () => {
    const tema = useTheme();
    const kulayMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex">
            <IconButton onClick={kulayMode.toggleColorMode}>
                {tema.palette.mode === "dark" ?(
                  <DarkModeOutlined/>
                  ) : (
                  <LightModeOutlined/>
                  )}
            </IconButton>
        </Box>
    </Box>
  )
}

export default Topbar