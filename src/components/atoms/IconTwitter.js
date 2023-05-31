import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

function IconTwitter() {
  return (
    <a href='https://twitter.com/gmologyofficial' target="_blank" rel="noopener noreferrer">
        <div className='iconTwitter'>            
            <FontAwesomeIcon icon={faTwitter} />
        </div>
    </a>
    )
}

export default IconTwitter