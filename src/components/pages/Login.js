import LoginForm from "../organisms/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="sectionsContainer">
      <section className="login">
        <h1>Log in</h1>
        <div>
          Create a <Link to="/signup">new account here</Link>
        </div>
        <LoginForm />
      </section>
    </div>
  );
}

export default Login;
