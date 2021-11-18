import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts, fetchCurrentUser } from "./PostManager";
import "./posts.css";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({})

  const fetchAllPosts = () => {
    getPosts().then(data => setPosts(data))
    fetchCurrentUser().then(data => setCurrentUser(data))
  };

  useEffect(
    () => {
        fetchAllPosts()
    },
    []
)

  return (
    <>
    {currentUser?.user?.is_staff ?
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
            <td>{`${post?.author?.user?.first_name} ${post?.author?.user?.last_name}`}</td>
            <td>{post?.publication_date}</td>
            <td>{post?.category.label}</td>
            <td>post tags here</td>
          </tr>
        );
      })}
    </table>
    : 
    <table className="post_list">
      <tr className="headings">
        <th>Title</th>
        <th>Author</th>
        <th>Date</th>
        <th>Category</th>
        <th>Tags</th>
      </tr>
      {posts.filter(post => post.approved === true).map((post) => {
        return (
          <tr>
            <td>
              <Link to={`/postDetail/${post.id}`}>{post?.title}</Link>
            </td>
            <td>{`${post?.author?.user?.first_name} ${post?.author?.user?.last_name}`}</td>
            <td>{post?.publication_date}</td>
            <td>{post?.category.label}</td>
            <td>post tags here</td>
          </tr>
        );
      })}
    </table>
    
    }
      
    </>
  );
};
