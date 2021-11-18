import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getPostById, fetchCurrentUser, approvePost } from "./PostManager";
import Swal from "sweetalert2";
import "./posts.css";
import { deleteComment } from "../comment/CommentManager";

export const PostDetail = () => {
  const [ post, setPost ] = useState({});
  const [ showComments, setShowComments ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState({})
  const { postId } = useParams();
  const history = useHistory()

const renderPost = () => {
  getPostById(postId).then((data) => setPost(data))
}

const getCurrentUser = () => {
  fetchCurrentUser().then(data => setCurrentUser(data))

}

  useEffect(() => {
    renderPost()
    getCurrentUser()
  }, []);

  useEffect(() => {
    console.log('post', post)
    console.log('postapprove', post.approved)
    console.log('curUser', currentUser)

  }, [post, showComments]);


const handleShowComments = () => {
  if(showComments) {
    setShowComments(false)
  }else{
    setShowComments(true)
    }
  }


const handleDelete = (commentId) => {
  deleteComment(commentId).then(renderPost)
}

  return (
    <>
    {currentUser?.user?.is_staff ?
      <button onClick={() => approvePost(post.id)}
      >Approve Post</button>
      : ""
    }
    {post.approved || currentUser?.user?.is_staff ?
    
      <div className='main'>
      <div className="detail_container">
          <div className="detail_header">
            <div className="header_title">
              <h1>{post.title}</h1>
            </div>
          </div>
        <div className="detail_img">
        <img src={post.image_url} width='500' height='300'/>
        </div>
        <div className="detail_content">{post.content}</div>
          <div className="detail_author">
            By {post?.author?.user?.first_name} {post?.author?.user?.last_name}
          </div>
      </div>
      <div className="detail_comments">
        <button onClick={() => {
          history.push(`/comments/create/${postId}`)
        }}>Add Comment</button>
        {showComments ?
          <button 
          onClick={
            () => {
            handleShowComments()
          }}>Hide Comments</button>
          :
          <button 
            onClick={
              () => {
              handleShowComments()
            }}>View Comments</button>
        }
            
              <div>
              {showComments ?
                post?.comments?.map(comment => 
                <> <p> {comment?.content}</p>
                <Link
                to={`/comments/edit/${comment.id}/${postId}`}>edit</Link> <br></br>
                <Link to={`/postDetail/${postId}`}
                onClick={()=> {handleDelete(comment.id)
                }}>delete comment</Link> 
                </>
                )
                : ""
              }
              </div>
      </div>
  </div>

    : ""
    }
    </>


  )
}
