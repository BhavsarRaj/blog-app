import React from "react";
import { BiUserCircle, BiUpvote, BiDownvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./post.module.css";

const Post = (props) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const upVotedPostsId = useSelector((state) => state.upVotedPostsId);
  const downVotedPostsId = useSelector((state) => state.downVotedPostsId);
  // console.log(upVotedPostsId);
  // console.log(downVotedPostsId);

  const isUpVoted = upVotedPostsId ? upVotedPostsId.has(props.id) : null;
  const isDownVoted = downVotedPostsId ? downVotedPostsId.has(props.id) : null;

  const upVoteClass = [classes.toggle];
  const downVoteClass = [classes.toggle];
  const onUpVoteHandler = () => {
    if (!isAuthenticated) {
      alert("Please first Login/Register!");
      return;
    }
    props.upVoteClick();
  };

  const onDownVoteHandler = () => {
    if (!isAuthenticated) {
      alert("Please first Login/Register!");
      return;
    }
    props.downVoteClick();
  };

  if (isUpVoted && isAuthenticated) {
    upVoteClass.push(classes.change);
  }

  if (isDownVoted && isAuthenticated) {
    downVoteClass.push(classes.change);
  }

  return (
    <div className={classes.border}>
      <div className={classes.grid}>
        <Link to={"/profile/" + props.email} className={classes.subGrid}>
          <BiUserCircle size="23px" />
          <p style={{ textAlign: "left" }}>{props.userName}</p>
          <div className={classes.vLine}></div>
        </Link>
        <p className={classes.title}>{props.title}</p>
      </div>
      <hr></hr>
      <div className={classes.content}>
        <pre>{props.content}</pre>
        <div className={classes.vote}>
          <BiUpvote
            onClick={onUpVoteHandler}
            className={upVoteClass.join(" ")}
          />
          <div className={classes.display}>{props.votes}</div>
          <BiDownvote
            onClick={onDownVoteHandler}
            className={downVoteClass.join(" ")}
          />
        </div>
      </div>
    </div>
  );
};

const areEqual = (oldProps, nextProps) => {
  if (oldProps.votes === nextProps.votes) {
    return true;
  } else {
    return false;
  }
};

export default React.memo(Post, areEqual);
