import { useState } from "react";
import Redirect from "../atoms/Redirect";
import makeRequest from "../../api";
import SubmitButton from "../atoms/SubmitButton";
import ErrorMessage from "../atoms/ErrorMessage";
import { Link } from "react-router-dom";
import Loader from "../atoms/Loader";

function LoginForm() {
  //Inbound data
  const [errorMessage, setErrorMessage] = useState("");
  //Outbound data
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const userInput = {
    user: {
      email: emailValue,
      password: passwordValue,
    },
  };
  //Others
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Logs user in
   */
  async function login(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");
      //Make API request next
      const responseData = await makeRequest.auth.loginUser(userInput);
      //Setting token to local storage
      if (!responseData[0].error && !responseData.error) {
        localStorage.setItem("userid", responseData[0].id);
        localStorage.setItem("userName", responseData[0].userName);
        localStorage.setItem("displayName", responseData[0].displayName);
        localStorage.setItem("token", responseData[0].token);
        setIsLoggedIn(true);
        setIsLoading(false);
        return setErrorMessage("");
      } else {
        if (responseData[0].error) {
          setErrorMessage(responseData[0].error);
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
      return setIsLoggedIn(false);
    }
  }

  return (
    <form
      className="login__form"
      data-testid={"loginForm"}
      onSubmit={(event) => {
        login(event);
      }}
    >
      <label>
        Email
        <input
          type="email"
          value={emailValue}
          placeholder={"example@example.com"}
          required
          autoComplete="email"
          data-testid={"emailField"}
          //Accessing the value after user's input. Setting the value to variable "inputValue""
          onChange={(event) => setEmailValue(event.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={passwordValue}
          required
          maxLength={20}
          minLength={6}
          name="password"
          autoComplete="password"
          data-testid={"passwordField"}
          //Accessing the value after user's input. Setting the value to variable "inputValue""
          onChange={(event) => setPasswordValue(event.target.value)}
        />
      </label>

      {isLoading ? <Loader /> : null}

      <SubmitButton />

      <hr />

      <div>
        <Link to="/forgot-password">
          <p>Forgot your password?</p>
        </Link>
      </div>

      {errorMessage === "" ? null : <ErrorMessage error={errorMessage} />}

      {isLoggedIn === true ? (
        <Redirect path={"/users/" + localStorage.userName} time={0} />
      ) : null}
    </form>
  );
}

export default LoginForm;

//onSubmit={(event) => event.preventDefault}
