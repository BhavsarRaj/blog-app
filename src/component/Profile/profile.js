import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onPasswordChange } from "../../redux/actionCreators.js";
import bcryptjs from "bcryptjs";
import classes from "./profile.module.css";

const Profile = (props) => {
  const users = useSelector((state) => state.users);
  const logInUser = useSelector((state) => state.logInUserObject);
  const upVotedPostsId = useSelector((state) => state.upVotedPostsId);
  const downVotedPostsId = useSelector((state) => state.downVotedPostsId);
  const upVotedNumbers = upVotedPostsId.size;
  const downVotedNumbers = downVotedPostsId.size;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isChangeClicked: false,
    currentPassword: "",
    newPassword: "",
    newRePassword: ""
  });

  const onPasswordChangeHandler = (event) => {
    const value = event.target.value;
    const target = event.target;
    if (target.placeholder === "Current Password") {
      setState((oldState) => {
        return {
          ...oldState,
          currentPassword: value
        };
      });
    } else if (target.placeholder === "New Password") {
      setState((oldState) => {
        return {
          ...oldState,
          newPassword: value
        };
      });
    } else {
      setState((oldState) => {
        return {
          ...oldState,
          newRePassword: value
        };
      });
    }
  };

  const onPasswordChangeSubmitHandler = (event) => {
    event.preventDefault();
    const currentPassword = state.currentPassword;
    const newPassword = state.newPassword;
    const newRePassword = state.newRePassword;
    if (bcryptjs.compareSync(currentPassword, logInUser.password)) {
      if (newPassword === newRePassword) {
        const newPasswordHashed = bcryptjs.hashSync(newPassword);
        dispatch(onPasswordChange(newPasswordHashed));
        props.history.replace("/");
      } else {
        alert(
          "Invalid current Password or Please enter proper password in Re-enter password section !"
        );
      }
    } else {
      alert(
        "Invalid current Password or Please enter proper password in Re-enter password section !"
      );
    }
  };

  const onPasswordChangeClickHandler = () => {
    setState((oldState) => {
      return {
        ...oldState,
        isChangeClicked: true
      };
    });
  };

  const email = props.match.params.email;
  const user = users.filter((obj) => {
    return obj.email === email;
  });

  const form = (
    <form onSubmit={onPasswordChangeSubmitHandler}>
      <input
        type="password"
        placeholder="Current Password"
        value={state.currentPassword}
        onChange={onPasswordChangeHandler}
        className={classes.inputUpper}
        required
      />
      <br />
      <input
        type="password"
        placeholder="New Password"
        onChange={onPasswordChangeHandler}
        value={state.newPassword}
        className={classes.inputMiddle}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Re-enter New Password"
        onChange={onPasswordChangeHandler}
        value={state.newRePassword}
        className={classes.inputMiddle}
        required
      />
      <br />
      <input type="submit" value="Change Password" className={classes.button} />
    </form>
  );

  let display = null;
  if (user.length === 0) {
    display = (
      <h2 className={classes.header}>This is not a registered user!</h2>
    );
  } else if (logInUser === user[0]) {
    display = (
      <div className={classes.card}>
        <p className={classes.text}>FullName: {user[0].fullName}</p>
        <p className={classes.text}>Email: {user[0].email}</p>
        <p className={classes.text}>Total UpVotes: {upVotedNumbers}</p>
        <p className={classes.text}>Total DownVotes: {downVotedNumbers}</p>
        {state.isChangeClicked ? (
          form
        ) : (
          <button
            className={classes.button}
            onClick={onPasswordChangeClickHandler}
          >
            Change Password
          </button>
        )}
      </div>
    );
  } else {
    display = (
      <div className={classes.card}>
        <p className={classes.text}>FullName: {user[0].fullName}</p>
        <p className={classes.text}>Email: {user[0].email}</p>
      </div>
    );
  }

  return <div>{display}</div>;
};

export default Profile;
