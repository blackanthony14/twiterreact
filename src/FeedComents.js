import React, { useState, useEffect } from "react";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";
import ComentCreate from "./ComentCreate";
import ShowComents from "./ShowComents";
import { useNavigate } from "react-router-dom";

function FeedComents() {
  const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [comentarioId, setComentarioId] = useState(
        JSON.parse(localStorage.getItem("comentario")))
    const coment = parseInt(localStorage.getItem("comentario"));
    console.log(coment);

  useEffect(() => {
    const querySearch = async () => {
        const res = await axios(`https://twiterbackend.herokuapp.com/tweetComents/${coment}`);
        console.log(res.data.coments);
        setPosts(res.data.coments);
    };
    querySearch();
  }, []);
  console.log(posts)
  return (

    <div className="feed">
      <div className="feed__header">
        <h2 >Principal</h2>
      </div>

      <ComentCreate />

      <FlipMove>
        {posts.map((post) =>(
            <ShowComents
            coment={post}
          />
        ))}
      </FlipMove>
    </div>
  )
}

export default FeedComents