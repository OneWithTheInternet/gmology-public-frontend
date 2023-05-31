import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

function InconUser() {
  return (
    <div className='userIcon'>
      <div className='icon2'>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  )
}

export default InconUser