import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function IconChevronDown(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faChevronDown} onClick={() => {props.setShowLess(!props.showLess)}}/>
    </div>
  )
}

export default IconChevronDown