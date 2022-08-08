import React from 'react'
import LeftSidePanel from "./LeftSidePanel";
import { Link, useNavigate } from "react-router-dom";
import LoginAcount from './LoginAcount';

function Login() {
  return (
    <div className="loginPage__container">
      <LeftSidePanel/>
      <LoginAcount/>
    </div>
  )
}

export default Login