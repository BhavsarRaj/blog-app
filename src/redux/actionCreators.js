import * as actionTypes from "./actionTypes.js";

const onUpVote = (id) => {
  return {
    type: actionTypes.UpVote,
    id: id
  };
};

const onDownVote = (id) => {
  return {
    type: actionTypes.DownVote,
    id: id
  };
};

const onLogIn = (user) => {
  return async (dispatch, getState) => {
    const url = "https://jsonplaceholder.typicode.com/posts/";
    const email = "5";
    const response = await fetch(url + email, { method: "GET" });
    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson);
      dispatch({ type: actionTypes.LogIn_Success, user: user });
    } else {
      dispatch({ type: actionTypes.LogIn_Failed });
    }
  };
};

const onLogInStatusReset = () => {
  return {
    type: actionTypes.LogIn_Status_Reset
  };
};

const onRegister = (user) => {
  return async (dispatch, getState) => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user)
    });
    if (response.ok) {
      dispatch({ type: actionTypes.Register_Success, user: user });
    } else {
      dispatch({ type: actionTypes.Register_Failed });
    }
  };
};

const onRegisterStatusReset = () => {
  return {
    type: actionTypes.Register_Status_Reset
  };
};

const onLogOut = () => {
  return {
    type: actionTypes.LogOut
  };
};

const onNewPost = (value) => {
  return {
    type: actionTypes.NewPost,
    value: value
  };
};

const onPasswordChange = (password) => {
  return { type: actionTypes.ChangePassword, newPassword: password };
};

const onAddComment = (value, id) => {
  return {
    type: actionTypes.AddComment,
    value: value,
    id: id
  };
};

export {
  onUpVote,
  onDownVote,
  onLogIn,
  onRegister,
  onLogOut,
  onNewPost,
  onPasswordChange,
  onAddComment,
  onRegisterStatusReset,
  onLogInStatusReset
};
