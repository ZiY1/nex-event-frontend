import { alpha } from "@mui/material/styles";
import { green, red, orange, gray } from "../themePrimitives";

export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const severityColorMap = {
          success: green[100],
          error: red[100],
          warning: orange[100],
          info: gray[100]
        };

        const borderColorMap = {
          success: green[300],
          error: red[300],
          warning: orange[300],
          info: gray[300]
        };

        return {
          borderRadius: 10,
          backgroundColor: severityColorMap[ownerState.severity] || orange[100],
          color: (theme.vars || theme).palette.text.primary,
          border: `1px solid ${alpha(borderColorMap[ownerState.severity] || orange[300], 0.5)}`,
          "& .MuiAlert-icon": {
            color: borderColorMap[ownerState.severity] || orange[500]
          },
          ...theme.applyStyles("dark", {
            backgroundColor: `${alpha(borderColorMap[ownerState.severity] || orange[900], 0.5)}`,
            border: `1px solid ${alpha(borderColorMap[ownerState.severity] || orange[800], 0.5)}`
          })
        };
      }
    }
  }
};
