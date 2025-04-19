import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bgimg from "./bg/signin.svg";
import bg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login({ setIsAuthenticated }) {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        navigate("/dash");
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>

      <Box
        sx={{
          width: "100vh",
          minHeight: "100vh",
          Height:9000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          backgroundImage:`url(${bg})`,
         
          px: { xs: 2, sm: 4, md: 8, lg: 50 }, // padding responsive
        }}
      >
        <Box
          sx={{
             display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* Left Image */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${bgimg})`,
              backgroundSize: "contain",
backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: 300,
            }}
          />

          {/* Right Form */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#3b33d5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              p: 4,
            }}
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <Avatar sx={{ mb: 1, bgcolor: "#fff", mx: "auto" }}>
                  <LockOutlinedIcon color="primary" />
                </Avatar>
                <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
                  Sign In
                </Typography>
              </Box>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Username"
                      name="email"
                      autoComplete="email"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      InputLabelProps={{ style: { color: "#fff" } }}
                      InputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <FormControlLabel
                        onClick={() => setRemember(!remember)}
                        control={<Checkbox checked={remember} sx={{ color: "#fff" }} />}
                        label={<span style={{ color: "#fff" }}>Remember me</span>}
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ mt: 1, color: "#beb4fb", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => navigate("/reset-password")}
                      >
                        Forgot password?
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        mt: 1,
                        borderRadius: 28,
                        backgroundColor: "#FF9A01",
                        color: "#fff",
                      }}
                    >
                      Sign in
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1" align="center">
                      Not registered yet?{" "}
                      <span
                        style={{ color: "#beb4fb", cursor: "pointer", textDecoration: "underline" }}
                        onClick={() => navigate("/register")}
                      >
                        Create an Account
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
}
