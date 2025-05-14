
import Navbar from "./page/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Header from "./page/header/Header";
import classes from "./layout.module.css";
const Layout = () => {
  return (
    <div className={classes.layoutContainer}>
      <div className={classes.sidebar}>
        <Navbar />
      </div>
      <div className={classes.mainContent}>
        <div>
          <Header />
        </div>
        <div className={classes.outletContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
