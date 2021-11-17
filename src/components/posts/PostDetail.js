import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById, getPostTags } from "./PostManager";
import Swal from "sweetalert2";
import "./posts.css";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const { postId } = useParams();
  const currentUser = parseInt(localStorage.getItem("rare_user_token"));

  useEffect(() => {
    getPostById(postId).then((data) => setPost(data));
    getPostTags(postId).then((data) => setTags(data));
  }, []);

  useEffect(() => {
    console.log('post', post)
    console.log('tags', tags)
  }, [post, tags]);


  return (
    <>
      <div className="detail_main">
        <div className="detail_container">
          {post.user_id === currentUser ? (
            <div className="detail_header">
              <div className="header_user">
                Delete <Link>Edit</Link>
              </div>
              <div className="header_title">
                <h1>{post.title}</h1>
              </div>
            </div>
          ) : (
            <div className="detail_header">
              <div className="header_title">
                <h1>{post.title}</h1>
              </div>
              <div className="header_category">{post?.category?.label}</div>
            </div>
          )}
          <div className="detail_img">
          <img src={post.image_url} width='500' height='300'/>
          </div>
          <div className="detail_content">{post.content}</div>
          <div className="detail_acr">
            <div className="detail_author">
              {`By ${post?.author?.user?.first_name} ${post?.author?.user?.last_name}`}
            </div>
          </div>
        </div>
            <div className="detail_comments">
              <button>View Comments</button>
            </div>
            <div className="detail_reactions">post reactions here</div>
        <div className="detail_tags">
          {/* {tags.map((tag) => {
            return <p>{tag?.tag.label}</p>;
          })} */}
        </div>
      </div>
    </>
  );
};
