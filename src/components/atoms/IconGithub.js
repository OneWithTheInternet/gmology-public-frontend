import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

function IconGithub() {
    return (
        <a href='https://github.com/OneWithTheInternet' target="_blank" rel="noopener noreferrer">
            <div className='iconGithub'>
                <FontAwesomeIcon icon={faGithub} />
            </div>
        </a>
    )
}

export default IconGithub