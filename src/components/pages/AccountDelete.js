import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import makeRequest from "../../api";
import ConfirmationMessage from "../atoms/ConfirmationMessage";
import ErrorMessage from "../atoms/ErrorMessage";
import Redirect from '../atoms/Redirect';
import Loader from '../atoms/Loader';

function AccountDelete() {
  //Inbound Data
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  //Others
  const [isLoading, setIsLoading] = useState(false);
  const [typeMatch, setTypeMatch] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  /**
   * Deletes user from database
   */
  async function deleteAccount() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.auth.deleteUser();
      if(!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage(null);
        setIsLoading(false);
      } else {
        setConfirmationMessage(null);
        if (responseData[0].error){
          setErrorMessage(responseData[0].error);
          setIsLoading(false);
        } else {
          setErrorMessage(responseData.error);
          setIsLoading(false);
        }
      }

    } catch (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  }

  /**
   * Shows account deletion button when user types 'delete'
   * @param {*} event 
   */
  function handleChange(event) {
    setTypeMatch(event.target.value);
    if (event.target.value == 'delete') {
      setShowDeleteButton(true);
    }
  }

  return (
    <div className="sectionsContainer">
      <section className='accountDeletion'>
        <h1>Account Deletion</h1>
        <h2>Are you sure you wish to delete your account?</h2>
        <p>This action <strong>CANNOT</strong> be undone and all information associated with your account will be lost.</p>
        <Link to={"/account-settings"}>
          <input className="accountDeletion__cancel" type={'button'} value={"Oops, take me back!"} />
        </Link>
        <hr/>
        { isLoading ? <Loader /> : null }
        {showDeleteButton ? 
          <input className="accountDeletion__submit" type={'button'} value={"Delete account"} onClick={() => {deleteAccount()}} />
          :
          <label> Type 'delete' below to continue
            <input 
            className="accountDeletion__continue" 
            type={'text'} 
            value={typeMatch} 
            onChange={(event) => {handleChange(event)}} 
            placeholder="Write 'delete' with no quotation marks"
            />
          </label>
        }

        {errorMessage ? <ErrorMessage error={errorMessage}/> : null}
        {confirmationMessage ? <ConfirmationMessage message={confirmationMessage}/> : null}
        {confirmationMessage ? <Redirect path={'/feedback'} time={'1500'} /> : null}
      </section>;
    </div>
  )
}

export default AccountDelete