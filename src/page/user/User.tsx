import { useMemo } from "react";
import UserTable from "./UserTable";
import { useUserFetch } from "../../api/useUser";

const User = () => {
  const { users, loading, error } = useUserFetch();

  const memoizedData = useMemo(() => users, [users]);

  return (
    <div>
      {loading && <h1>Loading......</h1>}
      <UserTable data={memoizedData} itemsPerPage={5} />
      {error && <h1>Error: {error}</h1>}
    </div>
  );
};

export default User;
