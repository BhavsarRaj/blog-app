import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const withAuth = (Component) => {
  const ValidComponent = (props) => {
    const isAuthenticated = props.isAuthenticated;

    let result = null;
    if (isAuthenticated) {
      result = <Component />;
    } else {
      result = <Redirect to="/login" />;
    }

    return <div>{result}</div>;
  };

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.isAuthenticated
    };
  };

  return connect(mapStateToProps)(ValidComponent);
};

export default withAuth;
