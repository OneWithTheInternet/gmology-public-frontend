import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

function IconChevronUp(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faChevronUp} onClick={() => {props.setShowLess(!props.showLess)}}/>
    </div>
  )
}

export default IconChevronUp