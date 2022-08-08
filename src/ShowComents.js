import React, {forwardRef} from 'react'
import "./Post.css";
const ShowComents = forwardRef(
    ({ coment}, ref) => {
  return (
    <div className="post" ref={ref}>
    <div className="post__body2">
        <div className="post__headerDescription2">
            <div></div>
            
          <p>{coment}</p>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
})

export default ShowComents