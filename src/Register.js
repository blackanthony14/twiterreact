import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import LeftSidePanel from "./LeftSidePanel";
import RigthSidePanel from "./RigthSidePanel";
import CreateAcount from "./CreateAcount";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="loginPage__container">
      <LeftSidePanel/>
      <RigthSidePanel/>
    </div>
  );
}

export default Register;
