import { Box } from '@mui/material'
import React from 'react'
import Header from "../Components/Header"

const Dashboard = () => {
  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between">
            <Header title="DASHBOARD" subtitle="Welcome to the voting system's dashboard"/>
        </Box>
        
    </Box>
  )
}

export default Dashboard