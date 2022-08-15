import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { common } from "@mui/material/colors";

// import db from "./firebase";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [datos, setDatos] = useState(null);

  const favi = favoritos[0];
  console.log(favi.username)
  const navigate = useNavigate();

  const createTweet = async () => {
    console.log(tweetMessage, tweetImage);
    // const datos = {
    //   displayName: favi.displayName,
    //   username: favi.username,
    //   text: data.mensaje,
    //   image: data.image,
    //   avatar: favi.avatar,
    //   verified: favi.verified,
    // };
    // console.log(datos)
    
  };

  const sendTweet = async(e) => {
    e.preventDefault();
    if (
      (tweetMessage != null && tweetMessage.length != 0 && tweetMessage != '') ||
      (tweetImage != null && tweetImage.length != 0 && tweetImage != '')
    ) {
      const data = {
        displayName: favi.displayName,
        username: favi.username,
        verified: favi.verified,
        text: tweetMessage,
        image: tweetImage,
        avatar: favi.avatar,
      };

      const res = await axios
      .post("http://localhost:5000/createTweet", data)
      .then((res) => {
        console.log(res.data);
        putTweet(res.data.id)
      })
      .catch((err) => {
        console.error(err);
      });

    } else {
      console.log("Algo esta en blanco");
    }

    setTweetMessage("");
    setTweetImage("");
  };
  const putTweet = async (num) =>{
    favi.tweets.push(num)
      const datos = favi.tweets
      const response = await axios
      .put(`https://twiterbackend.herokuapp.com/cuentaEdit/${favi.id}`,datos)
      .then((response) => {
        console.log(response.data)
        setDatos(response.data)
        localStorage.clear();
      if (!localStorage.getItem("favoritos")) {
        localStorage.clear();
        // case, no existe aun
        let data = JSON.stringify([response.data]);
        localStorage.setItem("favoritos", data);
        setFavoritos([response.data]);
        console.log("Primer localstorage");
        window.location.reload();
        navigate("/principal");

      } else {
        // patron inmutable de actualizar un array
        let data = JSON.parse(localStorage.getItem("favoritos"));
        let newData = JSON.stringify([...data, response.datas]);
        localStorage.setItem("favoritos", newData);
        let tempFavoritos = [...favoritos, response.data];
        setFavoritos(tempFavoritos);
        console.log("Segundo localstorage");
        window.location.reload();
        navigate("/principal");
      }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={favi.avatar} />
          <input
            id="mensaje"
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="Ey!! Que esta pasando?"
            type="text"
          />
        </div>
        <input
          id="image"
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Esto seria opcional...: Ingresar url de una foto que desea postear"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweetear
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
