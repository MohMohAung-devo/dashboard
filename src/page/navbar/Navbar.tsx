import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useTheme } from "../../useContext";
import { useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { LiaProductHunt } from "react-icons/lia";
import { CiChat1 } from "react-icons/ci";
import { RiArrowRightWideFill } from "react-icons/ri";

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const menu = [
    { name: "Dashbord", link: "/", icon: <RxDashboard /> },
    { name: "User", link: "/user", icon: <CiUser /> },
    { name: "Product", link: "/product", icon: <LiaProductHunt /> },
    { name: "Chat", link: "/chat", icon: <CiChat1 /> },
  ];

  return (
    <div className={classes.navCol1}>
      <div className={classes.navCol2}>
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`${classes.link} ${
              location.pathname === item.link ? classes.active : ""
            }`}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                justifyItems: "center",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "18px" }}>{item.icon}</div>
              <p className={classes.textColor}>{item.name}</p>
            </div>

            <RiArrowRightWideFill size={16} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
