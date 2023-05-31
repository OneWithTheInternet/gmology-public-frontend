import React from 'react'
import { Link } from 'react-router-dom'

function SingupButton() {
  return (
    <div className='buttonSingupContainer'>
      <Link to="/signup">
        <div className='buttonSignup'>
          Signup | Login
        </div>
      </Link>
    </div>
  )
}

export default SingupButton