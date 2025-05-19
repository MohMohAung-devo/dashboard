import { useEffect, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
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
        // setTimeout(() => {
        setData(result.data);
        console.log(result.data);
        setIsLoading(false);
        // }, 300);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    void fetchUser();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <div>
      <UserTable data={memoizedData} itemsPerPage={5} />
      {error && <h1>Error: {error}</h1>}
    </div>
  );
};

export default User;
