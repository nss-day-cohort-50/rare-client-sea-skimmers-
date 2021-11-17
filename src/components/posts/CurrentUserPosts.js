import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./posts.css";

export const CurrentUserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const history = useHistory()


  const fetchCurrentUserPosts = () => {
    return fetch(`http://localhost:8000/posts/currentuser`, {
      headers:{
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
      }
    })
      .then(response => response.json())
      .then((data) => {
        setUserPosts(data)
      })
  };

  useEffect(
    () => {
        fetchCurrentUserPosts()
    },
    []
  )

  return (
    <>
      <div>
        <button onClick={() => { history.push("/NewPost") }}>New Post</button>
      </div>
      <div className="post_feed">
        {userPosts?.map((post) => {
          return (
            <div className="post_container">
              <div className="top">
                <div className="post_title">{post?.title}</div>
                <div className="post_date">{post?.publication_date}</div>
              </div>
              <div className="center">
                <div className="detail_img">
                  <img alt="Post picture" src={post?.image_url} />
                </div>
              </div>
              <div className="bottom">
                <div className="post_author">
                  {`Author: ${post?.author?.user?.first_name} ${post?.author?.user?.last_name}`}
                </div>
                <div className="post_reaction">
                  <div>
                    Reactions go here. Edit and delete buttons go here.
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
