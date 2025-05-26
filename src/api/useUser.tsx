import axios from "axios";
import { useEffect, useState } from "react";

interface userProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt: string;
}

export const useUserFetch = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<userProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);

    try {
      const result = await axios.get<userProps[]>(
        "http://localhost:3000/api/auth/allUsers",
        {
          withCredentials: true,
        }
      );
      setUsers(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching products:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  return { users, loading, error };
};

export const useUserDelete = () => {
  const deleteUser = async (id: string) => {
    if (!id) {
      console.warn("No ID provided to deleteUser");
      return;
    }
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/auth/deleteUser/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteUser };
};
