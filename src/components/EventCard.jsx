import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

const EventCard = ({ event, toggleFavorite }) => {
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", alignItems: "center", p: 2 }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1 }}
        image={event.imageUrl}
        alt={event.name}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{event.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {event.categories.join(", ")}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {event.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.distance} miles
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => toggleFavorite(event.id, event.favorite)}
              aria-label="favorite"
              sx={{ border: "none", background: "transparent" }}
            >
              <FavoriteRoundedIcon
                color={event.favorite ? "error" : "disabled"}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
