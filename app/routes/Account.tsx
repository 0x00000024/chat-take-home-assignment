import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUser } from "../core/auth.js";
import {
  signIn,
  signUp,
  SignUpInRequest,
  SignUpInResponse,
} from "../core/axios.js";

export function Account(): JSX.Element {
  const [hideSignIn, setHideSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!hideSignIn) {
      setEmail("");
      setPassword("");
    }
  }, [hideSignIn]);

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (email && password) {
      const data: SignUpInRequest = {
        email: email,
        password: password,
      };
      signIn(data).then((response: SignUpInResponse) => {
        if (response.data) {
          setResponseMessage(
            "Successfully logged in!\nAutomatically redirect to the login page after 2 seconds"
          );
          setTimeout(() => {
            setCurrentUser(email);
            navigate("/rooms");
          }, 2000);
        } else {
          setResponseMessage(
            "Account does not exist or password does not match"
          );
        }
      });
    }
    if (!hideSignIn) {
      setHideSignIn(true);
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (email && password && hideSignIn) {
      const data: SignUpInRequest = {
        email: email,
        password: password,
      };
      signUp(data).then((response: SignUpInResponse) => {
        if (response.data) {
          setResponseMessage(
            "Successfully signed up!\nAutomatically redirect to the login page after 2 seconds"
          );
          setTimeout(() => {
            setHideSignIn(false);
            setResponseMessage("");
          }, 2000);
        } else {
          setResponseMessage(
            response.message +
              "\nHint:\n" +
              "400: The email must be an email\n" +
              "409: The email already exists\n"
          );
        }
      });
    }
    if (!hideSignIn) {
      setHideSignIn(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid item xs={12} mb={3}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {!hideSignIn && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleSignIn(e)
              }
            >
              Sign In
            </Button>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 3 }}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleSignUp(e)
            }
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Typography
        sx={{ mb: 2, whiteSpace: "pre-line" }}
        variant="h1"
        align="center"
      >
        {responseMessage}
      </Typography>
    </Container>
  );
}
