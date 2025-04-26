import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import axios from "axios";

interface userProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
}

const User = () => {
  const [data, setData] = useState<userProps[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/allUsers`);
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div>
      <UserTable data={data} itemsPerPage={5} />
    </div>
  );
};

export default User;
