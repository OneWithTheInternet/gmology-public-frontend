import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import makeRequest from '../../api'
//Components
import ErrorMessage from '../atoms/ErrorMessage'
import ConfirmationMessage from '../atoms/ConfirmationMessage'
import Loader from '../atoms/Loader'

function EmailValidation() {
    //Inbound data
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [isloading, setIsloading] = useState(false);
    //Outbound data
    const userInput = {
        randomString: ""
    }
    //other
    const params = useParams();

    /**
     * Triggers email validation when page loads
     */
    useEffect(() => {
      setIsloading(true)
      validateEmail()
    return () => {
      setIsloading(false)
    }
    }, []);
    
    /**
     * Makes request to validate user's email address 
     * Uses URL param as the validation token
     */
    async function validateEmail() {
      setIsloading(true);
      userInput.randomString = params.randomString;
      //making request
      const requestResponse = await makeRequest.emailvalidation.validateUserEmail(userInput.randomString);
      try {
        if (!requestResponse[0].error) {
          //if there were no errors in response
          setErrorMessage(null);
          setConfirmationMessage(requestResponse[0].message);
          setIsloading(false);
        } else {
          //if there were errors in the response
          if (confirmationMessage) {
          } else {
            setErrorMessage(requestResponse[0].error);
            setConfirmationMessage(null);
          }
          setIsloading(false);
        }
      } catch (error) {
        //if there were errors making request
        setErrorMessage(error.error);
        setConfirmationMessage(null);
        setIsloading(false);
      }
    }

  return (
    <div className='sectionsContainer'>
      <section className='emailValidation'>
          <h1>Email Validation</h1>
          { isloading ? <Loader /> : null }
          { errorMessage && !confirmationMessage ? <ErrorMessage error={errorMessage}/> : null }
          { confirmationMessage ? <ConfirmationMessage message={confirmationMessage}/> : null }
          { confirmationMessage ? <form> <Link to={'/login'}>Log in</Link></form> : null }
      </section>
    </div>
  )
}

export default EmailValidation