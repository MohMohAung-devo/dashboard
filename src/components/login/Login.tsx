import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useAuth } from "../../services/authContext";
import { ReactElement, useState } from "react";

interface LoginProps {
  email: string;
  password: string;
}
const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<LoginProps[]>([]);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const hanldeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, password);

      if (result?.success) {
        void navigate("/");
      } else {
        console.log("Login failed: Invalid credentials");
      }
      // return reslut;
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  console.log(data);

  return (
    <div className={classes.LoginForm}>
      <div className={classes.Form}>
        <form className={classes.formWrap} onSubmit={hanldeSubmit}>
          <h1>Login Form</h1>
          <input
            placeholder="Eamil....."
            type="email"
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password..."
            type="password"
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
          />
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
