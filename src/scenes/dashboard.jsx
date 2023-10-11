import { Box } from "@mui/material";
import Header from "../Components/Header";
import React from "react";


const Dashboard = ({ user }) => {

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;

//THIS PROJECT WAS MADE BY PROMETHEUS
