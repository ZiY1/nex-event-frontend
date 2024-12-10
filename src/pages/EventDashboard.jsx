import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";

import AppNavbar from "../components/AppNavBar";
import Header from "../components/Header";
import MainGrid from "../components/MainGrid";
import SideMenu from "../components/SideMenu";
import AppTheme from "../contexts/AppTheme";

const EventDashboard = (props) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedMenuName, setSelectedMenuName] = useState("Nearby");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu
          selectedMenuIndex={selectedMenuIndex}
          setSelectedMenuIndex={setSelectedMenuIndex}
          setSelectedMenuName={setSelectedMenuName}
          setEvents={setEvents}
          setLoading={setLoading}
        />
        <AppNavbar
          selectedMenuIndex={selectedMenuIndex}
          setSelectedMenuIndex={setSelectedMenuIndex}
          setSelectedMenuName={setSelectedMenuName}
          setEvents={setEvents}
          setLoading={setLoading}
        />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto"
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 }
            }}
          >
            <Header selectedMenuName={selectedMenuName} />
            <MainGrid events={events} loading={loading} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default EventDashboard;
