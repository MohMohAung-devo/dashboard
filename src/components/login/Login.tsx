import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { useAuth } from "../../services/authContext";

const Login = () => {
  return (
    <div className={classes.LoginForm}>
      <div className={classes.Form}>
        <form className={classes.formWrap}>
          <h1>Login Form</h1>
          <input placeholder="Eamil....." className={classes.input} />
          <input placeholder="Password..." className={classes.input} />
          <button type="submit" className={classes.button}>
            Submit
          </button>
          <div style={{ fontSize: "18px" }}>
            <p>
              Don't have account?<Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
