import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MiPerfil from "./MiPerfil";
import PostCuentas from "./PostCuentas";

function Cuentas() {
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [datos, setDatos] = useState([]);
  const favi = favoritos[0];

  const navigate = useNavigate();
  let numero = 1;
  useEffect(() => {
    const querySearch = async () => {
      // if (numero == 1) {
      const res = await axios.get('https://twiterbackend.herokuapp.com/cuentas');
      localStorage.setItem("datas1", JSON.stringify(res.data));
      console.log("localStorage de cuentas", JSON.parse(localStorage.getItem("datas1")));
       const dat = JSON.parse(localStorage.getItem("datas1"));
      removeData(res.data);

      // }
    };
    const removeData = (array) => {
        const losDatos = JSON.parse(localStorage.getItem("datas1"));
        console.log(losDatos)
      if (losDatos.length> 0) {
        for (var i = 0; i < losDatos.length; i++) {
          console.log("enter for", losDatos[i].id, favi.id);
          if (losDatos[i].id == favi.id) {
            losDatos.splice(i, 1);
            let dataNew = losDatos;
            setDatos(dataNew);
            localStorage.setItem("datas1", JSON.stringify(losDatos));
            console.log(JSON.parse(localStorage.getItem("datas1")));
            console.log("enter if", datos);
          }
        }
      } else {
        querySearch();
      }
    };

    querySearch();
  }, []);

  //   if (numero == 1) {
  //     querySearch();
  //     numero = 0;
  //   }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2 onClick={() => navigate("/principal")}>Pagina Principal</h2>
        <h2 onClick={() => navigate("/getcuenta")}>Cuentas</h2>
      </div>

      <MiPerfil />
      <FlipMove>
        {JSON.parse(localStorage.getItem("datas1")).map((post) => (
          <PostCuentas
            data={post}
            key={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.correo}
            avatar={post.avatar}
            id={post.id}
            followers = {post.followers}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Cuentas;
