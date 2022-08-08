import React from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Buscar en Twiter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>Ultimas noticias en twiter</h2>

        <TwitterTweetEmbed options={{ height: 400 }} tweetId={"1555299656153944066"} />

        {/* <TwitterTimelineEmbed
          sourceType="profile"
          screenName="aliciakeys"
          options={{ height: 400 }}
        /> */}

        <TwitterShareButton
          url={"https://facebook.com/cleverprogrammer"}
          options={{ text: "#reactjs is awesome", via: "cleverqazi" }}
        />
      </div>
    </div>
  );
}

export default Widgets;