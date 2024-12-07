import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import MenuContent from "./MenuContent";
import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";

const SideMenuMobile = ({
  open,
  toggleDrawer,
  selectedMenuIndex,
  setSelectedMenuIndex,
  setSelectedMenuName,
  setEvents,
  setLoading
}) => {
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
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
      console.log("Navigating to /login");
      navigate("/login");
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
            <Avatar
              sizes="small"
              alt={fullName}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
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
