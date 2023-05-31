import { useState } from "react";
import SubmitButton from "../atoms/SubmitButton";
import makeRequest from "../../api";
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from "../atoms/ConfirmationMessage";
import Redirect from "../atoms/Redirect";
import Loader from '../atoms/Loader';
import PasswordField from "../molecules/PasswordField";

function CreateAccountForm() {
    //Inbound data
    const [errorMessage, setErrorMessage] = useState('');
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [isRequestBad, setIsRequestBad] = useState(false);
    const [data, setData] = useState('');
    //Outbound data
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [userNameValue, setUserNameValue] = useState('');
    const [displayNameValue, setDisplayNameValue] = useState('');
    const userInput = {
        user: {
            email: emailValue,
            userName: userNameValue,
            displayName: displayNameValue,
            password: passwordValue
        }
    }
    //Others
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Adds new user to database
     */
     async function createUser(event) {
        //Prevent page from reloading when clicking submit
        event.preventDefault();
        
        try {
            setIsLoading(true);
            setErrorMessage('');
            //making api request
            const responseData = await makeRequest.auth.createUser(userInput);

            //handling response
            if ( !responseData[0].error && !responseData[0].errors) {
                localStorage.setItem("userid", responseData[0].userid);
                localStorage.setItem("userName", responseData[0].userName);
                localStorage.setItem("token", responseData[0].token);
                setData("User created successfully");
                setErrorMessage('');
                setIsRequestDone(true);
                setIsRequestBad(false);
                setIsLoading(false);

            //Handling errors
            } else {
                if (responseData[0].error ){
                    setErrorMessage(responseData[0].error);
                    setData('');
                    setIsRequestDone(false);
                    setIsRequestBad(true);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            return setIsRequestBad(true)
        }
    }
    
    
    return (
        <form className="createAccount__form" onSubmit={(event) => {createUser(event)}}>
            
            {/* render form content only if user has not been created */}
            {isRequestDone === false ? 
                <div>
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
                        
                    <label>Username
                        <input 
                            type="text"
                            pattern="^(\d|\w)+$" // a string without whitespaces or special characters
                            title="No blank spaces or special characters allowed."
                            value={ userNameValue } 
                            placeholder={"Create a user name"}
                            autoComplete="username"
                            required
                            maxLength={20}
                            minLength={3}
                            //Accessing the value after user's input. Setting the value to variable "inputValue""
                            onChange={(event) => { setUserNameValue(event.target.value) }}
                        />
                    </label>

                    <label>Display Name
                        <input 
                            type="text"
                            value={ displayNameValue } 
                            placeholder={"Name people will see (optional)"}
                            maxLength={20}
                            minLength={3}
                            //Accessing the value after user's input. Setting the value to variable "inputValue""
                            onChange={(event) => { setDisplayNameValue(event.target.value) }}
                        />
                    </label>

                    <label>Password
                        <PasswordField passwordValue={passwordValue} setPasswordValue={setPasswordValue} />
                    </label>

                    { isLoading ? <Loader /> : null }

                    <SubmitButton />
                </div>

                : null
            }

            { isRequestBad ? <ErrorMessage error= {errorMessage}/> : null } 

            { isRequestDone ? <ConfirmationMessage message= {data}/> : null }
             
            { isRequestDone ? <Redirect path={"/users/" + localStorage.userName} time={1500} /> : null }

        </form>
    )
}

export default CreateAccountForm