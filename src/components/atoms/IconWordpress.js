import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWordpress } from "@fortawesome/free-brands-svg-icons";

function IconWordpress() {
  return (
    <a
      href="https://gmology.wordpress.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="iconWordpress">
        <FontAwesomeIcon icon={faWordpress} />
      </div>
    </a>
  );
}

export default IconWordpress;
