import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

interface userProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  date: string;
}

const User = () => {
  const userList: userProps[] = [
    {
      id: 1,
      name: "MohMohAung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },

    {
      id: 2,
      name: "MohMohAung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },
    {
      id: 3,
      name: "Aung",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },

    {
      id: 4,
      name: "Htwe",
      email: "mohmohaung737@gmail.com",
      phone: "09259575377",
      location: "Yangon",
      date: "2.4.2025",
    },
  ];
  const [data, setData] = useState(userList);
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
