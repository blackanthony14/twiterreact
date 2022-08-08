import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import { useNavigate } from "react-router-dom";

function GerPerfilSidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <TwitterIcon  onClick = {navigate("/principal")} className="sidebar__twitterIcon" />

      <SidebarOption Icon={HomeIcon} text="My Home" >
        <h2 onClick = {navigate('/principal')}>My home</h2>
      </SidebarOption>
      <SidebarOption Icon={SearchIcon} text="Explorar" >
      <h2 onClick={navigate("/getcuenta")}>Explorar</h2>
      </SidebarOption>
      {/* <SidebarOption Icon={NotificationsNoneIcon} text="Notificaciones" />
      <SidebarOption Icon={MailOutlineIcon} text="Mensajes" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Marcadores" /> */}
      {/* <SidebarOption Icon={ListAltIcon} text="Listas" /> */}
      <SidebarOption active Icon={PermIdentityIcon} text="Perfil" >
        <h2 onClick={navigate("/perfil")}>Perfil</h2>
      </SidebarOption>
      {/* <SidebarOption Icon={MoreHorizIcon} text="Mas" /> */}

      {/* Button -> Tweet */}
      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>

      <div className="widgets__widgetContainer2">
      <TwitterTimelineEmbed
          sourceType="profile"
          screenName="xxxtentacion"
          options={{ height: 400 }}
        />
      </div>
    </div>
  )
}

export default GerPerfilSidebar