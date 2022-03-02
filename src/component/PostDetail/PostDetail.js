import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { onUpVote, onDownVote } from "../../redux/actionCreators.js";
import Post from "../../container/Posts/Post/Post.js";

const PostDetail = (props) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const post = posts.filter((obj) => {
    return obj.id.toString() === id;
  });
  const postObj = post[0];

  if (!postObj) {
    return <h1>Cannot find Obj</h1>;
  }

  return (
    <Post
      id={postObj.id}
      userName={postObj.user.fullName}
      email={postObj.user.email}
      title={postObj.title}
      content={postObj.content}
      votes={postObj.vote}
      upVoteClick={() => dispatch(onUpVote(postObj.id))}
      downVoteClick={() => dispatch(onDownVote(postObj.id))}
      comments={postObj.comments}
    />
  );
};

export default PostDetail;
