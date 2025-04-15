import React, { useEffect, useRef, useState } from "react";
import classes from "./Footer.module.css";
import { RiArrowRightWideFill } from "react-icons/ri";
import { RiArrowLeftWideFill } from "react-icons/ri";

const Footer = () => {
  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const ref = useRef(null);
  const list = [];
  for (let i = 1; i < 10; i++) {
    list.push(i);
  }

  const handleNext = () => {
    if (list.length - 1 > index) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const handlePrv = () => {
    if (list.length + 1 < index) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  };

  useEffect(() => {
    const listLength = list.map((item, index) => index);
    if (listLength.length < 3 && listLength.length < 7) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.containerWraper}>
        <RiArrowLeftWideFill
          onClick={handlePrv}
          size={20}
          style={{ cursor: "pointer" }}
        />
        <div className={classes.listContainer}>
          {list.map((item, i) => (
            <div
              key={i}
              className={`${classes.list} ${index === i ? classes.active : ""}`}
            >
              {showList && i < 3 && i > 7 ? <div>.......</div> : ""}
              <p>{item}</p>
            </div>
          ))}
        </div>
        <RiArrowRightWideFill
          onClick={handleNext}
          size={20}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Footer;
