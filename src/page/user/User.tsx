import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import axios from "axios";

interface userProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

const User = () => {
  const [data, setData] = useState<userProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get<userProps[]>(
          `http://localhost:3000/api/auth/allUsers`,
          {
            withCredentials: true,
          }
        );
        setData(result.data);
        console.log(result.data);

        // if (Array.isArray(result.data)) {
        //   setData(result.data);
        // } else {
        //   console.error("Expected array but got:", result.data);
        //   setData([]); // Fallback to empty array
        // }
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchUser();
  }, []);

  useEffect(() => {
    setData(data);
  }, [data]);

  if (isLoading) return <h1>Loading.....</h1>;
  if (!data || data.length === 0) return <h1>Not Data</h1>;

  return (
    <div>
      <UserTable data={data || []} itemsPerPage={5} />
    </div>
  );
};

export default User;
