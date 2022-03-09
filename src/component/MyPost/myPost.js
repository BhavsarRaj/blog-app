import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../container/Posts/Post/Post.js";
import withAuth from "../../hoc/withAuth.js";
import { onUpVote, onDownVote } from "../../redux/actionCreators.js";

const MyPost = () => {
  const user = useSelector((state) => state.logInUserObject);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  let myPosts = [];
  if (user) {
    myPosts = posts.filter((obj) => {
      return obj.user.email === user.email;
    });
  }

  const myPostsDisplay = myPosts.map((obj) => {
    return (
      <Post
        key={obj.id}
        id={obj.id}
        userName={obj.user.fullName}
        email={obj.user.email}
        title={obj.title}
        content={obj.content}
        votes={obj.vote}
        upVoteClick={() => dispatch(onUpVote(obj.id))}
        downVoteClick={() => dispatch(onDownVote(obj.id))}
        comments={obj.comments}
      />
    );
  });

  return <div>{myPostsDisplay}</div>;
};

export default withAuth(MyPost);
