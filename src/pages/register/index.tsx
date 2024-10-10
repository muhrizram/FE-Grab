import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import grabfood from "../../assets/image/grabfood.png";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid green",
        }}
      >
        <img src={grabfood} alt="grabfood" style={{ width: 200 }} />
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "green",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "green",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "green",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "green",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "green",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "green",
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "green",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "green",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "green", color: "white" }}
          >
            Register
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Already Have an Account?</Typography>
            <Link
              to={"/login"}
              style={{
                color: "green",
                textDecoration: "none",
              }}
            >
              Log in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
