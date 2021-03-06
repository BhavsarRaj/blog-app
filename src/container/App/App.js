import React from "react";
import Header from "../../component/Header/header.js";
import LoginReg from "../LoginReg/LoginReg.js";
import { Route, Switch } from "react-router-dom";
import Posts from "../Posts/Posts.js";
import NewPost from "../NewPost/NewPost.js";
import MyPost from "../../component/MyPost/myPost.js";
import Profile from "../../component/Profile/profile.js";
import PostDetail from "../../component/PostDetail/PostDetail.js";
import classes from "./app.module.css";

const App = (props) => {
  localStorage.clear();

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Posts} />
        <Route path="/login" exact component={LoginReg} />
        <Route path="/my-post" exact component={MyPost} />
        <Route path="/new-post" exact component={NewPost} />
        <Route path="/profile/:email" exact component={Profile} />
        <Route path="/:id" exact component={PostDetail} />
      </Switch>
    </div>
  );
};

export default App;
