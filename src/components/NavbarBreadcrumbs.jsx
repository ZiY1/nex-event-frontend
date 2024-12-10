import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center"
  }
}));

const NavbarBreadcrumbs = ({ selectedMenuName }) => {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Events</Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {selectedMenuName}
      </Typography>
    </StyledBreadcrumbs>
  );
};

export default NavbarBreadcrumbs;
