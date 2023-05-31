import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGamepad } from "@fortawesome/free-solid-svg-icons"

function iconGamepad() {
  return (
    <div className='gamepadIcon'>
      <div className='icon2'>
        <FontAwesomeIcon icon={faGamepad} />
      </div>
    </div>
  )
}

export default iconGamepad