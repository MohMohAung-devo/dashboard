import React from "react";
import classes from "./User.module.css";

const User = () => {
  const userList = [
    {
      name: "MohMohAung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },

    {
      name: "MohMohAung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },
    {
      name: "MohMohAung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },
  ];
  return (
    <div className={classes.userCol1}>
      <div className={classes.userCol2}>
        <div className={classes.header}>
          <h1 className={classes.userTitle}>Users List</h1>
        </div>

        <div className={classes.userCol3}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      style={{
                        marginRight: "1rem",
                        height: "30px",
                        width: "80px",
                        borderRadius: "10px",
                        backgroundColor: "gray",
                        color: "white",
                        borderColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        marginRight: "1rem",
                        height: "30px",
                        width: "80px",
                        borderRadius: "10px",
                        backgroundColor: "gray",
                        color: "white",
                        borderColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
