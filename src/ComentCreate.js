import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ComentCreate() {
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [comentarioId, setComentarioId] = useState(
    JSON.parse(localStorage.getItem("comentario"))
  );
  const [datos, setDatos] = useState(JSON.parse(localStorage.getItem("datos")));
  const [lastComent, setLastComent] = useState(
    JSON.parse(localStorage.getItem("ultimoComentario"))
  );
  const favi = favoritos[0];
  const coment = parseInt(localStorage.getItem("comentario"));
  const datazo = datos
  console.log(
    favi.username,
    "comentarioId",
    coment,
    "El datazo es",
    datazo,
    "ultimo comentario",
    localStorage.getItem("ultimoComentario")
  );
  const [tweetMessage, setTweetMessage] = useState("");
  const navigate = useNavigate();

  const putComment = async () => {
    const response = await axios.get(
      `http://localhost:5000/tweetComents/${coment}`
    );
    console.log(response.data.coments);
    localStorage.removeItem("datos");
    if (!localStorage.getItem("datos")) {
      localStorage.removeItem("datos");
      // case, no existe aun
      let data = JSON.stringify(response.data.coments);
      localStorage.setItem("datos", data);
      setDatos(response.data);
      console.log("Seteamos datos en LocalStorage 1");
      console.log(response.data.coments);
      pushComent(response.data.coments);
      navigate("/principal");
    } else {
      // patron inmutable de actualizar un array
      let data = JSON.parse(localStorage.getItem("datos"));
      let newData = JSON.stringify([...data, response.data.coments]);
      localStorage.setItem("datos", newData);
      let tempFavoritos = [...datos, response.data.coments];
      setDatos(tempFavoritos);
      console.log("Seteamos datos en localStorage 2");
      console.log(response.data.coments);
      pushComent(response.data.coments);
      navigate("/principal");
    }
  };
  const pushComent = async (data) => {
    const datis = data;
    datis.push(tweetMessage);
    const datos = datis;
    const response = await axios.put(
      `https://twiterbackend.herokuapp.com/tweetEdit/${coment}`,
      datos
    );
    console.log(response.data);
    setDatos(response.data);
    localStorage.removeItem("ultimoComentario");
    if (!localStorage.getItem("ultimoComentario")) {
      localStorage.removeItem("ultimoComentario");
      // case, no existe aun
      let data = JSON.stringify(response.data);
      localStorage.setItem("ultimoComentario", data);
      setLastComent(response.data);
      console.log("Seteamos ultimoComentario en LocalStorage 1");
    } else {
      // patron inmutable de actualizar un array
      let data = JSON.parse(localStorage.getItem("ultimoComentario"));
      let newData = JSON.stringify([...data, response.data]);
      localStorage.setItem("ultimoComentario", newData);
      let tempFavoritos = [...datos, response.data];
      setLastComent(tempFavoritos);
      console.log("Seteamos ultimoComentario en localStorage 2");
      console.log(setLastComent);
    }
  };

  return (
    <div className="tweetBox">
      <div>
        <div className="tweetBox__input">
          <Avatar src={favi.avatar} />
          <input
            id="mensaje"
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="Ingresa tu comentario"
            type="text"
          />
        </div>
        <Button onClick={putComment} type="" className="tweetBox__tweetButton">
          Comentar
        </Button>
      </div>
    </div>
  );
}

export default ComentCreate;
