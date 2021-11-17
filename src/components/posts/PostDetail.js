import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getPostById, getPostTags } from "./PostManager";
import { CommentForm } from "../comment/CommentForm";
import Swal from "sweetalert2";
import "./posts.css";

export const PostDetail = () => {
  const [ post, setPost ] = useState({});
  const [ showComments, setShowComments ] = useState(false)
  const [ showCommentForm, setShowCommentForm ] = useState(false)
  //const [tags, setTags] = useState([])
  const { postId } = useParams();
  const history = useHistory()


  useEffect(() => {
    getPostById(postId).then((data) => setPost(data));
  }, []);

  useEffect(() => {
    console.log('post', post)
    console.log('showcomments', showComments)
    console.log('commentFoirm', showCommentForm)

  }, [post, showComments]);


const handleShowComments = () => {
  if(showComments) {
    setShowComments(false)
  }else{
    setShowComments(true)
    }
  }
const handleShowCommentForm = () => {
  if(showCommentForm) {
    setShowCommentForm(false)
  }else{
    setShowCommentForm(true)
    }
  }

const commentFormJSX =
  <div>
    <CommentForm commentPostId={postId}/>
  </div>

  return (
    <>
    {showCommentForm ? commentFormJSX
    :

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
              handleShowCommentForm()
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
                    post?.comments?.map(comment => <p> {comment?.content}</p>)
                    : ""
                  }
                  </div>
          </div>
      </div>
    }
    </>
  )
}
