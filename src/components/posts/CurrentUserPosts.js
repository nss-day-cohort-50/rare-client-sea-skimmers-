import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./posts.css";

export const CurrentUserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const currentUser = parseInt(localStorage.getItem("rare_user_id"));
  const history = useHistory()

  useEffect(() => {
    fetchCurrentUSerPosts().then((data) => setUserPosts(data));
  }, []);

  const fetchCurrentUSerPosts = () => {
    return fetch(`http://localhost:8000/posts?user_id=${currentUser}`).then(
      (response) => response.json()
    );
  };
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
                <div className="post_image">{post?.image_url}</div>
              </div>
              <div className="bottom">
                <div className="post_author">
                  {`Author: ${post?.user?.first_name} ${post?.user?.last_name}`}
                </div>
                <div className="post_reaction">
                  {
                    (post.id = currentUser ? (
                      <div>
                        Reactions go here. Edit and delete buttons go here.
                      </div>
                    ) : (
                      <div>Reactions go here.</div>
                    ))
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
