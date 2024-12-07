import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const EventCardSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", alignItems: "center", p: 2 }}
    >
      {/* Mimic the image with a skeleton */}
      <Skeleton
        variant="rectangular"
        sx={{ width: 100, height: 100, borderRadius: 1 }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* Skeletons for text */}
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
        </Box>
        <Box
          sx={{
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCardSkeleton;
