import React from 'react'
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function RigthSidePanel() {
    const navigate = useNavigate();
  return (
    <div className="loginPage__rightSide">
        <div className="rightSide__image">
          <img
            src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/9f/Twitter_bird_logo_2012.svg/2534px-Twitter_bird_logo_2012.svg.png"
            alt=""
          />
        </div>

        <div className="rightSide__bigText">
          <p id = "texto">Happening now</p>
        </div>

        <div className="rightSide__smallText">
          <p>Join Twitter today.</p>
        </div>
        <div className="login__phone">
          <button
            onClick={() => navigate("/createAcount")}
            id="signin__phone"
            className="loginBtn"
          >
            Register Now
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
          <button onClick={() => navigate("/login")} id="signInBtn" className="loginBtn">
            Sing in
          </button>
        </div>
        <div className="login__signinBtn">
          <button onClick={() => navigate("/principal")} id="signInBtn" className="loginBtn">
            Sing in as a Guest
          </button>
        </div>
      </div>
  )
}

export default RigthSidePanel