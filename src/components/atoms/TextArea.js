import React from 'react'

function TextArea(props) {

  return (
    <textarea 
      placeholder={props.placeholder}
      maxLength={props.maxLength} 
      value={props.value}
      onChange={props.onChange}
    >
    </textarea>
  )
}

export default TextArea