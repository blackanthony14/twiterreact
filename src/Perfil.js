import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MiPerfil from "./MiPerfil";

function Perfil() {
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos"))
  );
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState();
  const navigate = useNavigate();
  const favi = favoritos[0];
  let numero = 1
  const array = []
  console.log(favi)
    useEffect(()=>{
      const querySearch = async () => {
        if(numero == 1){
          for (var i=0; i<favi.tweets.length; i++) {
            let number = favi.tweets[i]
             const res = await axios(`https://twiterbackend.herokuapp.com/tweetsId/${number}`);
            array.push(res.data)
            numero = numero +1
            }
            console.log("Array",array)
            localStorage.setItem('datos', JSON.stringify(array))
            console.log("localStorage",JSON.parse(localStorage.getItem("datos")));
            setPosts(array)
        }
      };
      querySearch()
    },[])
    

    // if(numero == 1){
    //   querySearch()
    //   numero = 0
    // }

  return (
    <div className="feed">
    <div className="feed__header">
    <h2 onClick={()=> navigate('/principal')}>Principal</h2>
    <h2 onClick={()=> navigate('/getcuenta')}>Search</h2>
    </div>

    <MiPerfil />
    <FlipMove>
      {posts.map((post) => (
        <Post
          key={post.id}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
          id={post.id}
          coments={post.coments}
          likes={post.likes}
        />
      ))}
    </FlipMove>
  </div>
  )
}

export default Perfil