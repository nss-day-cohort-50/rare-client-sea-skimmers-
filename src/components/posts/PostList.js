import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./posts.css";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = parseInt(localStorage.getItem("rare_user_token"));

  const fetchAllPosts = () => {
    return fetch(`http://localhost:8000/posts`, {
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    })
      .then(response => response.json())
      .then((data) => {
        setPosts(data)
      })
  };

  useEffect(
    () => {
        fetchAllPosts()
    },
    []
)

  return (
    <>
      <table className="post_list">
        <tr className="headings">
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Category</th>
          <th>Tags</th>
        </tr>
        {posts.map((post) => {
          return (
            <tr>
              <td>
                <Link to={`/postDetail/${post.id}`}>{post?.title}</Link>
              </td>
              <td>{`${post?.user.first_name} ${post?.user.last_name}`}</td>
              <td>{post?.publication_date}</td>
              <td>{post?.category.label}</td>
              <td>post tags here</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
