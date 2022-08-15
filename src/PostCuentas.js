import React, { forwardRef, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./TweetBox.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PublishIcon from "@material-ui/icons/Publish";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostCuentas = forwardRef((
    { displayName, username, verified, text, image, avatar, id, coments, likes, data, followers },
    ref
) => {
    const [likeStatus, setLikeStatus] = useState(
        localStorage.setItem("likeStatus", "false")
      );
      const [favoritos, setFavoritos] = useState(
        JSON.parse(localStorage.getItem("favoritos"))
      );
      const favi = favoritos[0];
      const [cuenta,setCuenta] = useState("")
   console.log(data)

   //Ver si lo seguimos
   const changeLike = async (e) => {
    let dat = e
    console.log("entra al click",dat);
    JSON.stringify(localStorage.setItem("id",dat))
    if (likeStatus == null || likeStatus == false || likeStatus == "false") {
      console.log("Entra al if");
      localStorage.setItem("likeStatus",JSON.stringify( true));
      setLikeStatus(localStorage.getItem("likeStatus"));
      console.log(likeStatus);
      const response = await axios.get(
        `https://twiterbackend.herokuapp.com/cuentasGet/${e}`
      );
      console.log(response.data.followers);
      console.log(response.data.id)
      actualizarLikes(response.data.followers)

      // putLikes(response.data.likes);
    } else if (likeStatus == true || likeStatus == "true") {
      console.log(
        "Se quita el estatus de like y se quita de la base de datos el like"
      );
      localStorage.removeItem("likeStatus");
      setLikeStatus(localStorage.getItem("likeStatus","false"));
      console.log(likeStatus);

      const response = await axios.get(
        `https://twiterbackend.herokuapp.com/cuentasGet/${e}`
      );
      console.log(response.data.followers);
      setCuenta(response.data.id)
      delLike(response.data.followers)
    }
}

const actualizarLikes = async (nums) => {
      const valor = JSON.parse(localStorage.getItem("id"))
      console.log("id del gat",valor)
    if (nums.includes(favi.username) == false) {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] == favi.username) {
          nums.splice(i, 1);
        }
      }
      console.log(followers, nums, "Actualizar Like");
      const datis = nums;
      datis.push(favi.username);
      const datos = datis;
      console.log(datos);
      const response = await axios.put(
        `https://twiterbackend.herokuapp.com/setFollowers/${valor}`,
        datos
      );
      console.log(response.data)
      window.location.reload()
    }
    else {
      for (let i = 0; i < nums.length; i++) {
          if (nums[i] == favi.username) {
            nums.splice(i, 1);
          }
        }
        console.log(followers, nums, "Actualizar Likes2");
      const index = nums.indexOf(favi.username);
        nums.splice(index, 1);
        const datis = nums;
        const datos = datis;
        console.log(datos);
        const response = await axios.put(
          `https://twiterbackend.herokuapp.com/setFollowers/${valor}`,
          datos
        );
        console.log(response.data)
        window.location.reload()
      }
    }

    const delLike = async (nums) => {
      const valor = JSON.parse(localStorage.getItem("id"))
      console.log("id del gat",valor)
        console.log(followers, nums, "DelLike");
        const index = nums.indexOf(favi.username);
          nums.splice(index, 1);
          const datis = nums;
          const datos = datis;
          console.log(datos);
          const response = await axios.put(
            `https://twiterbackend.herokuapp.com/setFollowers/${valor}`,
            datos
          );
          console.log(response.data)
          window.location.reload()
    }


    return (
        <div className="post" ref={ref}>
            <div className="post__avatar">
                <Avatar src={avatar} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {displayName}{" "}
                            <span className="post__headerSpecial">
                                {verified && <VerifiedUserIcon className="post__badge" />} @
                                {username}
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                    <span className="like_beliked">
                <PublishIcon
                  fontSize="small"
                  className="icon_like"
                  onClick={(e) => changeLike(id)}
                />
                <div className = "likes_count">{followers.length}</div>
                </span>
                </div>
            </div>
        </div>
    )
}
)

export default PostCuentas