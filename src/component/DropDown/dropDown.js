import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onLogOut } from "../../redux/actionCreators";
import classes from "./dropDown.module.css";

const DropDown = (props) => {
  const user = useSelector((state) => state.logInUserObject);
  const dispatch = useDispatch();

  const onLogOutHandler = () => {
    dispatch(onLogOut());
  };

  return (
    <div className={classes.dropDown}>
      <p>{props.userName}</p>
      <div className={classes.dropDownContent}>
        <Link className={classes.text} to={"/profile/" + user.email}>
          Profile
        </Link>
        <p className={classes.text} onClick={onLogOutHandler}>
          LogOut
        </p>
      </div>
    </div>
  );
};

export default DropDown;
