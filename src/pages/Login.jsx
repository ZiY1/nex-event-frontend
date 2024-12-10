import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthContainer from "../components/AuthContainer";
import AppTheme from "../contexts/AppTheme";
import { AuthContext } from "../contexts/AuthContext";

const Login = (props) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = React.useState({
    userId: "",
    password: ""
  });
  const [alert, setAlert] = React.useState({ severity: "", message: "" });

  const validateInputs = () => {
    if (!credentials.userId) {
      setAlert({ severity: "warning", message: "Username is required." });
      return false;
    }
    if (credentials.password.length < 6) {
      setAlert({
        severity: "warning",
        message: "Password must be at least 6 characters long."
      });
      return false;
    }
    setAlert({ severity: "", message: "" });
    return true;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const result = await login(credentials);
    if (result.success) {
      navigate("/events");
    } else {
      setAlert({
        severity: "error",
        message: result.message
      });
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AuthContainer direction="column" justifyContent="space-between">
        <AuthCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box sx={{ width: "100%" }}>
            {alert.message && (
              <Alert severity={alert.severity} sx={{ mt: 2, width: "100%" }}>
                {alert.message}
              </Alert>
            )}
          </Box>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="userId">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="userId"
                name="userId"
                autoComplete="username"
                value={credentials.userId}
                onChange={(e) =>
                  setCredentials({ ...credentials, userId: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </AuthCard>
      </AuthContainer>
    </AppTheme>
  );
};

export default Login;
