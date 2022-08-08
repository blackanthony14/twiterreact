import React, {useState} from 'react'
import { Avatar, Button } from "@material-ui/core";
import "./TweetBox.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

function MiPerfil() {
    const [favoritos, setFavoritos] = useState(
        JSON.parse(localStorage.getItem("favoritos"))
      );
    const favi = favoritos[0];
    console.log(favi)
  return (
    <div className="tweetBox2">
        <div className="tweetBox__input2">
          <img src={favi.avatar} options={{ height: 400}}/>
        </div>
        <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {favi.displayName}{" "}
                  <span className="post__headerSpecial">
                    {favi.verified && <VerifiedUserIcon className="post__badge" />} @
                    {favi.username}
                  </span>
                </h3>
              </div>
              </div>
              </div>
    </div>
  )
}

export default MiPerfil