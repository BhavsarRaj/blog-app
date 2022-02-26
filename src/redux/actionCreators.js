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
  return {
    type: actionTypes.LogIn,
    user: user
  };
};

const onRegister = (user) => {
  return {
    type: actionTypes.Register,
    user: user
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

export { onUpVote, onDownVote, onLogIn, onRegister, onLogOut, onNewPost };
