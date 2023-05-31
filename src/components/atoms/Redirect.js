import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * Redirects user to desired page after timeout
 */
function Redirect(props) {
  const navigate = useNavigate()
  
  useEffect(() => {
    setTimeout(() => {
      navigate(props.path)
    }, props.time ? props.time : 0);
  })
}

export default Redirect