import React from "react";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DropDown from "../DropDown/dropDown.js";
import { useSelector } from "react-redux";
import classes from "./header.module.css";

const Header = (props) => {
  const valueFromState = useSelector((state) => {
    return {
      isAuthenticatedValue: state.isAuthenticated,
      user: state.logInUserObject
    };
  });

  return (
    <div className={classes.grid}>
      <div>
        <NavLink
          to="/"
          className={classes.link}
          activeClassName={classes.activeLink}
          exact
        >
          <FaHome />
        </NavLink>
      </div>
      <div className={classes.subGrid}>
        <NavLink
          to="/my-post"
          className={classes.link}
          activeClassName={classes.activeLink}
          exact
        >
          My Post
        </NavLink>
        <NavLink
          to="/new-post"
          className={classes.link}
          activeClassName={classes.activeLink}
          exact
        >
          New Post
        </NavLink>
        {valueFromState.isAuthenticatedValue ? (
          <DropDown userName={valueFromState.user.fullName} />
        ) : (
          <NavLink
            to="/login"
            className={classes.link}
            activeClassName={classes.activeLink}
            exact
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
