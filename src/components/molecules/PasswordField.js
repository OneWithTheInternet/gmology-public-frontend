import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function PasswordField(props) {
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Shows password by changing input field type
     */
    function changePasswordVisibility() {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    }

  return (
    <div className="form__fieldContainer">
        <input 
            type={showPassword ? "text" : "password"}
            value={ props.passwordValue } 
            required
            maxLength={30}
            minLength={6}
            name="password"
            autoComplete="new-password"
            onChange={(event) => props.setPasswordValue(event.target.value)}
        />
        <div className="form__optionsIcon" onClick={() => {changePasswordVisibility()}}>
            {showPassword ? <FontAwesomeIcon className="icon1" icon={faEye} /> : <FontAwesomeIcon className="icon1" icon={faEyeSlash} /> }
        </div>
    </div>
  )
}

export default PasswordField