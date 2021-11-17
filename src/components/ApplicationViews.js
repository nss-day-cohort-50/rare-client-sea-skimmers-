import React from "react";
import { Route } from "react-router-dom";
import { CommentForm } from "./comment/CommentForm";
import { PostList } from "./posts/PostList";
import { Category } from "./categories/Category";
import { CurrentUserPosts } from "./posts/CurrentUserPosts";
import { Tags } from "./tags/Tags";
import { PostDetail } from "./posts/PostDetail";
import { EditTag } from "./tags/EditTag";
import { CreatePost } from "./posts/CreatePost";
import { EditCategory } from "./categories/EditCategory";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <Route exact path="/comments/create">
          <CommentForm />
        </Route>
        <Route exact path="/myPosts">
          <CurrentUserPosts />
        </Route>
        <Route exact path="/postList">
          <PostList />
        </Route>
        <Route exact path="/postDetail/:postId(\d+)">
          <PostDetail />
        </Route>
        <Route exact path="/NewPost">
          <CreatePost />
        </Route>
        <Route exact path="/categories">
          <Category />
        </Route>
        <Route exact path="/categories/edit/:categoryId(\d+)">
          <EditCategory />
          <Category />
        </Route>
        <Route exact path="/tags">
          <Tags />
        </Route>
        <Route exact path="/tags/edit/:tagId(\d+)">
          <EditTag />
          <Tags />
        </Route>
      </main>
    </>
  );
};
