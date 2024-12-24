import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState, useEffect, useContext } from "react";

import MenuContent from "./MenuContent";
import { AuthContext } from "../contexts/AuthContext";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box"
  }
});

const SideMenu = ({
  selectedMenuIndex,
  setSelectedMenuIndex,
  setSelectedMenuName,
  setEvents,
  setLoading,
  setError
}) => {
  const { logout } = useContext(AuthContext);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
      setFullName(localStorage.getItem("fullName"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper"
        }
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider"
        }}
      >
        <Avatar sizes="small" alt={fullName} sx={{ width: 36, height: 36 }}>
          {fullName ? fullName.charAt(0) : ""}
        </Avatar>
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {userId}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <MenuContent
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={setSelectedMenuIndex}
        setSelectedMenuName={setSelectedMenuName}
        setEvents={setEvents}
        setLoading={setLoading}
        setError={setError}
      />
      <Divider />
      <Stack sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>
    </Drawer>
  );
};

export default SideMenu;
