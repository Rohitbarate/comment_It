import React from "react";
import './userContainer.css'

const usersContainer = ({ user }) => {
  const { firstName, lastName, picture, title } = user;
  return (
    <div className="mContainer">
        <div className="pfl">
          <img src={picture} alt="" className="pflImg" />
        {title}. {firstName + lastName}
        </div>
        <span>
        Follow
        </span>
    </div>
  );
};

export default usersContainer;
