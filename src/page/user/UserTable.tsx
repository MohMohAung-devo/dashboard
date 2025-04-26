import React, { useState } from "react";
import classes from "./User.module.css";
import { TbArrowsDownUp } from "react-icons/tb";
import usePagination from "../hooks/usePagination";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";

interface userProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
}

interface UserTableProps {
  data: userProps[];
  itemsPerPage: number;
}
export const UserTable: React.FC<UserTableProps> = ({ data, itemsPerPage }) => {
  const [users, setUsers] = useState<userProps[]>(data);
  const { slicedData, pagination, prvPage, nextPage, changePage } =
    usePagination<userProps>({
      data: users,
      itemsPerPage,
      startFrom: 1,
    });

  console.log(data);
  const [editItem, setEditItem] = useState<userProps | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [active, setActive] = useState(false);

  const handleEdit = (item: userProps) => {
    setName(item.name);
    setEmail(item.email);
    setPhone(item.phone);
    setLocation(item.location);
    setEditItem(item);
  };

  const handleUpdate = () => {
    setUsers((prv) =>
      prv.map((item) =>
        item.id === editItem?.id
          ? { ...item, name, email, phone, location }
          : item
      )
    );

    setEditItem(null);
  };
  const handleSort = () => {
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleDelete = (id: number) =>
    setUsers(users.filter((item) => item.id !== id));
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
                <th style={{ cursor: "pointer" }}>
                  Name
                  <TbArrowsDownUp onClick={handleSort} />
                </th>
                <th style={{ cursor: "pointer" }}>Email</th>
                <th style={{ cursor: "pointer" }}>Phone</th>
                <th style={{ cursor: "pointer" }}>Location</th>
                <th style={{ cursor: "pointer" }}>Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item, id) => (
                <tr key={id}>
                  {editItem?.id === item.id ? (
                    <td>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td>{item.name}</td>
                  )}

                  {editItem?.id === item.id ? (
                    <td>
                      {" "}
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td>{item.email}</td>
                  )}

                  {editItem?.id === item.id ? (
                    <td>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td>{item.phone}</td>
                  )}

                  {editItem?.id === item.id ? (
                    <td>
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </td>
                  ) : (
                    <td>{item.location}</td>
                  )}

                  <td>{item.date}</td>
                  <td>
                    {editItem?.id === item.id ? (
                      <button onClick={() => handleUpdate(item.id)}>
                        Update
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={classes.pagination}>
          <div className={classes.paginationWraper}>
            <RiArrowLeftWideFill
              onClick={prvPage}
              style={{ cursor: "pointer" }}
            />
            <div className={classes.paginationList}>
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <div key={page.id} className={classes.link}>
                      <a href="/#" onClick={(e) => changePage(page.id, e)}>
                        {page.id}
                      </a>
                    </div>
                  );
                }
              })}
            </div>
            <RiArrowRightWideFill
              onClick={nextPage}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
