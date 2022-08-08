import React, { useState, useEffect } from "react";
import GerPerfilSidebar from './GerPerfilSidebar'
import Perfil from './Perfil'
import "./Principal.css";
import Widgets from './Widgets';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function GetPerfil() {

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [posts, setPosts] = useState((localStorage.getItem("posts")));
  const [state, setState] = useState();
  const navigate = useNavigate();
  const favi = favoritos[0];
  let numero = 1
  const array = []
  console.log(favi)

    const querySearch = async () => {
      if(numero == 1){
        for (var i=0; i<favi.tweets.length; i++) {
          let number = favi.tweets[i]
           const res = await axios.get(`http://localhost:5000/tweetsId/${number}`);
          array.push(res.data)
          numero = numero +1
          }
          console.log("Array",array)
          localStorage.setItem('datos', JSON.stringify(array))
          console.log("localStorage",JSON.parse(localStorage.getItem("datos")));
      }
    };

    if(numero == 1){
      querySearch()
      numero = 0
    }



  return (
    <div className="app">
    <GerPerfilSidebar/>
    <Perfil/>
    <Widgets/>
    </div>
  )
}

export default GetPerfil