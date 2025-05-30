import classes from "./Home.module.css";
import Chart from "./Chart";
import { useUserFetch } from "../../api/useUser";

interface userProps {
  name: string;
  count: number;
}
export const Home = () => {
  const { users } = useUserFetch();
  console.log(users);
  const totalList: userProps[] = [
    { name: "Total User", count: users?.count },
    { name: "Total Order", count: "12" },
    { name: "Product Sold", count: "12" },
    { name: "New Customer", count: "12" },
    { name: "Pending Order", count: "12" },
  ];
  return (
    <div className={classes.dashboardCol1}>
      <div className={classes.dashboardCol2}>
        <h1 className={classes.title}>Dashboard</h1>
        <div className={classes.dashboardCol3}>
          {totalList.map((item) => (
            <div className={classes.dashboardCol4}>
              <p className={classes.titleCol1}>{item.name}</p>
              <p>{item.count}</p>
            </div>
          ))}
        </div>
        <Chart />
      </div>
    </div>
  );
};
