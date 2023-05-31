import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

function iconSearch() {
  return (
    <div className='searchIcon'>
      <div className='icon2'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  )
}

export default iconSearch