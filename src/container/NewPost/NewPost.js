import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onNewPost } from "../../redux/actionCreators";
import classes from "./newPost.module.css";

const NewPost = (props) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [state, setState] = useState({ title: "", content: "" });

  const onChangeHandler = (event) => {
    if (event.target.rows === 2) {
      const value = event.target.value;
      setState((oldState) => {
        return {
          title: value,
          content: oldState.content
        };
      });
    } else {
      const value = event.target.value;
      setState((oldState) => {
        return {
          title: oldState.title,
          content: value
        };
      });
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("Please Login/Register first!");
      return;
    }
    const value = { title: state.title, content: state.content };
    dispatch(onNewPost(value));
    props.history.replace("/");
  };

  return (
    <form className={classes.container} onSubmit={onSubmitHandler}>
      <p className={classes.heading}>Title</p>
      <textarea
        rows="2"
        className={classes.content}
        value={state.title}
        onChange={onChangeHandler}
        required
      />
      <p className={classes.heading}>Content</p>
      <textarea
        rows="8"
        className={classes.content}
        value={state.content}
        onChange={onChangeHandler}
        required
      />
      <br />
      <input type="submit" value="Post" className={classes.button} />
    </form>
  );
};

export default NewPost;
