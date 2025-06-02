import classes from "./OrderlProductTable.module.css";

export const OrderProductTable: React.FC = () => {
  return (
    <div className={classes.orderProduct}>
      <div className={classes.order}>
        <div>
          <h1>Order Product</h1>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Order User</th>
                <th>Product Name</th>
                <th>Photo</th>
                <th>Price</th>
                <th>Count</th>
                <th>Date</th>
                <th>Status</th>
                <th>Delivered</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
