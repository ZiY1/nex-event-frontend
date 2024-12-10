import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import { dataDisplayCustomizations } from "../styles/customizations/dataDisplay";
import { feedbackCustomizations } from "../styles/customizations/feedback";
import { inputsCustomizations } from "../styles/customizations/inputs";
import { navigationCustomizations } from "../styles/customizations/navigation";
import { surfacesCustomizations } from "../styles/customizations/surfaces";
import {
  colorSchemes,
  typography,
  shadows,
  shape
} from "../styles/themePrimitives";

const AppTheme = ({ children, disableCustomTheme, themeComponents }) => {
  const theme = React.useMemo(
    () =>
      disableCustomTheme
        ? {}
        : createTheme({
            cssVariables: {
              colorSchemeSelector: "data-mui-color-scheme",
              cssVarPrefix: "template"
            },
            colorSchemes,
            typography,
            shadows,
            shape,
            components: {
              ...inputsCustomizations,
              ...dataDisplayCustomizations,
              ...feedbackCustomizations,
              ...navigationCustomizations,
              ...surfacesCustomizations,
              ...themeComponents
            }
          }),
    [disableCustomTheme, themeComponents]
  );

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object
};

export default AppTheme;
