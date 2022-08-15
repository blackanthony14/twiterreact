import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  Copyright,
  Typography,
} from "@mui/material";

function CreateAcount() {
    const [fetched, setFetched] = React.useState(false);
  var veri = false


  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      correo: data.get("email"),
      password: data.get("password"),
      displayName: data.get("displayName"),
      username: data.get("username"),
      verified: veri,
    });
    const datas={
        "correo":data.get("email"),
        "password":data.get("password"),
        "displayName":data.get("displayName"),
        "username":data.get("username"),
        "verified":veri,
        "avatar": data.get("avatar")
    }
    const res = await axios
          .post("https://twiterbackend.herokuapp.com/createAcount", datas)
          .then((res) => {
            // callback(null);
            console.log(res)
            setFetched(true);
            navigate("/login")
          } )
          .catch((err) => {
            console.error(err);
          });
  };
  const verified = (e) => {
    e.preventDefault();
    if (veri == false) {
      veri = true;
    } else if (veri == true) {
      veri = false
    }
    console.log(veri)
  };
  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Twuiter Anthony
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };
  return (
    <div className="loginPage__rightSide">
      <div className="rightSide__image2">
        <img
          src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/9f/Twitter_bird_logo_2012.svg/2534px-Twitter_bird_logo_2012.svg.png"
          alt=""
        />
      </div>

      <div className="rightSide__bigText2">
        <p>Register Page</p>
      </div>

      <div className="rightSide__smallText2">
        <p>Join Twitter today.</p>
      </div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ ml: 5 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="correo"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="username"
          label="username whitout @"
          type="text"
          id="username"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="displayName"
          label="Name and Last Name"
          type="text"
          id="displayName"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="avatar"
          label="Link de tu avatar"
          type="text"
          id="avatar"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={verified} value="verified" color="primary" />
          }
          label="Verifierd"
        />
        <Button
        
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid container>
          <Grid item xs>
            <Link  href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick={() => navigate("/login")} href="" variant="body2">
              {"Have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Box>
      {/* <div className="login__phone">
      <button
        onClick={() => navigate("/principal")}
        id="signin__phone"
        class="loginBtn"
      >
        Enter as guest
      </button>
    </div>

    <div className="login__or">
      <p>or</p>
    </div>
    <div className="login__agree">
      <p>
        By signin up, you agree to the <a>Terms of Service</a> and
        <a>Privacy</a> <br />
        <a>Policy</a>, including <a>Cookie Use</a>
      </p>
    </div>

    <div className="login__alreadyAccount">
      <p>Already have an account?</p>
    </div>

    <div className="login__signinBtn">
      <button id="signInBtn" class="loginBtn">
        Sign in
      </button>
    </div> */}
    </div>
  );
}

export default CreateAcount;
