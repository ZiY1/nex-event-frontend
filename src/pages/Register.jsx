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
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import AuthCard from "../components/AuthCard";
import AuthContainer from "../components/AuthContainer";
import AppTheme from "../contexts/AppTheme";
import { register } from "../services/authService";

const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    userId: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });
  const [alert, setAlert] = React.useState({ severity: "", message: "" });
  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    if (alert.severity === "success" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      navigate("/login");
    }
  }, [alert, countdown, navigate]);

  const validateInputs = () => {
    if (!formData.firstName) {
      setAlert({ severity: "warning", message: "First name is required." });
      return false;
    }
    if (!formData.lastName) {
      setAlert({ severity: "warning", message: "Last name is required." });
      return false;
    }
    if (!formData.userId) {
      setAlert({ severity: "warning", message: "Username is required." });
      return false;
    }
    if (formData.password.length < 6) {
      setAlert({
        severity: "warning",
        message: "Password must be at least 6 characters long."
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setAlert({ severity: "warning", message: "Passwords do not match." });
      return false;
    }
    setAlert({ severity: "", message: "" });
    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const registerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      userId: formData.userId,
      password: formData.password
    };

    const result = await register(registerData);
    setAlert({
      severity: result.success ? "success" : "error",
      message: result.message
    });
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
            Register
          </Typography>
          <Box sx={{ width: "100%" }}>
            {alert.message && (
              <Alert severity={alert.severity} sx={{ mt: 2, width: "100%" }}>
                {alert.message}
                {alert.severity === "success" && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Redirecting to login in {countdown} seconds... or{" "}
                    <Link href="/login" onClick={() => navigate("/login")}>
                      click here to redirect now
                    </Link>
                    .
                  </Typography>
                )}
              </Alert>
            )}
          </Box>
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="userId">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="userId"
                name="userId"
                autoComplete="username"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Register
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </AuthCard>
      </AuthContainer>
    </AppTheme>
  );
};

export default Register;
