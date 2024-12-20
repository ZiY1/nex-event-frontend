import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState, useEffect } from "react";

import EventCard from "./EventCard";
import EventCardMobile from "./EventCardMobile";
import EventCardSkeleton from "./EventCardSkeleton";
import { eventAPI } from "../services/api";

const MainList = ({ events, loading, error }) => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  // Determine screen size
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setFavoriteEvents(events);
  }, [events]);

  const toggleFavorite = (eventId, isFavorite) => {
    if (isFavorite) {
      eventAPI.unsetFavoriteEvent(eventId).then(() => {
        setFavoriteEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, favorite: false } : event
          )
        );
      });
    } else {
      eventAPI.setFavoriteEvent(eventId).then(() => {
        setFavoriteEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, favorite: true } : event
          )
        );
      });
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : loading ? (
        <Stack spacing={2}>
          {/* Render multiple skeletons while loading */}
          {Array.from({ length: 5 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </Stack>
      ) : favoriteEvents.length > 0 ? (
        <Stack spacing={2}>
          {favoriteEvents.map((event) =>
            isMobile ? (
              <EventCardMobile
                key={event.id}
                event={event}
                toggleFavorite={toggleFavorite}
              />
            ) : (
              <EventCard
                key={event.id}
                event={event}
                toggleFavorite={toggleFavorite}
              />
            )
          )}
        </Stack>
      ) : (
        events.length === 0 && (
          <Alert severity="info" sx={{ textAlign: "center", mt: 2 }}>
            No events available
          </Alert>
        )
      )}
    </Box>
  );
};

export default MainList;
