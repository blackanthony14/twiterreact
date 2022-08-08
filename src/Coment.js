import React from 'react'
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./Principal.css";
import FeedComents from './FeedComents';
function Coment() {
  return (
    <div className="app">
    <Sidebar />
    <FeedComents />
    <Widgets />
  </div> 
  )
}

export default Coment