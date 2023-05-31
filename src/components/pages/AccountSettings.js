import makeRequest from "../../api";
import { useState, useEffect } from 'react';
import ConfirmationMessage from "../atoms/ConfirmationMessage";
import ErrorMessage from "../atoms/ErrorMessage";
import SubmitButton from "../atoms/SubmitButton";
import Redirect from "../atoms/Redirect";
import { Link } from "react-router-dom";
import PasswordField from "../molecules/PasswordField";
import Loader from '../atoms/Loader';
import BackButton from "../atoms/BackButton";

function AccountSettings () {
  //Request States
  const [isRequestBad, setIsRequestBad] = useState(false);
  //Inbound Data
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  //Outbound data
  const [emailValue, setEmailValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [displayNameValue, setDisplayNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState('');
  const profileInput = {
    user: {
      userName: userNameValue,
      displayName: displayNameValue,
    }
  };
  const emailInput = {
    user: {
      email: emailValue,
    }
  };
  const PasswordInput = {
    user: {
      password: passwordValue
    }
  };
  //Other
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [userNameChanged, setUserNameChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Triggers data fetching after page has loaded
   */
  useEffect(() => {
      getCurrentUser();
    return () => {
      setErrorMessage('');
      setIsRequestBad(false);
      setPasswordChanged(false);
      setUserNameChanged(false);
    }
  }, []);

  /**
   * fetches the current users's name and stores it in the data state variable
   */
  async function getCurrentUser() {
    try {
      const responseData = await makeRequest.auth.displayMyUserInfo();
      if (!responseData[0].error) {
        setEmailValue(responseData[0].email);
        setUserNameValue(responseData[0].userName);
        setDisplayNameValue(responseData[0].displayName);
        setIsRequestBad(false)
      } else {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true);
      }
    } catch (error) {
      return setErrorMessage(error);
    }
  }

  /**
   * Changes users' personal information
   * @param {} event 
   * @returns Success message
   */
  async function editProfile(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault(); 

    try {
      const responseData = await makeRequest.auth.editProfileInfo(profileInput);
      if(responseData)
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage('');
        setIsRequestBad(false);
        localStorage.clear();
        setUserNameChanged(true);
      } else {
        setErrorMessage(responseData[0].error);
        setConfirmationMessage(null);
        setIsRequestBad(true);
        setUserNameChanged(false);
      }
    } catch (error) {
      return setErrorMessage(error.message);
    }
  }

  /**
   * Changes users' personal information
   * @param {} event 
   * @returns Success message
   */
  async function editEmail(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault(); 

    try {
      const responseData = await makeRequest.auth.editEmail(emailInput);
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage('');
        setIsRequestBad(false);
        localStorage.clear();
        setEmailChanged(true);
      } else {
        setErrorMessage(responseData[0].error);
        setConfirmationMessage(null);
        setIsRequestBad(true);
      }
    } catch (error) {
      return setErrorMessage(error);
    }
  }

  /**
   * Changes users' password
   * @param {} event 
   * @returns Success message
   */
  async function editPassword(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault(); 
    try {
      const responseData = await makeRequest.auth.editUserPassword(PasswordInput);
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setIsRequestBad(false);
        setPasswordChanged(true);
        localStorage.clear();

      } else {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true);
        setPasswordChanged(false);
      }
    } catch (error) {
      return setErrorMessage(error);
    }
  }

  // Creating forms
  const profileForm = <form className="profileForm" onSubmit={(event) => {editProfile(event)}}>
    <label>Username
      <input 
        type={"text"}
        value={ userNameValue } 
        pattern="^(\d|\w)+$" // a string without whitespaces or special characters
        title="No blank spaces or special characters allowed."
        maxLength={20}
        minLength={3}
        onChange={(event) => { setUserNameValue(event.target.value) }}
      />
    </label>
    <label> Display Name
      <input
        type={"text"}
        value={ displayNameValue }  
        maxLength={20}
        minLength={3}
        onChange={(event) => { setDisplayNameValue(event.target.value) }}
      />
    </label>

    { isLoading ? <Loader /> : null }

    <SubmitButton />
  </form>;

  // Creating forms
  const emailForm = <form className="emailForm" onSubmit={(event) => {editEmail(event)}}>
    <label> email
      <input 
        type={"email"}
        value={ emailValue }  
        autoComplete= "email"
        required
        onChange={(event) => setEmailValue(event.target.value)}
      />
    </label>

    { isLoading ? <Loader /> : null }

    <SubmitButton />
  </form>

  const passwordForm = <form className="PasswordForm" onSubmit={(event) => {editPassword(event)}}>
    <label>Password
      <PasswordField passwordValue={passwordValue} setPasswordValue={setPasswordValue}/>
    </label>

    { isLoading ? <Loader /> : null }

    <SubmitButton />
  </form>;

  //Rendering JSX
  return (
    <div className="sectionsContainer">
      <section className="accountSettings">
        <BackButton />
        <h2>Account information</h2>
        <hr/>
        { confirmationMessage ? <ConfirmationMessage message = { confirmationMessage } /> : null }
        { isRequestBad ? <ErrorMessage error = { errorMessage } /> : null }
        {profileForm}
        {emailForm}
        {passwordForm}
        <h2>Account Deletion</h2>
        <Link to={'/account-delete'}>      
          <p>Delete my account</p>
        </Link>
        {passwordChanged || userNameChanged || emailChanged ? <Redirect path={'/login'} time={'1500'} /> : null}
      </section>
    </div>
  )
}

export default AccountSettings