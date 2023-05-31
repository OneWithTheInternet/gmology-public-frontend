import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

function IconTwitch() {
  return (
    <a
      href="https://gmology.wordpress.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="iconTwitch">
        <FontAwesomeIcon icon={faTwitch} />
      </div>
    </a>
  );
}

export default IconTwitch;
