import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const querySearch = async () => {
        const res = await axios("https://twiterbackend.herokuapp.com/tweets");
        console.log(res.data);
        setPosts(res.data);
        const response = await axios.get('https://twiterbackend.herokuapp.com/cuentas');
      localStorage.setItem("datas1", JSON.stringify(response.data));
      console.log("localStorage de cuentas", JSON.parse(localStorage.getItem("datas1")));
    };
    querySearch();
  }, []);

  return (
    <div className="feed">
      <div className="feed__header" >
        <h2 onClick={()=> navigate('/perfil')}>Perfil</h2>
      </div>

      <TweetBox />

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
  );
}

export default Feed;