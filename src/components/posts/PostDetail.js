import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./posts.css";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const { postId } = useParams();
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));

  useEffect(() => {
    fetchPostById(postId).then((data) => setPost(data));
    fetchPostTags(postId).then((data) => setTags(data));
  }, []);

  const fetchPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`).then((res) => res.json());
  };

  const fetchPostTags = (postId) => {
    return fetch(`http://localhost:8000/postTags/${postId}`).then((res) =>
      res.json()
    );
  };

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
              <div className="header_category">{post?.category?.label}</div>
            </div>
          ) : (
            <div className="detail_header">
              <div className="header_title">
                <h1>{post.title}</h1>
              </div>
              <div className="header_category">{post?.category?.label}</div>
            </div>
          )}
          <div className="detail_img">{post.image_url}</div>
          <div className="detail_acr">
            <div className="detail_author">
              {`By ${post?.user?.first_name} ${post?.user?.last_name}`}
            </div>
            <div className="detail_comments">
              <button>View Comments</button>
            </div>
            <div className="detail_reactions">post reactions here</div>
          </div>
          <div className="detail_content">{post.content}</div>
        </div>
        <div className="detail_tags">
          {/* {tags.map((tag) => {
            return <p>{tag?.tag.label}</p>;
          })} */}
        </div>
      </div>
    </>
  );
};
