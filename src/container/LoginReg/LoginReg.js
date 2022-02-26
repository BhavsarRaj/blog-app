import React, { useState } from "react";
import { connect } from "react-redux";
import { onRegister, onLogIn } from "../../redux/actionCreators.js";
import bcrpytjs from "bcryptjs";
import classes from "./loginReg.module.css";

const LoginReg = (props) => {
  const [state, setState] = useState({
    presentOnLogin: true,
    logInDetail: { email: "", password: "" },
    registerDetail: { fullName: "", email: "", password: "", repassword: "" }
  });
  // console.log(props.emails);
  // for (let item of props.emails) {
  //   console.log(item);
  // }

  const onChangeHandler = () => {
    setState((oldState) => {
      return {
        ...oldState,
        presentOnLogin: !oldState.presentOnLogin
      };
    });
  };

  const onChangeLoginHandler = (event) => {
    const value = event.target.value;
    if (event.target.type === "email") {
      setState((oldState) => {
        return {
          ...oldState,
          logInDetail: {
            ...oldState.logInDetail,
            email: value
          }
        };
      });
    } else {
      setState((oldState) => {
        return {
          ...oldState,
          logInDetail: {
            ...oldState.logInDetail,
            password: value
          }
        };
      });
    }
  };

  const onChangeRegisterHandler = (event) => {
    const value = event.target.value;
    if (event.target.type === "email") {
      setState((oldState) => {
        return {
          ...oldState,
          registerDetail: {
            ...oldState.registerDetail,
            email: value
          }
        };
      });
    } else if (event.target.type === "text") {
      setState((oldState) => {
        return {
          ...oldState,
          registerDetail: {
            ...oldState.registerDetail,
            fullName: value
          }
        };
      });
    } else {
      if (event.target.placeholder === "Password") {
        setState((oldState) => {
          return {
            ...oldState,
            registerDetail: {
              ...oldState.registerDetail,
              password: value
            }
          };
        });
      } else {
        setState((oldState) => {
          return {
            ...oldState,
            registerDetail: {
              ...oldState.registerDetail,
              repassword: value
            }
          };
        });
      }
    }
  };

  const onLogInHandler = (event) => {
    event.preventDefault();
    const email = state.logInDetail.email;
    const password = state.logInDetail.password;
    if (props.emails.has(email)) {
      const user = props.users.filter((obj) => {
        return obj.email === email;
      });
      if (bcrpytjs.compareSync(password, user[0].password)) {
        props.onLoginSubmit(user[0]);
        props.history.replace("/");
      } else {
        alert("Invalid Email or Password");
      }
    } else {
      alert("Invalid Email or Password");
    }
  };

  const onRegisterHandler = (event) => {
    event.preventDefault();
    const fullName = state.registerDetail.fullName;
    const email = state.registerDetail.email;
    const password = state.registerDetail.password;
    const repeatPassword = state.registerDetail.repassword;
    if (props.emails.has(email)) {
      alert("Given email is already been Registered. Try LogIn!");
      return;
    }
    if (password !== repeatPassword) {
      alert("Please enter proper password in Re-enter password section!");
      return;
    }

    props.onRegisterSubmit({
      fullName: fullName,
      email: email,
      password: bcrpytjs.hashSync(password)
    });

    props.history.replace("/");
  };

  let content = null;
  if (state.presentOnLogin) {
    content = (
      <form onSubmit={onLogInHandler}>
        <input
          type="email"
          placeholder="Email"
          value={state.logInDetail.email}
          className={classes.inputUpper}
          onChange={onChangeLoginHandler}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={state.logInDetail.password}
          className={classes.inputMiddle}
          onChange={onChangeLoginHandler}
          required
        />
        <br />
        <input type="submit" value="LogIn" className={classes.button} />
      </form>
    );
  } else {
    content = (
      <form onSubmit={onRegisterHandler}>
        <input
          type="text"
          placeholder="Full Name"
          value={state.registerDetail.fullName}
          className={classes.inputUpper}
          onChange={onChangeRegisterHandler}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={state.registerDetail.email}
          className={classes.inputMiddle}
          onChange={onChangeRegisterHandler}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={state.registerDetail.password}
          className={classes.inputMiddle}
          onChange={onChangeRegisterHandler}
          required
        />
        <input
          type="password"
          placeholder="Re-Enter Password"
          value={state.registerDetail.repassword}
          className={classes.inputMiddle}
          onChange={onChangeRegisterHandler}
          required
        />
        <br />
        <input type="submit" value="Register" className={classes.button} />
      </form>
    );
  }

  const classLogin = [];
  const classRegister = [];

  if (state.presentOnLogin) {
    classRegister.push(classes.inactive);
    if (classLogin.length === 1) {
      classLogin.pop();
    }
  } else {
    classLogin.push(classes.inactive);
    if (classRegister.length === 1) {
      classRegister.pop();
    }
  }

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <p
          style={{ cursor: "pointer" }}
          className={classLogin.join(" ")}
          onClick={onChangeHandler}
        >
          Login
        </p>
        <p
          style={{ cursor: "pointer" }}
          className={classRegister.join(" ")}
          onClick={onChangeHandler}
        >
          Register
        </p>
      </div>
      <hr style={{ borderColor: "gray" }} />
      {content}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    emails: state.emails,
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSubmit: (user) => dispatch(onRegister(user)),
    onLoginSubmit: (user) => dispatch(onLogIn(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginReg);
