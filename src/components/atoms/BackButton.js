import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Redirect from './Redirect'

function BackButton() {
  return (
    <div className='icon1 backButton' onClick={() => window.history.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  )
}

export default BackButton