import { useEffect, useState } from "react";
import { ProductTable } from "./ProductTable";
import { useProductFetch } from "../../api/useProduct";

const Product = () => {
  const { products, loading } = useProductFetch();
  const [data, setData] = useState(products);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <>
      <ProductTable data={data} itemsPerPage={5} />
    </>
  );
};

export default Product;
