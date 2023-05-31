import React, { useState } from 'react'
import ErrorMessage from '../atoms/ErrorMessage'
import ConfirmationMessage from '../atoms/ConfirmationMessage'
import makeRequest from '../../api'
import SubmitButton from '../atoms/SubmitButton'
import Loader from '../atoms/Loader'

function ForgotPassword() {
    //Inbound data
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    //Outbound data
    const [emailValue, setEmailValue] = useState("");
    const userInput = {
        user: {
            email: emailValue
        }
    };
    //Others
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Sends request to backend to send password reset email
     */
     async function sendResetLink(event) {

        //Prevent page from reloading when clicking submit
        event.preventDefault();
        setIsLoading(true);         
        try {
            //Make API request 
            const responseData = await makeRequest.auth.forgotPassword(userInput);
            //Handling response
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
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
        <section className='forgotPassword'>
            <h1>Forgot Password</h1>

            <p>Submit your email address bellow to receive a password reset link.</p>

            <form className="forgotPasswordForm" onSubmit={(event) => {sendResetLink(event)}}>

                <label>Email
                    <input 
                        type="email"
                        value={ emailValue } 
                        placeholder={ "example@example.com" }
                        required
                        autoComplete="email"
                        //Accessing the value after user's input. Setting the value to variable "inputValue""
                        onChange={(event) => setEmailValue(event.target.value)}
                    />
                </label>

                { isLoading ? <Loader /> : null }

                <SubmitButton />

                { errorMessage ? <ErrorMessage error= {errorMessage}/> : null } 

                { confirmationMessage ? <ConfirmationMessage message= {confirmationMessage}/> : null } 
                
            </form>
        </section>
    </div>
  )
}

export default ForgotPassword