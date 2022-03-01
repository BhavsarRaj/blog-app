import React, { useState } from "react";
import {
  BiUserCircle,
  BiUpvote,
  BiDownvote,
  BiCommentDetail
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAddComment } from "../../../redux/actionCreators.js";
import classes from "./post.module.css";

const Post = (props) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const upVotedPostsId = useSelector((state) => state.upVotedPostsId);
  const downVotedPostsId = useSelector((state) => state.downVotedPostsId);
  const dispatch = useDispatch();

  const [state, setState] = useState({ isCommentClicked: false, comment: "" });

  // console.log(upVotedPostsId);
  // console.log(downVotedPostsId);

  const isUpVoted = upVotedPostsId ? upVotedPostsId.has(props.id) : null;
  const isDownVoted = downVotedPostsId ? downVotedPostsId.has(props.id) : null;
  const isCommentClicked = state.isCommentClicked;

  const upVoteClass = [classes.toggle];
  const downVoteClass = [classes.toggle];
  const commentClass = [classes.comment];
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

  const onCommentClickHandler = () => {
    setState((oldState) => {
      return {
        ...oldState,
        isCommentClicked: !oldState.isCommentClicked
      };
    });
  };

  const onCommentChangeHandler = (event) => {
    const value = event.target.value;
    setState((oldState) => {
      return {
        ...oldState,
        comment: value
      };
    });
  };

  const onCommentSubmitHandler = (event) => {
    event.preventDefault();
    const value = state.comment;
    dispatch(onAddComment(value, props.id));
    setState((oldState) => {
      return {
        ...oldState,
        comment: "",
        isCommentClicked: true
      };
    });
  };

  const commentData = props.comments.map((obj) => {
    return (
      <div className={classes.commentGrid} key={obj.id}>
        <div className={classes.commentSubGrid}>
          <BiUserCircle size="23px" />
          <p>{obj.user.fullName}</p>
          <div className={classes.vLine}></div>
        </div>
        <pre>{obj.content}</pre>
      </div>
    );
  });

  // const commentData = (
  //   <div className={classes.commentGrid}>
  //     <div className={classes.commentSubGrid}>
  //       <BiUserCircle size="23px" />
  //       <p>{props.userName}</p>
  //       <div className={classes.vLine}></div>
  //     </div>
  //     <p>Some content</p>
  //   </div>
  // );

  if (isUpVoted && isAuthenticated) {
    upVoteClass.push(classes.change);
  }

  if (isDownVoted && isAuthenticated) {
    downVoteClass.push(classes.change);
  }

  if (isCommentClicked) {
    commentClass.push(classes.change);
  }

  let commentInput = null;
  if (isAuthenticated) {
    commentInput = (
      <form
        onSubmit={onCommentSubmitHandler}
        className={classes.commentInputGrid}
      >
        <textarea
          value={state.comment}
          onChange={onCommentChangeHandler}
          className={classes.textarea}
          rows="2"
          required
        />
        <input type="submit" value="Comment" className={classes.button} />
      </form>
    );
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
          <p className={classes.display}>{props.votes}</p>
          <BiDownvote
            onClick={onDownVoteHandler}
            className={downVoteClass.join(" ")}
          />
        </div>
        <hr />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "4% auto",
            margin: "0.5%"
          }}
        >
          <BiCommentDetail
            className={commentClass.join(" ")}
            size="20px"
            onClick={onCommentClickHandler}
          />
          <p style={{ display: "flex" }}>{props.comments.length}</p>
        </div>
        {commentInput}
        {isCommentClicked ? commentData : null}
      </div>
    </div>
  );
};

const areEqual = (oldProps, nextProps) => {
  if (
    oldProps.votes === nextProps.votes &&
    oldProps.comments.length === nextProps.comments.length
  ) {
    return true;
  } else {
    return false;
  }
};

export default React.memo(Post, areEqual);
