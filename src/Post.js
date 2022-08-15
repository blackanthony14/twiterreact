import React, { forwardRef, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Post = forwardRef(
  (
    { displayName, username, verified, text, image, avatar, id, coments,likes },
    ref
  ) => {
    const navigate = useNavigate();
    const [likeStatus, setLikeStatus] = useState(
      localStorage.setItem("likeStatus", "false")
    );
    const [comentarioId, setComentarioId] = useState(
      JSON.parse(localStorage.getItem("comentario"))
    );
    const [favoritos, setFavoritos] = useState(
      JSON.parse(localStorage.getItem("favoritos"))
    );
    const favi = favoritos[0];
    const coment = parseInt(localStorage.getItem("comentario"));
    const makeComent = async (e) => {
      // e.preventDefault();
      console.log(e);
      localStorage.removeItem("comentario");
      if (!localStorage.getItem("comentario")) {
        localStorage.removeItem("comentario");
        // case, no existe aun
        let data = JSON.stringify(e);
        localStorage.setItem("comentario", data);
        setComentarioId(e);
        console.log("Seteamos comentario en LocalStorage 1");
        navigate("/comentCreate");
      } else {
        // patron inmutable de actualizar un array
        let data = JSON.parse(localStorage.getItem("comentario"));
        let newData = JSON.stringify([...data, e]);
        localStorage.setItem("comentario", newData);
        let tempFavoritos = [...comentarioId, e];
        setComentarioId(tempFavoritos);
        console.log("Seteamos comentario en localStorage 2");
        console.log(comentarioId);
        navigate("/comentCreate");
      }
    };
    const changeLike = async (e) => {
      console.log("entra al click");
      if (likeStatus == null || likeStatus == false || likeStatus == "false") {
        console.log("Entra al if");
        localStorage.setItem("likeStatus",JSON.stringify( true));
        setLikeStatus(JSON.parse(localStorage.getItem("likeStatus")));
        console.log(likeStatus);
        const response = await axios.get(
          `https://twiterbackend.herokuapp.com/tweetComents/${e}`
        );
        console.log(response.data.likes);

        localStorage.removeItem("comentario");
        if (!localStorage.getItem("comentario")) {
          localStorage.removeItem("comentario");
          // case, no existe aun
          let data = JSON.stringify(e);
          localStorage.setItem("comentario", data);
          setComentarioId(e);
          console.log("Seteamos comentario en LocalStorage 1");
          actualizarLikes(response.data.likes);
        } else {
          // patron inmutable de actualizar un array
          let data = JSON.parse(localStorage.getItem("comentario"));
          let newData = JSON.stringify([...data, e]);
          localStorage.setItem("comentario", newData);
          let tempFavoritos = [...comentarioId, e];
          setComentarioId(tempFavoritos);
          console.log("Seteamos comentario en localStorage 2");
          console.log(comentarioId);
          actualizarLikes(response.data.likes);
        }

        // putLikes(response.data.likes);
      } else if (likeStatus == true || likeStatus == "true") {
        console.log(
          "Se quita el estatus de like y se quita de la base de datos el like"
        );
        localStorage.removeItem("likeStatus");
        setLikeStatus(localStorage.getItem("likeStatus","false"));
        console.log(likeStatus);

        const response = await axios.get(
          `https://twiterbackend.herokuapp.com/tweetComents/${e}`
        );
        console.log(response.data.likes);

        localStorage.removeItem("comentario");
        if (!localStorage.getItem("comentario")) {
          localStorage.removeItem("comentario");
          // case, no existe aun
          let data = JSON.stringify(e);
          localStorage.setItem("comentario", data);
          setComentarioId(e);
          console.log("Seteamos comentario en LocalStorage 1");
          delLike(response.data.likes);
        } else {
          // patron inmutable de actualizar un array
          let data = JSON.parse(localStorage.getItem("comentario"));
          let newData = JSON.stringify([...data, e]);
          localStorage.setItem("comentario", newData);
          let tempFavoritos = [...comentarioId, e];
          setComentarioId(tempFavoritos);
          console.log("Seteamos comentario en localStorage 2");
          console.log(comentarioId);
          delLike(response.data.likes);
        }
      }
      // if (!localStorage.getItem("likeStatus")) {
      //   localStorage.removeItem("likeStatus");
      //   // case, no existe aun
      //   let data = JSON.stringify(false);
      //   localStorage.setItem("likeStatus", data);
      //   setLikeStatus(false);
      //   console.log("Seteamos estado de like en LocalStorage 1");
      // } else {
      //   // patron inmutable de actualizar un array
      //   let data = JSON.parse(localStorage.getItem("likeStatus"));
      //   let newData = JSON.stringify([...data,false]);
      //   localStorage.setItem("likeStatus", newData);
      //   let tempFavoritos = [...likeStatus, false];
      //   setLikeStatus(tempFavoritos);
      //   console.log("Seteamos comentario en localStorage 2");
      //   console.log(likeStatus)
      // }
    };
    const actualizarLikes = async (nums) => {
      
      if (likes.includes(favi.id) == false) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i] == favi.id) {
            likes.splice(i, 1);
          }
        }
        console.log(likes, coment, "Actualizar Like");
        const datis = likes;
        datis.push(favi.id);
        const datos = datis;
        console.log(datos);
        const response = await axios.put(
          `https://twiterbackend.herokuapp.com/tweetEditLikes/${coment}`,
          datos
        );
        console.log(response.data)
        window.location.reload()
      }
      else {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i] == favi.id) {
              likes.splice(i, 1);
            }
          }
          console.log(likes, coment, "Actualizar Likes2");
        const index = likes.indexOf(favi.id);
          likes.splice(index, 1);
          const datis = likes;
          const datos = datis;
          console.log(datos);
          const response = await axios.put(
            `https://twiterbackend.herokuapp.com/tweetEditLikes/${coment}`,
            datos
          );
          console.log(response.data)
          window.location.reload()
        }
        
        // const datis = nums;
        // datis.push();
        // const datos = datis;
        // const response = await axios.put(
        //   `http://localhost:5000/tweetEdit/${coment}`,
        //   datos
        // );
      };
      const delLike = async (nums) => {
        console.log(likes, coment, "DelLike");
        const index = likes.indexOf(coment); 
          likes.splice(index, 1);
          const datis = likes;
          const datos = datis;
          console.log(datos);
          const response = await axios.put(
            `https://twiterbackend.herokuapp.com/tweetEditLikes/${coment}`,
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
            </div>
            <img className="imageSize" src={image} alt="" />
            <div className="post__footer">
              <span className="post_coment">
                <ChatBubbleOutlineIcon
                  fontSize="small"
                  className="icon_coment"
                  onClick={(e) => makeComent(id)}
                />
                <div className="coments_count">{coments.length}</div>
              </span>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <span className="like_beliked">
                <FavoriteBorderIcon
                  fontSize="small"
                  className="icon_like"
                  onClick={(e) => changeLike(id)}
                />
                <div className="likes_count">{likes.length}</div>
              </span>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      );
    }
);
export default Post;
