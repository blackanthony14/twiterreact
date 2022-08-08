import React from 'react'
import LeftSidePanel from "./LeftSidePanel";
import { Link, useNavigate } from "react-router-dom";
import CreateAcount from './CreateAcount';

function CreateAcoutnPage() {
  return (
    <div className="loginPage__container">
      <LeftSidePanel/>
      <CreateAcount/>
    </div>
  )
}

export default CreateAcoutnPage