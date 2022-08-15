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

function LoginAcount() {
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [datos, setDatos] = useState(null);
  const [fetched, setFetched] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    localStorage.clear();
    event.preventDefault();
    const dataC = new FormData(event.currentTarget);
    console.log({
      password: dataC.get("password"),
      username: dataC.get("username"),
    });
    const datas = dataC.get("username");
    const res = await axios.get(`https://twiterbackend.herokuapp.com/cuentas/${datas}`);
    setDatos(res.data);
    console.log(res.data);
    localStorage.clear();
    if (res != null && res.data.password == dataC.get("password")) {
      localStorage.clear();
      if (!localStorage.getItem("favoritos")) {
        localStorage.clear();
        // case, no existe aun
        let data = JSON.stringify([res.data]);
        localStorage.setItem("favoritos", data);
        setFavoritos([res.data]);
        console.log("Primer localstorage");
        navigate("/principal");
      } else {
        // patron inmutable de actualizar un array
        let data = JSON.parse(localStorage.getItem("favoritos"));
        let newData = JSON.stringify([...data, res.datas]);
        localStorage.setItem("favoritos", newData);
        let tempFavoritos = [...favoritos, res.data];
        setFavoritos(tempFavoritos);
        console.log("Segundo localstorage");
        navigate("/principal");
      }
    } else {
      console.log("No se encontro la cuenta");
    }
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
        <p>Login Page</p>
      </div>

      <div className="rightSide__smallText2">
        <p>Join Twitter today.</p>
      </div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ ml: 5 }}>
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
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              onClick={() => navigate("/CreateAcount")}
              variant="body2"
              href=""
            >
              {"Don't have an account? Register"}
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

export default LoginAcount;
