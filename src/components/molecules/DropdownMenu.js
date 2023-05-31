import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
//components
import CurrentUserName from '../atoms/CurrentUserName'
import Redirect from '../atoms/Redirect';

function DropdownMenu(props) {
    const [redirectNow, setRedirectNow] = useState(false);

    /**
     * Logs user out of by clearing the login credentials in "local storage"
     * Sends user to homepage by changing location and refreshing page. 
     * Refreshing is necessary to unmount user menu
     */
    function logout() {
        try {
            localStorage.clear("user_id", "token");
            setRedirectNow(true);
        } catch (error) {
            return console.log(error);          
        }
    }

    function handleClick() {
        props.setDisplayUserMenu(false);
    }

  return (
    <ul className='dropdown__menu'>
        <li><Link to={`/users/${props.userName}`} onClick={ () => { handleClick() } }><CurrentUserName userName={props.userName} /></Link></li>
        <br/>
        <li><Link to='/account-settings' onClick={ () => { handleClick() } }>Account settings</Link></li>
        <br/>
        <li><Link to='/watching/:username' onClick={ () => { handleClick() } }>Watching</Link></li>
        <br/>
        <li><Link to='/watchers/:username' onClick={ () => { handleClick() } }>Watchers</Link></li>
        <br/>
        <li onClick={ () => { logout() } } >
            <Link>Sign Out</Link>
        </li>
        {redirectNow ? <Redirect path={"login"}/> : null}
    </ul>
  )
}

export default DropdownMenu