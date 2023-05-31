import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPatreon } from "@fortawesome/free-brands-svg-icons"

function IconPatreon() {
  return (
    <a href='https://www.patreon.com/gmology' target="_blank" rel="noopener noreferrer">
        <div className='iconPatreon'>
            <FontAwesomeIcon icon={faPatreon} />
        </div>
    </a>
  )
}

export default IconPatreon