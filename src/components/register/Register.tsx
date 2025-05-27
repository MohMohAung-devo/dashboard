import { Link } from "react-router-dom";
import classes from "./Register.module.css";
import { useAuth } from "../../services/authContext";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  name: string;
  phone: string;
  location: string;
  email: string;
  password: string;
  role: string;
}
const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState<LoginProps[]>([]);
  const navigate = useNavigate();
  const hanldeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);
    setData([...data, { email, password, phone, name, location, role }]);

    const reslut = await register({
      email,
      password,
      phone,
      name,
      location,
      role,
    });

    if (reslut?.success) {
      await navigate("/login");
    } else {
      console.log("Don't login");
    }
    // return reslut;
  };

  console.log(data);

  return (
    <div className={classes.LoginForm}>
      <div className={classes.Form}>
        <form className={classes.formWrap} onSubmit={hanldeSubmit}>
          <h1>Register Form</h1>
          <input
            placeholder="Eamil....."
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password..."
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            placeholder="Name..."
            className={classes.input}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Phone..."
            className={classes.input}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            placeholder="Location..."
            className={classes.input}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            placeholder="Role..."
            className={classes.input}
            onChange={(e) => setRole(e.target.value)}
          />
          <button type="submit" className={classes.button}>
            Submit
          </button>
          <div style={{ fontSize: "18px" }}>
            <p>
              Don't have account?<Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
