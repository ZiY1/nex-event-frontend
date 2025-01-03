import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useState, useEffect, useContext } from "react";

import MenuContent from "./MenuContent";
import { AuthContext } from "../contexts/AuthContext";

const SideMenuMobile = ({
  open,
  toggleDrawer,
  selectedMenuIndex,
  setSelectedMenuIndex,
  setSelectedMenuName,
  setEvents,
  setLoading,
  setError
}) => {
  const { logout } = useContext(AuthContext);
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"));

  useEffect(() => {
    const handleStorageChange = () => {
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
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper"
        }
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%"
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar sizes="small" alt={fullName} sx={{ width: 36, height: 36 }}>
              {fullName ? fullName.charAt(0) : ""}
            </Avatar>
            <Typography component="p" variant="h6">
              {fullName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent
            selectedMenuIndex={selectedMenuIndex}
            setSelectedMenuIndex={setSelectedMenuIndex}
            setSelectedMenuName={setSelectedMenuName}
            setEvents={setEvents}
            setLoading={setLoading}
            setError={setError}
          />
          <Divider />
        </Stack>
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
      </Stack>
    </Drawer>
  );
};

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  selectedMenuIndex: PropTypes.number.isRequired,
  setSelectedMenuIndex: PropTypes.func.isRequired,
  setSelectedMenuName: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
};

export default SideMenuMobile;
