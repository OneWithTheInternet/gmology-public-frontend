import React from "react";

function SmallRoundAvatar(props) {
  return (
    <div className="avatarContainer">
      <img alt="user avatar" src={props.avatarUrl} />
    </div>
  );
}

export default SmallRoundAvatar;
