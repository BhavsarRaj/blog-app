import React from "react";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const user = useSelector((state) => state.logInUserObject);

  return (
    <div>
      <p>FullName: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <button>Change Password</button>
    </div>
  );
};

export default Profile;
