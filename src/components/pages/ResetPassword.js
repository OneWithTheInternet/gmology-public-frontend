import React, { useState, useEffect } from 'react'
import ErrorMessage from '../atoms/ErrorMessage'
import ConfirmationMessage from '../atoms/ConfirmationMessage'
import makeRequest from '../../api'
import SubmitButton from '../atoms/SubmitButton'
import Loader from '../atoms/Loader'
import { Link, useParams } from 'react-router-dom'
import PasswordField from '../molecules/PasswordField'


function ResetPassword() {

    //Inbound data
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    //Outbound data
    const [passwordValue, setPasswordValue] = useState("");
    const userInput = {
        user: {
            token: "",
            password: passwordValue
        }
    };
    //Others
    userInput.user.token = useParams().token;
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Sends request to backend to reset user's password
     */
     async function resetPassword(event) {

        //Prevent page from reloading when clicking submit
        event.preventDefault();
        setIsLoading(true);         
        try {
            //Make API request 
            const responseData = await makeRequest.auth.resetPassword(userInput);
            //Handling response
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setPasswordValue("");
                setIsLoading(false);         
            } else {
                //if there were errors
                if(responseData[0].error) {
                    setConfirmationMessage(null);
                    setErrorMessage(responseData[0].error);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setErrorMessage(error.error);
            setConfirmationMessage(null);
        }
    }

  return (
    <div className='sectionsContainer'>
        <section className='resetPassword'>
            <h1>Reset Password</h1>

            <p>Create a new password bellow then hit the submit button.</p>

            <form className="resetPasswordForm" onSubmit={(event) => {resetPassword(event)}}>

                <label>New Password
                    <PasswordField passwordValue={passwordValue} setPasswordValue={setPasswordValue}/>
                </label>

                { isLoading ? <Loader /> : null }

                { errorMessage ? <ErrorMessage error= {errorMessage}/> : null } 

                { confirmationMessage ? <ConfirmationMessage message= {confirmationMessage}/> : <SubmitButton /> } 

                { confirmationMessage ? <form> <Link to={'/login'}>Log in</Link></form> : null }
                
            </form>
        </section>
    </div>
  )
}

export default ResetPassword