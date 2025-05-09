import React from "react";
import classes from "./Header.module.css";
import { useTheme } from "../../useContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classes.headerCol1}>
      <div className={classes.headerCol2}>
        <div className={classes.serachContainer}>
          <IoIosSearch className={classes.icons} size={20} />
          <input placeholder="Search..." className={classes.headerInput} />
        </div>

        <div className={classes.headerCol3}>
          <CgProfile size={20} />
          <p className={classes.headerTitle}>Profile</p>

          <MdOutlineDarkMode
            onClick={toggleTheme}
            className={classes.themeToggle}
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
