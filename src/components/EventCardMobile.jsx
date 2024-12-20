import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

const EventCardMobile = ({ event, toggleFavorite }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 1,
        position: "relative"
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        sx={{
          width: 50,
          height: 50,
          borderRadius: 1,
          alignSelf: "flex-start"
        }}
        image={event.imageUrl}
        alt={event.name}
      />

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          ml: 2,
          gap: 0.5
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "1rem", marginRight: 4 }}>
          {event.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.875rem" }}
        >
          Category: {event.categories.join(", ")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.875rem" }}
        >
          {event.address}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.875rem" }}
        >
          {event.distance} miles
        </Typography>
      </Box>

      {/* Heart Button */}
      <IconButton
        onClick={() => toggleFavorite(event.id, event.favorite)}
        aria-label="favorite"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          border: "none",
          background: "transparent"
        }}
      >
        <FavoriteRoundedIcon color={event.favorite ? "error" : "disabled"} />
      </IconButton>
    </Card>
  );
};

export default EventCardMobile;
