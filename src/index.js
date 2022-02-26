import React from "react";
import { createStore } from "redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import reducer from "./redux/reducer.js";
import App from "./container/App/App";

const store = createStore(
  reducer,
  {
    emails: new Set(),
    isAuthenticated: false,
    logInUserObject: null,
    upVotedPostsId: null,
    downVotedPostsId: null,
    postsUpDownVoteData: {},
    users: [],
    posts: [
      // {
      //   id: "1",
      //   userName: "Raj Bhavsar",
      //   title: "The Future of Time",
      //   content: "Time is a big illusion and that can be hampered",
      //   vote: 0
      // },
      // {
      //   id: "2",
      //   userName: "Sarkar",
      //   title: "The Rule of Money",
      //   content:
      //     "Money is also illusion.\nOne should know how to generate it! \nWelcome to the Paradise of Super Power. \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n \n ... .. \n",
      //   vote: 0
      // },
      // {
      //   id: "3",
      //   userName: "Dr. Strange",
      //   title: "The Time of Time",
      //   content: "No one should know this .. !!",
      //   vote: 0
      // }
    ]
  },
  devToolsEnhancer()
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);
