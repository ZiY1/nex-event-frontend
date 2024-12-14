import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState, useCallback } from "react";

import { eventAPI } from "../services/api";

const MenuContent = ({
  selectedMenuIndex,
  setSelectedMenuIndex,
  setSelectedMenuName,
  setEvents,
  setLoading,
  setError
}) => {
  const [location, setLocation] = useState(null);

  const getCurrentLocation = useCallback(() => {
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          setError(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, [setError, setLocation]);

  useEffect(() => {
    getCurrentLocation(); // Call once on mount
  }, [getCurrentLocation]);

  const getNearbyEvents = async () => {
    setLoading(true);
    setEvents([]);
    setError("");
    try {
      const response = await eventAPI.getNearbyEvents(
        location.lat,
        location.lon
      );
      setEvents(response.data.payload);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch nearby events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getFavoriteEvents = async () => {
    setLoading(true);
    setEvents([]);
    setError("");
    try {
      const response = await eventAPI.getFavoriteEvents();
      setEvents(response.data.payload);
    } catch (error) {
      console.error("Error fetching favorite events:", error);
      setError("Failed to fetch favorite events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedEvents = async () => {
    setLoading(true);
    setEvents([]);
    setError("");
    try {
      const response = await eventAPI.getRecommendEvents(
        location.lat,
        location.lon
      );
      setEvents(response.data.payload);
    } catch (error) {
      console.error("Error fetching recommended events:", error);
      setError("Failed to fetch recommended events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const mainListItems = [
    {
      text: "Nearby",
      icon: <NearMeRoundedIcon />,
      action: () => {
        getCurrentLocation();
        getNearbyEvents();
      }
    },
    {
      text: "Favorites",
      icon: <FavoriteRoundedIcon />,
      action: getFavoriteEvents
    },
    {
      text: "Recommendations",
      icon: <ThumbUpRoundedIcon />,
      action: () => {
        getCurrentLocation();
        getRecommendedEvents();
      }
    }
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block", mb: 1 }}>
            <ListItemButton
              selected={selectedMenuIndex === index}
              onClick={() => {
                setSelectedMenuIndex(index);
                setSelectedMenuName(item.text);
                item.action();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
