import React from 'react'

function ErrorMessage(props) {
  return (
    <div className='errorMessage'>{props.error}</div>
  )
}

export default ErrorMessage