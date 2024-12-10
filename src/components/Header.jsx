import Stack from "@mui/material/Stack";
import * as React from "react";

import NavbarBreadcrumbs from "./NavbarBreadcrumbs";

const Header = ({ selectedMenuName }) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs selectedMenuName={selectedMenuName} />
    </Stack>
  );
};

export default Header;
