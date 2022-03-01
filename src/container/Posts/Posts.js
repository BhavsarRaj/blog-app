import React from "react";
import Post from "./Post/Post.js";
import { connect } from "react-redux";
import { onUpVote, onDownVote } from "../../redux/actionCreators.js";

const Posts = (props) => {
  const posts = props.posts.map((obj) => {
    return (
      <Post
        key={obj.id}
        id={obj.id}
        userName={obj.user.fullName}
        email={obj.user.email}
        title={obj.title}
        content={obj.content}
        votes={obj.vote}
        upVoteClick={() => props.onUpVoteHandler(obj.id)}
        downVoteClick={() => props.onDownVoteHandler(obj.id)}
        comments={obj.comments}
      />
    );
  });

  // console.log(props.posts);
  return <div>{posts}</div>;
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpVoteHandler: (id) => dispatch(onUpVote(id)),
    onDownVoteHandler: (id) => dispatch(onDownVote(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
