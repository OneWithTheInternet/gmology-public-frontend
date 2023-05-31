import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons"

function InconClap(props) {
  return (
    <div className='inconClap icon2'>
        <FontAwesomeIcon icon={faHandsClapping} onClick={() => props.addClap()}/>
    </div>
  )
}

export default InconClap