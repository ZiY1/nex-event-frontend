import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EventCard from "./EventCard";
import { eventAPI } from "../services/api";
import { useState, useEffect } from "react";
import EventCardSkeleton from "./EventCardSkeleton";

const MainList = ({ events, loading }) => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);

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
      {loading ? (
        <Stack spacing={2}>
          {/* Render multiple skeletons while loading */}
          {Array.from({ length: 5 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </Stack>
      ) : favoriteEvents.length > 0 ? (
        <Stack spacing={2}>
          {favoriteEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </Stack>
      ) : (
        events.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 2 }}>{"No events available"}</Box>
        )
      )}
    </Box>
  );
};

export default MainList;
