import React from 'react'
import { Link } from 'react-router-dom'

function ButtonLogin() {
  return (
    <div className='buttonLoginContainer'>
      <Link to={'/login'} >
        <div className='buttonLogin'>
          Login
        </div>
      </Link>
    </div>
  )
}

export default ButtonLogin