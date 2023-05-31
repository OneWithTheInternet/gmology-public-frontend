import React from 'react';
import { Navigate } from 'react-router-dom';
/**
 * Redirects user to login page if use is not looged in
 * or their token is no longer valid
 */
function RedirectLoggedOut(props) {

  function clearLocalStorage() {
    localStorage.clear('user_id', 'token')
  }

  return (
    <div>
        {!localStorage.token ? <Navigate to="/login" /> : null}
        {props.error == "invalid token" ? clearLocalStorage() : null}
        {props.error == "invalid token" ? <Navigate to="/login" /> : null}
    </div>
  )
}

export default RedirectLoggedOut