import React from 'react'

function SubmitButton(props) {
  return (
    <input className='submitButton form__button' type="submit" value={props.value ? props.value : "Submit"}/>
  )
}

export default SubmitButton