import React, { useEffect, useState } from "react";
import classes from "./User.module.css";
import { TbArrowsDownUp } from "react-icons/tb";
import usePagination from "../hooks/usePagination";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import axios from "axios";
import { useUserDelete } from "../../api/useUser";

interface userProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

interface UserTableProps {
  data: userProps[];
  itemsPerPage: number;
}
export const UserTable: React.FC<UserTableProps> = ({ data, itemsPerPage }) => {
  const [users, setUsers] = useState<userProps[]>([]);
  const { slicedData, pagination, prvPage, nextPage, changePage } =
    usePagination<userProps>({
      data: users,
      itemsPerPage,
      startFrom: 1,
    });

  const { deleteUser } = useUserDelete();

  const [editItem, setEditItem] = useState<userProps | null>(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [boxShow, setBoxShow] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const userData = data?.users?.map((item) => ({
      ...item,
    }));
    setUsers(userData || []);
  }, [data]);

  const handleShow = () => {
    setShow(!show);
  };

  const handleUpdate = async (_id: string) => {
    try {
      const result = await axios.put<userProps>(
        `http://localhost:3000/api/auth/updateUser/${_id}`,
        {
          _id: id,
          name: name,
          email: email,
          phone: phone,
          location: location,
          date: new Date().toISOString(),
        }
      );

      setUsers((prv) =>
        prv.map((user) =>
          user._id === _id
            ? { ...user, ...result.data, createdAt: user.createdAt }
            : user
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const handleSort = () => {
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const handleDelete = async (_id: string) => {
    try {
      await deleteUser(_id);
      setUsers((prev) => prev.filter((user) => user._id !== _id));
      setBoxShow(false);
      setConfirmId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const confirmHandle = (_id: string) => {
    setConfirmId(_id);
    setBoxShow(true);
  };

  const handleConfirmCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (confirmId) {
      setConfirmId(null);
      setBoxShow(false);
    } else {
      setConfirmId(null);
      setBoxShow(false);
    }
  };

  if (!data) return <h1>Loading....</h1>;
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
              {slicedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>{item.location}</td>

                  <td>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "No Date"}
                  </td>
                  <td>
                    <button onClick={() => confirmHandle(item._id)}>
                      Delete
                    </button>

                    {boxShow && confirmId === item._id && (
                      <div className={classes.confirmBox}>
                        <p style={{ textAlign: "center", fontSize: "18px" }}>
                          Are you sure delete this user?
                        </p>
                        <div className={classes.confirmButton}>
                          <button onClick={handleConfirmCancel}>Cancel</button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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
