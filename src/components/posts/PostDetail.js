import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getPostById } from "./PostManager";
import Swal from "sweetalert2";
import "./posts.css";
import { deleteComment } from "../comment/CommentManager";

export const PostDetail = () => {
  const [ post, setPost ] = useState({});
  const [ showComments, setShowComments ] = useState(false)
  const [ showApprovedPosts, setShowApprovedPosts ] = useState()
  const { postId } = useParams();
  const history = useHistory()

const renderPost = () => {
  getPostById(postId).then((data) => setPost(data));
}

  useEffect(() => {
    renderPost()
  }, []);

  useEffect(() => {
    console.log('post', post)
    console.log('postapprove', post.approved)
    handleShowApprovedPosts()

  }, [post, showComments]);


const handleShowComments = () => {
  if(showComments) {
    setShowComments(false)
  }else{
    setShowComments(true)
    }
  }

const handleShowApprovedPosts = () => {
  setShowApprovedPosts(true)
  }

const handleDelete = (commentId) => {
  deleteComment(commentId).then(renderPost)
}

  return (
    <>
    {post.approved ?
    
      <div className='main'>
      <div className="detail_container">
          <div className="detail_header">
            <div className="header_user">
              Delete <Link>Edit</Link>
            </div>
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
