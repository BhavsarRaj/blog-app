import * as actionTypes from "./actionTypes.js";

const reducer = (oldState, action) => {
  switch (action.type) {
    case actionTypes.UpVote: {
      let index = -1;
      const post = oldState.posts.filter((obj, ind) => {
        if (obj.id === action.id) {
          index = ind;
          return true;
        } else {
          return false;
        }
      });
      if (oldState.upVotedPostsId.has(action.id)) {
        post[0].vote -= 1;
        const newPosts = [...oldState.posts];
        newPosts[index] = post[0];
        const newUpVotedPostsId = new Set();
        for (let x of oldState.upVotedPostsId) {
          if (x !== action.id) {
            newUpVotedPostsId.add(x);
          }
        }
        return {
          ...oldState,
          posts: newPosts,
          upVotedPostsId: newUpVotedPostsId,
          postsUpDownVoteData: {
            ...oldState.postsUpDownVoteData,
            [oldState.logInUserObject.email]: {
              ...oldState.postsUpDownVoteData[oldState.logInUserObject.email],
              upVotedPostsId: newUpVotedPostsId
            }
          }
        };
      } else if (oldState.downVotedPostsId.has(action.id)) {
        post[0].vote += 2;
        const newPosts = [...oldState.posts];
        newPosts[index] = post[0];
        const newDownVotedPostsId = new Set();
        for (let x of oldState.downVotedPostsId) {
          if (x !== action.id) {
            newDownVotedPostsId.add(x);
          }
        }
        const newUpVotedPostsId = new Set();
        for (let x of oldState.upVotedPostsId) {
          newUpVotedPostsId.add(x);
        }
        newUpVotedPostsId.add(action.id);
        return {
          ...oldState,
          posts: newPosts,
          downVotedPostsId: newDownVotedPostsId,
          upVotedPostsId: newUpVotedPostsId,
          postsUpDownVoteData: {
            ...oldState.postsUpDownVoteData,
            [oldState.logInUserObject.email]: {
              downVotedPostsId: newDownVotedPostsId,
              upVotedPostsId: newUpVotedPostsId
            }
          }
        };
      }
      post[0].vote += 1;
      const newPosts = [...oldState.posts];
      newPosts[index] = post[0];
      const newUpVotedPostsId = new Set();
      for (let x of oldState.upVotedPostsId) {
        newUpVotedPostsId.add(x);
      }
      newUpVotedPostsId.add(action.id);
      return {
        ...oldState,
        posts: newPosts,
        upVotedPostsId: newUpVotedPostsId,
        postsUpDownVoteData: {
          ...oldState.postsUpDownVoteData,
          [oldState.logInUserObject.email]: {
            ...oldState.postsUpDownVoteData[oldState.logInUserObject.email],
            upVotedPostsId: newUpVotedPostsId
          }
        }
      };
    }

    case actionTypes.DownVote: {
      let index = -1;
      const post = oldState.posts.filter((obj, ind) => {
        if (obj.id === action.id) {
          index = ind;
          return true;
        } else {
          return false;
        }
      });
      if (oldState.downVotedPostsId.has(action.id)) {
        post[0].vote += 1;
        const newPosts = [...oldState.posts];
        newPosts[index] = post[0];
        const newDownVotedPostsId = new Set();
        for (let x of oldState.downVotedPostsId) {
          if (x !== action.id) {
            newDownVotedPostsId.add(x);
          }
        }
        return {
          ...oldState,
          posts: newPosts,
          downVotedPostsId: newDownVotedPostsId,
          postsUpDownVoteData: {
            ...oldState.postsUpDownVoteData,
            [oldState.logInUserObject.email]: {
              ...oldState.postsUpDownVoteData[oldState.logInUserObject.email],
              downVotedPostsId: newDownVotedPostsId
            }
          }
        };
      } else if (oldState.upVotedPostsId.has(action.id)) {
        post[0].vote -= 2;
        const newPosts = [...oldState.posts];
        newPosts[index] = post[0];
        const newUpVotedPostsId = new Set();
        for (let x of oldState.upVotedPostsId) {
          if (x !== action.id) {
            newUpVotedPostsId.add(x);
          }
        }
        const newDownVotedPostsId = new Set();
        for (let x of oldState.downVotedPostsId) {
          newDownVotedPostsId.add(x);
        }
        newDownVotedPostsId.add(action.id);
        return {
          ...oldState,
          posts: newPosts,
          downVotedPostsId: newDownVotedPostsId,
          upVotedPostsId: newUpVotedPostsId,
          postsUpDownVoteData: {
            ...oldState.postsUpDownVoteData,
            [oldState.logInUserObject.email]: {
              downVotedPostsId: newDownVotedPostsId,
              upVotedPostsId: newUpVotedPostsId
            }
          }
        };
      }
      post[0].vote -= 1;
      const newPosts = [...oldState.posts];
      newPosts[index] = post[0];
      const newDownVotedPostsId = new Set();
      for (let x of oldState.downVotedPostsId) {
        newDownVotedPostsId.add(x);
      }
      newDownVotedPostsId.add(action.id);
      return {
        ...oldState,
        posts: newPosts,
        downVotedPostsId: newDownVotedPostsId,
        postsUpDownVoteData: {
          ...oldState.postsUpDownVoteData,
          [oldState.logInUserObject.email]: {
            ...oldState.postsUpDownVoteData[oldState.logInUserObject.email],
            downVotedPostsId: newDownVotedPostsId
          }
        }
      };
    }

    case actionTypes.Register_Success: {
      const newUsers = [...oldState.users];
      newUsers.push(action.user);
      const newEmails = new Set();
      for (let email of oldState.emails) {
        newEmails.add(email);
      }
      newEmails.add(action.user.email);
      const newEmail = action.user.email;
      const value = {
        upVotedPostsId: new Set(),
        downVotedPostsId: new Set()
      };
      return {
        ...oldState,
        users: newUsers,
        emails: newEmails,
        isAuthenticated: true,
        logInUserObject: action.user,
        postsUpDownVoteData: {
          ...oldState.postsUpDownVoteData,
          [newEmail]: value
        },
        upVotedPostsId: value.upVotedPostsId,
        downVotedPostsId: value.downVotedPostsId,
        isRegisteredFailed: false
      };
    }

    case actionTypes.Register_Failed: {
      return {
        ...oldState,
        isRegisteredFailed: true
      };
    }

    case actionTypes.LogIn: {
      return {
        ...oldState,
        isAuthenticated: true,
        logInUserObject: action.user,
        upVotedPostsId:
          oldState.postsUpDownVoteData[action.user.email].upVotedPostsId,
        downVotedPostsId:
          oldState.postsUpDownVoteData[action.user.email].downVotedPostsId
      };
    }

    case actionTypes.LogOut: {
      return {
        ...oldState,
        isAuthenticated: false,
        logInUserObject: null,
        upVotedPostsId: null,
        downVotedPostsId: null
      };
    }

    case actionTypes.NewPost: {
      const newPosts = [...oldState.posts];
      newPosts.push({
        id: new Date(),
        user: oldState.logInUserObject,
        title: action.value.title,
        content: action.value.content,
        vote: 0,
        comments: []
      });
      return {
        ...oldState,
        posts: newPosts
      };
    }

    case actionTypes.ChangePassword: {
      const newPassword = action.newPassword;
      const newLogInUserObject = oldState.logInUserObject;
      newLogInUserObject.password = newPassword;
      return {
        ...oldState,
        logInUserObject: newLogInUserObject
      };
    }

    case actionTypes.AddComment: {
      const content = action.value;
      let index = -1;
      const post = oldState.posts.filter((obj, ind) => {
        if (obj.id === action.id) {
          index = ind;
          return true;
        } else {
          return false;
        }
      });
      const newComments = [...post[0].comments];
      const id = new Date();
      newComments.push({
        user: oldState.logInUserObject,
        content: content,
        id: id
      });
      post[0].comments = newComments;
      const newPosts = [...oldState.posts];
      newPosts[index] = post[0];
      return {
        ...oldState,
        posts: newPosts
      };
    }

    default:
      return oldState;
  }
};

export default reducer;
